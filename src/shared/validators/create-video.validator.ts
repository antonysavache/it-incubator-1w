import {ErrorsMessages, InputVideoType} from "../entities/db";
import {VideoValidator} from "./video.validator";

export class CreateVideoValidator {
    static validate(body: InputVideoType, errors: ErrorsMessages) {
        VideoValidator.validateVideoTitle(body?.title.trim(), errors);
        VideoValidator.validateVideoAuthor(body?.author.trim(), errors);
        VideoValidator.validateResolutions(body?.availableResolutions, errors);
        return errors;
    }
}