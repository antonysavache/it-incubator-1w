import {Router} from "express";
import {CreateVideoValidator} from "../shared/validators/create-video.validator";
import {db} from "../shared/db/db";
import {UpdateVideoValidator} from "../shared/validators/update-video.validator";

export const videoRouter = Router({});



export const videoController = {
    getVideos(req, res) {
        res.status(200).json(db.videos);
    },

    createVideo(req, res) {
        const errors = {errorsMessages: []};
        CreateVideoValidator.validate(req.body, errors);

        if (errors.errorsMessages.length) {
            res.status(400).json(errors);
            return;
        }

        const now = new Date();
        const createdAt = now.toISOString();

        const nextDay = new Date(now);
        nextDay.setDate(nextDay.getDate() + 1);
        const publicationDate = nextDay.toISOString();

        const newVideo = {
            id: +now,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: createdAt,
            publicationDate: publicationDate,
            availableResolutions: req.body.availableResolutions
        }

        db.videos.push(newVideo);
        res.status(201).json(newVideo);
    },

    updateVideo(req, res) {
        const id = +req.params.id;
        const video = db.videos.find(v => v.id === id);

        if (!video) {
            res.status(404).json({
                errorsMessages: [{
                    message: "Video not found",
                    field: "id"
                }]
            });
            return;
        }

        const errors = {errorsMessages: []};
        UpdateVideoValidator.validate(req.body, id, errors);

        if (errors.errorsMessages.length) {
            res.status(400).json(errors);
            return;
        }

        Object.assign(video, req.body);
        res.sendStatus(204);
    },

    getVideo(req, res) {
        const id = +req.params.id;
        const video = db.videos.find(v => v.id === id);

        if (!video) {
            res.status(404).json({
                errorsMessages: [{
                    message: "Video not found",
                    field: "id"
                }]
            });
            return;
        }

        res.status(200).json(video);
    },

    deleteVideos(req, res) {
        db.videos = [];
        res.sendStatus(204);
    },

    deleteVideo(req, res) {
        const id = +req.params.id;
        const video = db.videos.find(v => v.id === id);

        if (!video) {
            res.status(404).json({
                errorsMessages: [{
                    message: "Video not found",
                    field: "id"
                }]
            });
            return;
        }

        db.videos = db.videos.filter(v => v.id !== id);
        res.sendStatus(204);
    }
};

videoRouter.get('/', videoController.getVideos);
videoRouter.get('/:id', videoController.getVideo);
videoRouter.post('/', videoController.createVideo);
videoRouter.put('/:id', videoController.updateVideo);
videoRouter.delete('/', videoController.deleteVideos);
videoRouter.delete('/:id', videoController.deleteVideo);