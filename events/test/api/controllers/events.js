const app = require('../../../index');
const supertest = require('supertest');

describe('events controller', () => {
  describe('search', () => {
    it('should search for event bylocation', (done) => {
      supertest(app)
        .get('/events/search?location=sydney')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          typeof(err).should.be(undefined);
          res.body.should.eql('blah');
          done();
        });
    });
  });
});