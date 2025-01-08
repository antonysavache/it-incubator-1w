import {ErrorsMessages} from "../entities/db";

export class UpdateVideoValidator {
    static validate(body: any, id: number, errors: ErrorsMessages) {
        if (body.author && body.author.length > 20) {
            errors.errorsMessages.push({
                message: "maxLength: 20",
                field: "author"
            });
        }

        if (!body.title) {
            errors.errorsMessages.push({
                message: "title is required",
                field: "title"
            });
        }

        if (body.canBeDownloaded !== undefined && typeof body.canBeDownloaded !== 'boolean') {
            errors.errorsMessages.push({
                message: "canBeDownloaded must be boolean",
                field: "canBeDownloaded"
            });
        }

        if (body.minAgeRestriction !== null && (body.minAgeRestriction < 1 || body.minAgeRestriction > 18)) {
            errors.errorsMessages.push({
                message: "minAgeRestriction should be between 1 and 18",
                field: "minAgeRestriction"
            });
        }

        return errors;
    }
}