'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BasicHandler = require('../../base/BasicHandler');

var _erros = require('../../resources/erros');

var _ImageAwsMetaDto = require('../../models/images/ImageAwsMetaDto');

var _EmptyDto = require('../../base/EmptyDto');

var _images = require('../../resources/images');

class ImagesRoutesHandler extends _BasicHandler.BasicHandler {
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
            description: _images.ApiDescriptions.postImage,
            tags: ['Images'],
            auth: true,
            consumes: this.container.FileContentTypeSchema,
            produces: _ImageAwsMetaDto.ImageAwsMetaDto.schema,
            responseStatus: _erros.HttpStatusCode.Created,
            beforeHooks: [],
            handler: controller.prepareLoadUrl.bind(controller)
        });

        this.addRoute({
            path: '/:imageId',
            method: 'patch',
            summary: 'Update image status',
            description: 'Update image status: 1 - pending, 2 - loaded',
            tags: ['Images'],
            auth: true,
            consumes: this.container.ImageStatusSchema,
            produces: _EmptyDto.EmptyDto.schema,
            responseStatus: _erros.HttpStatusCode.NoContent,
            beforeHooks: [],
            handler: controller.updateStatus.bind(controller)
        });
    }
}
exports.default = ImagesRoutesHandler;
//# sourceMappingURL=ImagesRoutesHandler.js.map