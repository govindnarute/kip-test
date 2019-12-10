import { BaseFileValidation } from '../../base/BaseFileValidation';
import * as fileType  from 'file-type';
import * as fs from 'fs';
import { BadRequestError } from '../http';

export class FileValidation extends BaseFileValidation {
    static validate(field, maxSize, mimeTypes) {
        return (req, res, next) => {
            if (!req.files || !req.files[field]) {
                return next(new BadRequestError());
            }

            if (req.files[field].size > maxSize) {
                return next(new BadRequestError());
            }

            fs.readFileSync(req.files[field].path, (err, file) => {
                if (err) {
                    return next(err);
                }

                const type = fileType(file);
                if(type === null || mimeTypes.indexOf(type.mime) === -1) {
                    return next(new BadRequestError());
                }

                res.locals.fileType = type.mime;
                next();
            });
        };
    }
}
