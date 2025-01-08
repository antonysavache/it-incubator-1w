import {ErrorsMessages, OutputVideoType} from "../entities/db";
import {VideoValidator} from "./video.validator";

export class UpdateVideoValidator {
    static validate(body: any, id: number, errors: ErrorsMessages) {
        if (!body?.title) {
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

        VideoValidator.validateVideoTitle(body?.title, errors);
        VideoValidator.validateVideoAuthor(body?.author, errors);
        VideoValidator.validateResolutions(body?.availableResolutions, errors);

        return errors;
    }
}