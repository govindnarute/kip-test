import { S3 } from 'aws-sdk';
import { promisify } from 'util';
import fs from 'fs';

export default class S3Service {

    /**
     * @param config
     */
    constructor({ config }) {
        this.bucket = config.s3.bucket;

        this.s3Connection = new S3({
            region: config.s3.region,
            credentials: {
                accessKeyId: config.s3.accessKey,
                secretAccessKey: config.s3.secret
            }
        });
    }

    /**
     * @param {string} key
     * @param {string} contentType
     * @param {string} acl
     * @returns {*|Promise<any>|Promise<void>}
     */
    createPresignedPost(key, contentType, acl) {
        /**
         * @type {S3.PresignedPost.Params}
         */
        const params = {
            Bucket: this.bucket,
            Conditions: [
                { acl },
                { 'Content-Type': contentType },
                { key }
            ]
        };

        const action = promisify(this.s3Connection.createPresignedPost.bind(this.s3Connection));

        return action(params);
    }

    /**
     * add file to S3
     * @param filePath
     * @param fileType
     * @param fileName
     * @returns {Promise}
     */
    uploadFile(filePath, fileType, fileName) {
        return this.s3Connection.upload({
            Body: fs.createReadStream(filePath),
            Bucket: this.bucket,
            ContentType: fileType,
            Key: fileName,
            ACL: 'public-read',
        }).promise();
    }
}
