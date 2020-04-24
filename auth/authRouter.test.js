const request = require('supertest');
const server = require('../api/server.js');
const auth = require('./auth-router.js');
const db = require('../database/dbConfig.js');

describe('register', function(){
    beforeEach(async () => {
        await db('users').truncate();
    });

    it('should return a 201 on success', function(){
        return request(server)
        .post('/api/auth/register')
        .send({ username: 'Daniel', password: 'daniel1'})
        .then(res => {
            expect(res.status).toBe(201);
        });
    });

    it('should return a json object', function(){
        return request(server)
        .post('/api/auth/register')
        .send({ username: 'Daniel', password: 'daniel1' })
        .then(res => {
            expect(res.type).toEqual('application/json');
        });
    });
});

describe('login', function(){
    // beforeEach(async () => {
    //     await db('users').truncate();
    // });

    it('should return a 200 on success', function(){
        return request(server)
        .post('/api/auth/login')
        .send({ username: 'Daniel', password: 'daniel1'})
        .then(res => {
            expect(res.status).toBe(200);
        });
    });

    it('should return a json object', function(){
        return request(server)
        .post('/api/auth/login')
        .send({ username: 'Daniel', password: 'daniel1' })
        .then(res => {
            expect(res.type).toEqual('application/json');
        });
    });
});
