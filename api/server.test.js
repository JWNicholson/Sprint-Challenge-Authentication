require('dotenv').config();
const request = require('supertest');
const server = require('../api/server');

describe('server', () => {
    describe('environment', () => {
        it('should use the testing environment', () => {
            expect(process.env.DB_ENV).toBe('testing')
        })
        it('should return status 200 OK', async () => {
            const res = await request(server).get('/')

            expect(res.status).toBe(200);
        })
    })
})