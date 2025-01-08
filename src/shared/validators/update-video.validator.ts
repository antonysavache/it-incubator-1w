import {ErrorsMessages, OutputVideoType} from "../entities/db";
import {VideoValidator} from "./video.validator";

export class UpdateVideoValidator {
    static validate(body: OutputVideoType, id: number, errors: ErrorsMessages) {
        if (typeof body?.canBeDownloaded !== 'boolean') {
            errors.errorsMessages.push({
                message: "canBeDownloaded must be boolean",
                field: "canBeDownloaded"
            });
        }
        VideoValidator.validateExisting(id, errors);
        if (errors.errorsMessages.length) return errors;
        VideoValidator.validateVideoTitle(body?.title, errors);
        VideoValidator.validateVideoAuthor(body?.author, errors);
        VideoValidator.validateResolutions(body?.availableResolutions, errors);
        return errors;
    }
}