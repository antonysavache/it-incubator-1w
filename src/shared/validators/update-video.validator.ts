import {ErrorsMessages, OutputVideoType} from "../entities/db";
import {VideoValidator} from "./video.validator";

export class UpdateVideoValidator {
    static validate(body: OutputVideoType, id: number,  errors: ErrorsMessages) {
        VideoValidator.validateExisting(id, errors);
        VideoValidator.validateVideoTitle(body?.title, errors);
        VideoValidator.validateVideoAuthor(body?.author, errors);
        VideoValidator.validateResolutions(body?.availableResolutions, errors);

        return errors;
    }
}