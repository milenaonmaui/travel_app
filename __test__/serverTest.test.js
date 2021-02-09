import { app } from '../src/server/server'

const supertest = require('supertest');

const { reponse } = require('express');
const request = supertest(app)
describe('server test', () => {
    it('Test initial load of existing trips', async done => {
        const response = await request.get('/trips')
        expect(200)
        done()
        })
           
})

