import express from 'express'
import {SETTINGS} from "../shared/settings";
import {videoRouter} from "./router";


export const app = express();

app.use(express.json());

app.use('/videos', videoRouter);
