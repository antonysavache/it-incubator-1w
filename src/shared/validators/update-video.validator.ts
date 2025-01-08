import {ErrorsMessages} from "../entities/db";

export class UpdateVideoValidator {
    static validate(body: any, id: number, errors: ErrorsMessages) {
        // Проверка title на null или пустую строку
        if (!body.title) {
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

        // Проверка типа canBeDownloaded
        if (body.canBeDownloaded !== undefined && typeof body.canBeDownloaded !== 'boolean') {
            errors.errorsMessages.push({
                message: "canBeDownloaded must be boolean",
                field: "canBeDownloaded"
            });
        }

        // Проверка author (если предоставлен)
        if (body.author && body.author.length > 20) {
            errors.errorsMessages.push({
                message: "maxLength: 20",
                field: "author"
            });
        }

        // Проверка minAgeRestriction
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