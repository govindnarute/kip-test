import uuid from 'uuid';
import { ImageDto } from '../models/images/ImageDto';
import { AwsMetaDto } from '../models/images/AwsMetaDto';
import { ImageAwsMetaDto } from '../models/images/ImageAwsMetaDto';
import { EmptyDto } from '../base/EmptyDto';
import { NotFoundError, ForbiddenError } from '../utils/http';

export default class ImagesController {
    constructor({ config, S3Service, ImagesService }) {
        this.config = config;
        this.s3Service = S3Service;
        this.imagesService = ImagesService;
    }

    /**
     * Prepare load url
     * @param {e.Request} request
     * @returns {Promise.<ImageAwsMetaDto>}
     */
    async prepareLoadUrl(request) {
        const acl = 'public-read';
        const fileName = `${this.config.get('s3.imagePrefix')}${uuid.v4()}.${request.body.contentType.split('/')[1]}`;
        const key = `images/user_${request.user.userId}/${fileName}`;

        const awsResponse = await this.s3Service.createPresignedPost(key, request.body.contentType, acl);
        const image = await this.imagesService.createImageInDb(request.user.userId, fileName);

        return new ImageAwsMetaDto(new ImageDto(image), new AwsMetaDto(awsResponse, key, acl, request.body.contentType));
    }

    /**
     * Update status
     * @param {e.Request} request
     * @returns {Promise.<EmptyDto>}
     */
    async updateStatus(request) {
        const image = await await this.imagesService.getImageById(request.params.imageId);

        if(!image) {
            throw new NotFoundError('IMAGE_NOT_FOUND');
        }

        if(image && image.authorId !== request.user.userId) {
            throw new ForbiddenError('WITHOUT_ACCESS_TO_IMAGE');
        }

        await image.update(request.body);

        return new EmptyDto();
    }
}
