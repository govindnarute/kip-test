'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class AwsMetaDto {
    /**
     * @param {object} awsResponse
     * @param {string}key
     * @param {string} acl
     * @param {string} contentType
     */
    constructor(awsResponse, key, acl, contentType) {
        this.formData = awsResponse.fields;

        this.formData.key = key;

        this.formData.acl = acl;

        this.formData['Content-Type'] = contentType;

        this.url = awsResponse.url;
    }

    static get schema() {
        return {
            title: 'AwsMetaSchema',
            type: 'object',
            required: ['formData', 'url'],
            properties: {
                formData: {
                    type: 'object',
                    required: ['Content-Type', 'acl', 'key', 'X-Amz-Signature', 'Policy', 'X-Amz-Date', 'X-Amz-Credential', 'X-Amz-Algorithm'],
                    properties: {
                        'Content-Type': {
                            type: 'string'
                        },
                        acl: {
                            type: 'string'
                        },
                        key: {
                            type: 'string'
                        },
                        'X-Amz-Signature': {
                            type: 'string'
                        },
                        Policy: {
                            type: 'string'
                        },
                        'X-Amz-Date': {
                            type: 'string'
                        },
                        'X-Amz-Credential': {
                            type: 'string'
                        },
                        'X-Amz-Algorithm': {
                            type: 'string'
                        }
                    }
                },
                url: {
                    type: 'string'
                }
            }

        };
    }
}
exports.AwsMetaDto = AwsMetaDto;
//# sourceMappingURL=AwsMetaDto.js.map