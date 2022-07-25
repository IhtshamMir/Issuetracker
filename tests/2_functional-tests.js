const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('Create an issue with every field', function() {
    chai
      .request(server)
      .post('/api/issues/apitest')
      .send({
        "issue_title": "Fix error in posting data",
        "issue_text": "When we post data it has an error.",
        "created_by": "Joe",
        "assigned_to": "Doe",
        "status_text": "In QA"
      })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
      });

  })


  test('Create an issue with only required fields', function() {
    chai
      .request(server)
      .post('/api/issues/apitest')
      .send({
        "issue_title": "Fix error in posting data",
        "issue_text": "When we post data it has an error.",
        "created_by": "Joe",
      })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');

      });

  })


  test('Create an issue with missing required fields: ', function() {
    chai
      .request(server)
      .post('/api/issues/apitest')
      .send({
        "issue_title": "Fix error in posting data",
        "issue_text": "When we post data it has an error."
      })
      .end(function(err, res) {
        //let myobj={ error: 'required field(s) missing' };
        // assert.equal(res.body.toString(),myobj.toString());    
        assert.equal(res.status, 200, 'Response status should be 200');
      });

  })

  test('View issues on a project: GET request  ', function() {
    chai
      .request(server)
      .get('/api/issues/apitest')
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
      });

  })

  test('View issues on a project: GET request with one filter ', function() {
    chai
      .request(server)
      .get('/api/issues/apitest?open=true')
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        console.log("GET with one filter", res.body);
      });

  })
  test('View issues on a project: GET request with multiple filter ', function() {
    chai
      .request(server)
      .get('/api/issues/apitest?open=true&issue_title=hellp')
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        console.log("GET with multiple filter", res.body);
      });

  })
  test('Update one field on an issue: PUT request to /api/issues/{project} ', function() {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        "_id": "62dd5f02d09668593f805762",
        "status_text": "In QA"

      })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        console.log("Update one field with PUT request", res.body);
      });

  })
  test('Update multiple fields on an issue: PUT request to /api/issues/{project} ', function() {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        "_id": "62dd5f02d09668593f805762",
        "issue_text": "Error resolved",
        "open": "false"

      })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        console.log("Update multiple fields with PUT request", res.body);
      });

  })

  test('Update an issue with missing _id: PUT request to  /api/issues/{project} ', function() {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({

        "issue_text": "Error resolved",
        "open": "false"

      })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        console.log("Update an issue with missing ID", res.body);
      });

  })
  test('Update an issue with no fields to update: PUT request to /api/issues/{project} ', function() {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        "_id": "62dd5f02d09668593f805762"

      })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        console.log("Update an issue with no updated fields", res.body);
      });

  })

  test('Update an issue with an invalid _id: PUT request to /api/issues/{project} ', function() {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        "_id": "1234"

      })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        console.log("Update an issue with invalid ID", res.body);
      });

  })



  test('DELETE an issue with invalid ID ', function() {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({
        "_id": "abc124"
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        console.log(res.body);
      });

  })
  test('DELETE an issue with Empty ID ', function() {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({
        "_id": ""
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        console.log(res.body);
      });

  })
  test('DELETE an issue with complete ID ', function() {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({
        "_id": "62dd63225f63280781f60670"
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        console.log(res.body);
      });

  })

});
