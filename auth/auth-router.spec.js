const request = require('supertest');

const auth = require('./auth-router.js');
const db = require('../database/dbConfig.js');

describe('register', function(){
    beforeEach(async () => {
        await db('users').truncate();
    });

    it('should return a 201 on success', function(){
        return request(auth)
        .post('/register')
        .send({ username: 'Daniel', password: 'daniel1'})
        .then(res => {
            expect(res.status).toBe(201);
        });
    });
});
