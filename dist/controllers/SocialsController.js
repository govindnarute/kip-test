'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _SocialTypes = require('../resources/socials/SocialTypes');

var _sessions = require('../resources/sessions');

var _SessionDto = require('../models/sessions/SessionDto');

var _UserSessionDto = require('../models/users/UserSessionDto');

var _UserDto = require('../models/users/UserDto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SocialsController {
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
        const social = await this.socialsService.getSocialByTypeAndSocialUserId(_SocialTypes.socialTypes.linkedIn, linkedInUser.socialUserId);

        if (social) {
            const tokens = await this.sessionsService.create(social.user.id, {
                type: _sessions.SessionType.User,
                lifeTime: request.body.lifeTime
            });
            if (social.user.isFirstEnter) {
                social.user = await social.user.update({ isFirstEnter: false });
            }
            return new _UserSessionDto.UserSessionDto(new _UserDto.UserDto(social.user), new _SessionDto.SessionDto(tokens));
        }

        const user = await this.socialsService.addSocialUser(linkedInUser, _SocialTypes.socialTypes.linkedIn, request.body.type);

        if (linkedInUser.profilePicture && user && !user.hasOwnProperty('isNew')) {
            const resFetch = await (0, _nodeFetch2.default)(linkedInUser.profilePicture);
            const image = await this.imagesService.createImage(resFetch);
            image.type = image.mime.split('/')[1];
            await this.avatarService.addAvatarToS3(image, user.id);
            await this.avatarService.deleteTemporaryAvatarFile(image);
            await this.socialsService.addImage(image, user);
        }

        const userWithAvatar = await this.usersService.getUserById(user.id);

        const tokens = await this.sessionsService.create(user.id, {
            type: _sessions.SessionType.User,
            lifeTime: request.body.lifeTime
        });
        return new _UserSessionDto.UserSessionDto(new _UserDto.UserDto(userWithAvatar), new _SessionDto.SessionDto(tokens));
    }
}
exports.default = SocialsController;
//# sourceMappingURL=SocialsController.js.map