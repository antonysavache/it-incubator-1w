import {ErrorsMessages} from "../entities/db";
import {db} from "../db/db";

export class BaseValidator {
    static validateLength(value: string, field: string, min: number, max: number, errors: ErrorsMessages) {
        if (value?.length > max) {
            errors.errorsMessages.push({
                message: `maxLength: ${max}`,
                field: field,
            });
        }

        if (value?.length < min) {
            errors.errorsMessages.push({
                message: `minLength: ${min}`,
                field: field,
            });
        }
    }

    static validateArray<T>(
        array: T[],
        field: string,
        validator: (item: T) => boolean,
        errorMessage: string,
        errors: ErrorsMessages
    ) {
        if (!array.length) {
            errors.errorsMessages.push({
                message: 'minLength: At least one item should be added',
                field: field,
            });
        }

        array.forEach(item => {
            if (!validator(item)) {
                errors.errorsMessages.push({
                    message: errorMessage,
                    field: field,
                });
            }
        });
    }

    static validateVideoExisting (
        id: number,
        field: string,
        errorMessage: string,
        errors: ErrorsMessages,
    ) {
        if (!db.videos.find(video => video.id === id) || !id) {
            errors.errorsMessages.push({
                message: errorMessage,
                field: field,
            });
        }
    }
}