const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

const PUZZLE = {
  OK: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
  SOLVED: "135762984946381257728459613694517832812936745357824196473298561581673429269145378",
  INVALID: "abc..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
}

suite("Functional Tests", () => {

  suite('/api/solve', () => {
    test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: PUZZLE.OK })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, PUZZLE.SOLVED);
          done();
        });
    });

    test("Solve a puzzle with missing puzzle string: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({})
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field missing");
          done();
        });
    });

    test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: PUZZLE.INVALID })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });

    test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: "..12" })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
          done();
        });
    });

    test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: "115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37." })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Puzzle cannot be solved");
          done();
        });
    });
  });

  suite('/api/check', () => {

    test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: 'a2',
          value: 3
        })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, true);
          done();
        });
    });
  
    test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: 'a2',
          value: 9
        })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict, 'column');
          done();
        });
    });
  
    test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: 'a2',
          value: 6
        })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict[0], 'column');
          assert.equal(res.body.conflict[1], 'region');
          done();
        });
    });
  
    test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: 'a5',
          value: 2
        })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict[0], 'row');
          assert.equal(res.body.conflict[1], 'column');
          assert.equal(res.body.conflict[2], 'region');
          done();
        });
    });
  
    test("Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37." })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });
  
    test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: "ab5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37." })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });
  
    test("Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: "5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37." })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
          done();
        });
    });
  
    test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle: "..5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: 'l0',
          value: 1
        })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid coordinate");
          done();
        });
    });
  
    test("Check a puzzle placement with invalid placement value: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle: "..5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: 'a1',
          value: '0'
        })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid value");
          done();
        });
    });
  });

});
