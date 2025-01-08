import express from 'express'
import {SETTINGS} from "../shared/settings";
import {videoRouter} from "./router";
import {db} from "../shared/db/db";


export const app = express();

app.use(express.json());

app.delete('/testing/all-data', (req, res) => {
    db.videos = [];
    res.status(204).end();
});
app.use('/videos', videoRouter);
