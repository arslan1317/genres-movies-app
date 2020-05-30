let chai = require('chai');
let chaihttp = require('chai-http');
let server = require('../server');


chai.should();

chai.use(chaihttp);

describe('Movies Api', () => {
    // GET ALL MOVIES
    describe('GET /api/movies', () => {
        it('It should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
            })
        })

        it('It should not GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movie')
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
            })
        })

    });

    // GET MOVIE BY ID
    describe('GET /api/movies/get/:id', () => {
        it('It should GET a movies by Id', (done) => {
            const id = '5ed1b354f3c59a473099592f';
            chai.request(server)
                .get('/api/movies/get/' + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
            })
        })

        it('It should not GET a movies by Id', (done) => {
            const id = '';
            chai.request(server)
                .get('/api/movies/get/' + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
            })
        })


        it('It should not GET a movie by Id', (done) => {
            const id = '5ed1b1c3221df83050781e59';
            chai.request(server)
                .get('/api/movies/get/' + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
            })
        })

    });

    // ADD MOVIE
    describe('POST /api/movie/add', () => {
        it('It should ADD a movie', (done) => {
            const movie = {
                name: "The Galaxy",
	            description: "A great move",
	            release_date: "2020-05-29T21:51:12.212Z",
	            genres: "5ed18f8c7f51282604ce4a73",
	            duration: "02:04:10"
            }
            chai.request(server)
                .post('/api/movies/add')
                .send(movie)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
            })
        })

        it('It should not ADD a add when name is empty', (done) => {
            const movie = {
                name: "",
	            description: "A great move",
	            release_date: "2020-05-29T21:51:12.212Z",
	            genres: "5ed18f8c7f51282604ce4a73",
	            duration: "02:04:10"
            }
            chai.request(server)
                .post('/api/genres/add')
                .send(movie)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
            })
        })


        it('It should not ADD a movie when body is empty', (done) => {
            const movie = {}
            chai.request(server)
                .post('/api/genres/add')
                .send(movie)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
            })
        })

    });

    // DELETE MOVIES BY ID
    describe('DELETE /api/movies/:id', () => {
        it('It should DELETE a movie by Id', (done) => {
            const id = '5ed1b354f3c59a473099592f';
            chai.request(server)
                .delete('/api/movies/' + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
            })
        })

        it('It should not DELETE a movie by Id', (done) => {
            const id = '';
            chai.request(server)
                .delete('/api/movie/' + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
            })
        })


        it('It should not DELETE a movie by Id', (done) => {
            const id = '5ed18f8c7f51282604ce4a71';
            chai.request(server)
                .delete('/api/movie/' + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
            })
        })

    });
})