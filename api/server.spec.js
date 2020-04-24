const request = require('supertest');

const server = require('./server.js');
const db = require('../database/dbConfig.js');

describe('server', function() {
    describe('/', function(){
        it('should return a 200', function(){
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            });
        });
    });

    describe('/', function(){
        it('should return a message with `api: up`', function(){
            return request(server)
            .get('/')
            .then(res => {
                expect(res.body.api).toBe('up');
            });
        });
    });
});