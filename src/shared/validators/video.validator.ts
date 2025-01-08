import {BaseValidator} from "./base.validator";
import {ErrorsMessages, Resolutions} from "../entities/db";

export class VideoValidator extends BaseValidator {
    static validateVideoTitle(title: string | null | undefined, errors: ErrorsMessages) {
        if (!title) {
            errors.errorsMessages.push({
                message: "title is required",
                field: "title"
            });
            return;
        }
        this.validateLength(title, 'title', 1, 40, errors);
    }

    static validateVideoAuthor(author: string | null | undefined, errors: ErrorsMessages) {
        if (!author) {
            errors.errorsMessages.push({
                message: "author is required",
                field: "author"
            });
            return;
        }
        this.validateLength(author, 'author', 1, 20, errors);
    }

    static validateResolutions(resolutions: Resolutions[] | undefined, errors: ErrorsMessages) {
        if (!resolutions || !Array.isArray(resolutions)) {
            errors.errorsMessages.push({
                message: "availableResolutions is required",
                field: "availableResolutions"
            });
            return;
        }

        if (!resolutions.length) {
            errors.errorsMessages.push({
                message: "At least one resolution should be provided",
                field: "availableResolutions"
            });
            return;
        }

        const validResolutions = Object.values(Resolutions);
        for (const resolution of resolutions) {
            if (!validResolutions.includes(resolution)) {
                errors.errorsMessages.push({
                    message: "Invalid resolution format",
                    field: "availableResolutions"
                });
                break;
            }
        }
    }

    static validateExisting(id: number, errors: ErrorsMessages) {
        this.validateVideoExisting(id, 'id', 'video doesn\'t exist', errors);
    }
}