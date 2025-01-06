export interface DB {
    videos: OutputVideoType[]
}

export enum Resolutions {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
}

export interface OutputVideoType extends InputVideoType {
    id: number
    canBeDownloaded: boolean
    minAgeRestriction: null
    createdAt: string
    publicationDate: string
}

export interface InputVideoType {
    title: string;
    author: string;
    availableResolutions: Resolutions[];
}

export interface ErrorsMessages {
    errorsMessages: {
        message: string;
        field: string;
    }[];
}