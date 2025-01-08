import {ErrorsMessages} from "../entities/db";

export class CreateVideoValidator {
    static validate(body: any, errors: ErrorsMessages) {
        if (!body) {
            errors.errorsMessages.push({
                message: "body is required",
                field: "body"
            });
            return errors;
        }

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

        if (!body.availableResolutions || !Array.isArray(body.availableResolutions) || body.availableResolutions.length === 0) {
            errors.errorsMessages.push({
                message: "At least one resolution required",
                field: "availableResolutions"
            });
        }

        return errors;
    }
}