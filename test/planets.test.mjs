import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js';

describe('GET /api/planets', function() {
  it('GET, should return an array of planets', async function() {
    await request(app)
    .get('/api/planets')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(res => {
      expect(res.body.response).to.be.an('array');
    });
  });
});