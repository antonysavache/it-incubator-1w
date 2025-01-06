import request from 'supertest'
import {app} from "../../src/core/app"
import {Resolutions} from "../../src/shared/entities/db"

describe('/videos', () => {
    beforeAll(async () => {
        await request(app).delete('/videos')
    })

    it('should return 200 and empty array', async () => {
        const response = await request(app).get('/videos')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })

    it('should return 404 for not existing video', async () => {
        await request(app)
            .get('/videos/1')
            .expect(404)
    })

    it('should not create video with incorrect title data', async () => {
        await request(app)
            .post('/videos')
            .send({
                title: '',
                author: 'author',
                availableResolutions: [Resolutions.P1080]
            })
            .expect(400)

        const getResponse = await request(app)
            .get('/videos')
            .expect(200)

        expect(getResponse.body).toEqual([])
    })

    let createdVideo: any = null
    it('should create video with correct input data', async () => {
        const createResponse = await request(app)
            .post('/videos')
            .send({
                title: 'title',
                author: 'author',
                availableResolutions: [Resolutions.P1080]
            })
            .expect(201)

        createdVideo = createResponse.body

        console.log(createdVideo)

        expect(createdVideo).toEqual({
            id: expect.any(Number),
            title: 'title',
            author: 'author',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: [Resolutions.P1080]
        })

        await request(app)
            .get('/videos/' + createdVideo.id)
            .expect(200)
    })

    it('should not update video with incorrect input data', async () => {
        await request(app)
            .put('/videos/' + createdVideo.id)
            .send({
                title: '',
                author: 'author',
                availableResolutions: [Resolutions.P1080]
            })
            .expect(400)

        const response = await request(app)
            .get('/videos/' + createdVideo.id)
            .expect(200)

        expect(response.body).toEqual(createdVideo)
    })

    it('shouldnt update video that not exist', async () => {
        await request(app)
            .put('/videos/-100')
            .send({
                title: 'title',
                author: 'author',
                availableResolutions: [Resolutions.P1080]
            })
            .expect(400)
    })

    it('should update video with correct input data', async () => {
        await request(app)
            .put('/videos/' + createdVideo.id)
            .send({
                title: 'title2',
                author: 'author2',
                availableResolutions: [Resolutions.P1080]
            })
            .expect(204)

        const response = await request(app)
            .get('/videos/' + createdVideo.id)
            .expect(200)

        expect(response.body).toEqual({
            ...createdVideo,
            title: 'title2',
            author: 'author2'
        })
    })

    it('should delete video', async () => {
        await request(app)
            .delete('/videos/' + createdVideo.id)
            .expect(204)

        await request(app)
            .get('/videos/' + createdVideo.id)
            .expect(404)

        const response = await request(app)
            .get('/videos')
            .expect(200)

        expect(response.body).toEqual([])
    })
})