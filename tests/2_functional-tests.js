const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);

suite('Functional Tests', function() {
  /*
  test('Create an issue with every field',function(){
    chai
      .request(server)
      .post('/api/issues/apitest')
      .send( {
     "issue_title": "Fix error in posting data",
     "issue_text": "When we post data it has an error.",
    "created_by": "Joe",
    "status_text": "In QA"
       })
       .end(function (err, res) {
     assert.equal(res.status, 200, 'Response status should be 200');
    
      });
    
  })

  
  test('Create an issue with only required fields',function(){
    chai
      .request(server)
      .post('/api/issues/apitest')
      .send( {
     "issue_title": "Fix error in posting data",
     "issue_text": "When we post data it has an error.",
    "created_by": "Joe",
       })
       .end(function (err, res) {
     assert.equal(res.status, 200, 'Response status should be 200');
   
      });
    
  }) 

test('Create an issue with missing required fields: ',function(){
    chai
      .request(server)
      .post('/api/issues/apitest')
      .send( {
     "issue_title": "Fix error in posting data",
     "issue_text": "When we post data it has an error."
       })
       .end(function (err, res) {
         let myobj={ error: 'required field(s) missing' };
         assert.equal(res.body.toString(),myobj.toString());    
   });
    
  })  

test('View issues on a project: GET request  ',function(){
    chai
      .request(server)
      .get('/api/issues/apitest')
       .end(function (err, res) {
         assert.equal(res.status, 200, 'Response status should be 200');     
      
   });
    
  })  
*/
  test('DELETE an issue ',function(){
    chai
      .request(server)
      .delete('/api/issues/apitest')
    .send( {
   "_id": "abc124"
       }) 
       .end(function (err, res) {
        assert.equal(res.status,200);
        console.log(res.body);
   });
    
  }) 
   test('DELETE an issue ',function(){
    chai
      .request(server)
      .delete('/api/issues/apitest')
    .send( {
    "_id": ""
       }) 
       .end(function (err, res) {
       assert.equal(res.status,200);
        console.log(res.body);
   });
    
  }) 
  test('DELETE an issue ',function(){
    chai
      .request(server)
      .delete('/api/issues/apitest')
    .send( {
    "_id": "62c919046847c795734b1ae0"
       }) 
       .end(function (err, res) {
      assert.equal(res.status,200);
        console.log(res.body);
   });
    
  }) 
  
});
