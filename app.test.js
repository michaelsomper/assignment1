
'use strict';

const request = require('supertest');
const app = require('./app');

describe('Test the sweet wisdom service', () => {
    test('GET /recipe?keyword= succeeds', () => {
        return request(app)
	    .get('/recipe?keyword=')
	    .expect(200);
    });

    test('GET /retrieve returns text', () => {
        return request(app)
	    .get('/retrieve')
	    .expect('Content-type', /text/);
    });

    test('GET /abouts returns html', () => {
        return request(app)
	    .get('/aboutus')
	    .expect('Content-type', /html/);
    });

    test('GET /copyright returns html', () => {
        return request(app)
	    .get('/copyright')
	    .expect('Content-type', /html/);
    });

    test('GET /recipe?keyword=Frog returns nothing', () => {
        return request(app)
	    .get('/recipe?keyword=Frog')
	    .expect("[]");
    });

    test('GET /recipe?keyword=Homemade includes Homemade', () => {
        return request(app)
	    .get('/recipe?keyword=Homemade')
	    .expect(/Homemade/);
    });

    test('POST /upload consistent', () => {
        const image = './images/chef.jpg';
        return request(app)
        .post('/upload')
        .send(image)
	    .expect(400);
    });
});