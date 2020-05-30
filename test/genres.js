let chai = require('chai');
let chaihttp = require('chai-http');
let server = require('../server');


chai.should();

chai.use(chaihttp);

describe('Genre api', () => {
    // GET ALL GENRES
    describe('GET /api/genre', () => {
        it('It should GET all the genres', (done) => {
            chai.request(server)
                .get('/api/genres')
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
            })
        })

        it('It should not GET all the genres', (done) => {
            chai.request(server)
                .get('/api/genre')
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
            })
        })

    });

    // GET GENRES BY ID
    describe('GET /api/genres/:id', () => {
        it('It should GET a genres by Id', (done) => {
            const id = '5ed1aedf93115d040ccf198f';
            chai.request(server)
                .get('/api/genres/get/' + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
            })
        })

        it('It should not GET a genre by Id', (done) => {
            const id = '';
            chai.request(server)
                .get('/api/genres/get/' + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
            })
        })


        it('It should not GET a genre by Id', (done) => {
            const id = '5ed18f8c7f51282604ce4a71';
            chai.request(server)
                .get('/api/genres/get/' + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
            })
        })

    });

    // ADD GENRES
    describe('POST /api/genre/add', () => {
        it('It should ADD a genres', (done) => {
            const genre = {
                name: "action",
                description: "Action movies"
            }
            chai.request(server)
                .post('/api/genres/add')
                .send(genre)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
            })
        })

        it('It should not ADD a genres when name is empty', (done) => {
            const genre = {
                name: "",
                description: "Action movies"
            }
            chai.request(server)
                .post('/api/genres/add')
                .send(genre)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
            })
        })


        it('It should not ADD a genres when body is empty', (done) => {
            const genre = {}
            chai.request(server)
                .post('/api/genres/add')
                .send(genre)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
            })
        })

    });

    // DELETE GENRES BY ID
    describe('DELETE /api/genres/:id', () => {
        it('It should DELETE a genres by Id', (done) => {
            const id = '5ed1aedf93115d040ccf198f';
            chai.request(server)
                .delete('/api/genres/' + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
            })
        })

        it('It should not DELETE a genre by Id', (done) => {
            const id = '';
            chai.request(server)
                .delete('/api/genres/' + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
            })
        })


        it('It should not DELETE a genre by Id', (done) => {
            const id = '5ed18f8c7f51282604ce4a71';
            chai.request(server)
                .delete('/api/genres/' + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
            })
        })

    });
})