const app = require('../src/app');
const request = require('supertest')

describe('API', function () {
    //pass
    it('responds with json', function (done) {
        request(app)
            .get('/planets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)

    });
});

describe('API', function () {
    //pass
    it('responds with json', function (done) {
        request(app)
            .get('/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)

    });
});

describe('API', function () {

    //pass
    it('should add a new launch', function (done) {
        request(app)
            .post('/launches')
            .send({ mission: 'Hello New Earth', rocket: 'Explorer IS1', launchDate: '2023-06-15', destination: 'Kepler-62 f' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done)

    });


    //FAIL
    it('should return an error if missing required launch property', function (done) {
        const invalidLaunch = {
            rocket: 'Rocket 2',
            launchDate: '2023-11-06',
            target: 'Target 2',
        };

        request(app)
            .post('/launches')
            .send(invalidLaunch)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)  // Expect a 400 response status
            .end((err, res) => {
                if (err) return done(err);

                // Verify the error message in the response
                if (res.body && res.body.error === 'Missing required launch property!') {
                    done();
                } else {
                    done(new Error('Expected an error message in the response'));
                }
            });
    });

    //FAIL
    it('should delete a launch by ID', function (done) {
        // Create a launch
        const newLaunch = {
            mission: 'Test Launch',
            rocket: 'Test Rocket',
            launchDate: '2023-12-31',
            target: 'Test Target',
        };

        // Add the launch
        request(app)
            .post('/launches')
            .send(newLaunch)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);

                // Delete the launch by ID
                const launchId = res.body.id; // Assuming the response contains the ID
                request(app)
                    .delete(`/launches/${launchId}`)
                    .expect(200, done);
            });
    });

    //PASS
    it('should return an error when deleting a non-existent launch', function (done) {
        const nonExistentId = 12345; // Replace with a non-existent ID
        request(app)
            .delete(`/launches/${nonExistentId}`)
            .expect(404, done);
    });


    //pass
    it('should retrieve a launch by ID', function (done) {
        // Create a launch
        const newLaunch = {
            mission: 'Test Launch',
            rocket: 'Test Rocket',
            launchDate: '2023-12-31',
            target: 'Test Target',
        };

        // Add the launch
        request(app)
            .post('/launches')
            .send(newLaunch)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);

                // Retrieve the launch by ID
                const launchId = res.body.id; // Assuming the response contains the ID
                request(app)
                    .get(`/launches/${launchId}`)
                    .expect(200, done);
            });
    });

    //fail
    it('should return an error when retrieving a launch with an invalid ID', function (done) {
        const invalidId = 'invalid'; // Replace with an invalid ID
        request(app)
            .get(`/launches/${invalidId}`)
            .expect(400, done);
    });

});