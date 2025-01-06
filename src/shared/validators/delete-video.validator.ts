import {ErrorsMessages, InputVideoType} from "../entities/db";
import {VideoValidator} from "./video.validator";

export class DeleteVideoValidator {
    static validate(id: number, errors: ErrorsMessages) {
        VideoValidator.validateExisting(id, errors);
        return errors;
    }
}