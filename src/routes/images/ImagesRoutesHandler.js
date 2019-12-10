import { BasicHandler } from '../../base/BasicHandler';
import { HttpStatusCode } from '../../resources/erros';
import { ImageAwsMetaDto } from '../../models/images/ImageAwsMetaDto';
import { EmptyDto } from '../../base/EmptyDto';
import { ApiDescriptions } from '../../resources/images';

export default class ImagesRoutesHandler extends BasicHandler {
    constructor(container) {
        super();
        this.container = container;
        this.apiRoot = '/images';
    }

    setup() {
        const controller = this.container.ImagesController;

        this.addRoute({
            path: '/',
            method: 'post',
            summary: 'Request for save image',
            description: ApiDescriptions.postImage,
            tags: ['Images'],
            auth: true,
            consumes: this.container.FileContentTypeSchema,
            produces: ImageAwsMetaDto.schema,
            responseStatus: HttpStatusCode.Created,
            beforeHooks: [],
            handler: controller.prepareLoadUrl.bind(controller),
        });

        this.addRoute({
            path: '/:imageId',
            method: 'patch',
            summary: 'Update image status',
            description: 'Update image status: 1 - pending, 2 - loaded',
            tags: ['Images'],
            auth: true,
            consumes: this.container.ImageStatusSchema,
            produces: EmptyDto.schema,
            responseStatus: HttpStatusCode.NoContent,
            beforeHooks: [],
            handler: controller.updateStatus.bind(controller),
        });
    }
}
