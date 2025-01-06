import {BaseValidator} from "./base.validator";
import {ErrorsMessages, Resolutions} from "../entities/db";

export class VideoValidator extends BaseValidator {
    static validateVideoTitle(title: string, errors: ErrorsMessages) {
        this.validateLength(title, 'title', 1, 40, errors);
    }

    static validateVideoAuthor(author: string, errors: ErrorsMessages) {
        this.validateLength(author, 'author', 1, 20, errors);
    }

    static validateResolutions(resolutions: string[], errors: ErrorsMessages) {
        this.validateArray(
            resolutions,
            'availableResolutions',
            (resolution) => Object.keys(Resolutions).includes(resolution),
            'Invalid resolution format',
            errors
        );
    }

    static validateExisting(id: number, errors: ErrorsMessages) {
        this.validateVideoExisting(id, 'id', 'video doesn\'t exist', errors)
    }
}