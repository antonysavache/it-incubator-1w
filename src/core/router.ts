import {Router} from "express";
import {db} from "../shared/db/db";
import {SETTINGS} from "../shared/settings";
import {CreateVideoValidator} from "../shared/validators/create-video.validator";
import {UpdateVideoValidator} from "../shared/validators/update-video.validator";
import {DeleteVideoValidator} from "../shared/validators/delete-video.validator";

export const videoRouter = Router();

export const videoController = {
    getVideos(req, res) {
        res.status(200).json(db.videos);
    },

    createVideo(req, res) {
        const errors = {errorsMessages: []};
        CreateVideoValidator.validate(req.body, errors);

        if (errors.errorsMessages.length) {
            res.status(400).json(errors);

            return
        }


        const newVideos = {
            id: Date.now(),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: req.body.availableResolutions,
        }

        db.videos.push(newVideos)

        res.status(201).json(newVideos);
    },

    updateVideo(req, res) {
        const id = +req.params.id;
        const errors = {errorsMessages: []};

        UpdateVideoValidator.validate(req.body, id, errors);

        if (errors.errorsMessages.length) {
            res.status(400).json(errors)
            return
        }

        const video = db.videos.find(video => video.id === id);
        Object.assign(video, req.body);
        res.status(204).end();
    },

    getVideo(req, res) {
        const id = +req.params.id;
        const video = db.videos.find(v => v.id === id);

        if (!video) {
            return res.status(404).json({
                errorsMessages: [{
                    message: "Video not found",
                    field: "id"
                }]
            });
        }

        res.status(200).json(video);
    },

    deleteVideos(req, res) {
        db.videos = [];

        res.status(204).end()
    },

    deleteVideo(req, res) {
        const errors = {errorsMessages: []};
        const id = +req.params.id;

        DeleteVideoValidator.validate(id, errors);

        if (errors.errorsMessages.length) {
            res.status(404).json(errors); //
            return
        }

        db.videos = db.videos.filter(video => video.id !== id);
        res.status(204).end();
    }
}

videoRouter.get('/', videoController.getVideos);
videoRouter.get('/:id', videoController.getVideo);
videoRouter.post('/', videoController.createVideo);
videoRouter.put('/:id', videoController.updateVideo);
videoRouter.delete('/', videoController.deleteVideos);
videoRouter.delete('/:id', videoController.deleteVideo);
videoRouter.delete('/testing/all-data', videoController.deleteVideos);
