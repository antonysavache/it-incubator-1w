import {ErrorsMessages} from "../entities/db";

export class UpdateVideoValidator {
    static validate(body: any, id: number, errors: ErrorsMessages) {
        if (body.author && body.author.length > 20) {
            errors.errorsMessages.push({
                message: "maxLength: 20",
                field: "author"
            });
        }

        if (body.publicationDate !== undefined) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
            if (typeof body.publicationDate !== 'string' || !dateRegex.test(body.publicationDate)) {
                errors.errorsMessages.push({
                    message: "Invalid publication date format. Use ISO string",
                    field: "publicationDate"
                });
            }
        }

        if (!body.title || body.title === null) {
            errors.errorsMessages.push({
                message: "title is required",
                field: "title"
            });
        } else if (body.title.length > 40) {
            errors.errorsMessages.push({
                message: "maxLength: 40",
                field: "title"
            });
        }

        if (body.canBeDownloaded !== undefined && typeof body.canBeDownloaded !== 'boolean') {
            errors.errorsMessages.push({
                message: "canBeDownloaded must be boolean",
                field: "canBeDownloaded"
            });
        }

        if (body.minAgeRestriction !== null &&
            (typeof body.minAgeRestriction !== 'number' ||
                body.minAgeRestriction < 1 ||
                body.minAgeRestriction > 18)
        ) {
            errors.errorsMessages.push({
                message: "minAgeRestriction should be between 1 and 18",
                field: "minAgeRestriction"
            });
        }

        return errors;
    }
}