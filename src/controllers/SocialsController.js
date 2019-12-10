import fetch from 'node-fetch';
import { socialTypes } from '../resources/socials/SocialTypes';
import { SessionType } from '../resources/sessions';
import { SessionDto } from '../models/sessions/SessionDto';
import { UserSessionDto } from '../models/users/UserSessionDto';
import { UserDto } from '../models/users/UserDto';

export default class SocialsController {
    constructor({
        SocialsService,
        SessionsService,
        UsersService,
        LinkedInService,
        ImagesService,
        AvatarService
    }) {
        this.sessionsService = SessionsService;
        this.socialsService = SocialsService;
        this.usersService = UsersService;
        this.linkedInService = LinkedInService;
        this.imagesService = ImagesService;
        this.avatarService = AvatarService;
    }

    /**
     * Login by Facebook
     * @param {e.Request} request
     * @returns {Promise<UserSessionDto>}
     */
    async loginByLinkedIn(request) {
        const accessToken = await this.linkedInService.getAccessToken(request.body);
        const linkedInUser = await this.linkedInService.getUserInfo(accessToken);
        const social = await this.socialsService.getSocialByTypeAndSocialUserId(socialTypes.linkedIn, linkedInUser.socialUserId);

        if (social) {
            const tokens = await this.sessionsService.create(social.user.id, {
                type: SessionType.User,
                lifeTime: request.body.lifeTime
            });
            if(social.user.isFirstEnter){
                social.user = await social.user.update({ isFirstEnter: false });
            }
            return new UserSessionDto(new UserDto(social.user), new SessionDto(tokens));
        }

        const user = await this.socialsService.addSocialUser(linkedInUser, socialTypes.linkedIn, request.body.type);

        if (linkedInUser.profilePicture && user && !user.hasOwnProperty('isNew')) {
            const resFetch = await fetch(linkedInUser.profilePicture);
            const image = await this.imagesService.createImage(resFetch);
            image.type = image.mime.split('/')[1];
            await this.avatarService.addAvatarToS3(image, user.id);
            await this.avatarService.deleteTemporaryAvatarFile(image);
            await this.socialsService.addImage(image, user);
        }

        const userWithAvatar = await this.usersService.getUserById(user.id);

        const tokens = await this.sessionsService.create(user.id, {
            type: SessionType.User,
            lifeTime: request.body.lifeTime
        });
        return new UserSessionDto(new UserDto(userWithAvatar), new SessionDto(tokens));
    }
}
