"use strict";
const MongoDb = require("mongodb");
const MongoClient = MongoDb.MongoClient;
const ObjectId = MongoDb.ObjectID;

const ID_LENGTH = 24;
const MONGO_DB_URL = process.env["MONGO_URI"];

module.exports = function (app) {
  app
    .route("/api/issues/:project/")
    .get(function (req, res) {
      console.log("Request received in get");
      const project = req.params.project;
      const query = {};

      if (!project) {
        console.log("No project provi");
        return;
      }

      query["projectname"] = project;
      const _id = req.query._id;
      if (_id) {
        if (_id.length !== ID_LENGTH) {
          console.log("_id is not valid", _id);
          return res.json();
        }
        query["_id"] = new ObjectId(_id);
      }

      const open = req.query.open;
      if (open) {
        query["open"] = JSON.parse(open);
      }

      const allowedQuryParams = [
        "assigned_to",
        "status_text",
        "created_by",
        "issue_title",
        "issue_text",
        "created_on",
        "updated_on",
      ];

      for (const param of allowedQuryParams) {
        if (req.query[param]) {
          query[param] = req.query[param];
        }
      }
      console.log("Query in get", query);

      MongoClient.connect(MONGO_DB_URL, function (err, db) {
        if (err) {
          console.log("Error occured while creating connection in get", err);
          return res.json();
        }
        console.log("Connection created in get");

        const myDatabase = db.db("Project");
        myDatabase
          .collection("issue tracker")
          .find(query, { projection: { projectname: 0 } })
          .toArray(function (err, result) {
            if (err) {
              console.log("Error occured while fetching record in get", err);
              return res.json();
            }
            res.json(result);
            db.close();
          });
      });
    })
    .post(function (req, res) {
      console.log("Request received in post");
      const project = req.params.project;
      const setData = {};
       if (!req.body.created_by || !req.body.issue_text || !req.body.issue_title) 
       {
        console.log("Required field(s) missing in post");
        res.json({ error: "required field(s) missing" });
      } else {
          const allowedQueryParams = [
            "assigned_to",
            "status_text",
            "created_by",
            "issue_text ",
            "issue_title"
          ];
              for (const param of allowedQueryParams) 
              {
                if (req.body[param]) {
                  setData[param] = req.body[param];
                }
                else{
                  setData[param]="";
                }
              } 
                  /*let issue_title = req.body.issue_title;
                    let issue_text = req.body.issue_text;
                    let created_by = req.body.created_by;
                    let assigned_to = req.body.assigned_to;
                    let status_text = req.body.status_text; 
                    if (assigned_to) 
                    setData["assigned_to"] = assigned_to;
                    else 
                    setData["assigned_to"] = "";
                    if (status_text) 
                    setData["status_text"] = status_text;
                    else 
                    setData["status_text"] = ""; 
                    setData["created_by"] = created_by;
                    setData["issue_title"] = issue_title;
                    setData["issue_text"] = issue_text;
                    */
                    const created_on = new Date().toISOString();
                    setData["open"] = true;
                    setData["created_on"] = created_on;
                    setData["updated_on"] = created_on;
                    setData["projectname"] = project;
                    const url = process.env["MONGO_URI"];
                    MongoClient.connect(url, function (err, db) {
                    const myDatabase = db.db("Project");
              
                    myDatabase
                      .collection("issue tracker")
                      .insertOne(setData, function (err, res) {
                        if (err) 
                        {
                          console.log("Error occured while inserting record in data base", err);
                          return res.json();
                        }
                        console.log("Data Successfull inserted ");
                      });
                    myDatabase
                      .collection("issue tracker")
                      .findOne(setData, {}, function (err, result) {
                        if (err) 
                        {
                          console.log("Error occured while fectching record from data base to display", err);
                          return res.json();
                        }
                        res.json({
                          assigned_to: result.assigned_to,
                          status_text: result.status_text,
                          open: result.open,
                          _id: result._id,
                          issue_title: result.issue_title,
                          issue_text: result.issue_text,
                          created_by: result.created_by,
                          created_on: result.created_on,
                          updated_on: result.updated_on,
                        });
                        db.close();
                       });
                    });
                 }
              })
    .put(function (req, res) 
        {
        console.log("Request received in put");
        let project = req.params.project;
        const _id = req.body._id;
        const updated_on = new Date().toISOString();
        const setData = {};
        setData["updated_on"] = updated_on;
       // setData["projectname"] = project;
        const allowedBodyParams = [
          "assigned_to",
          "status_text",
          "created_by",
          "issue_text ",
          "issue_title"
        ];
        for (const param of allowedBodyParams) 
        {
          if (req.body[param]) {
            setData[param] = req.body[param];
          }
        } 
          /*let issue_title = req.body.issue_title;
          let issue_text = req.body.issue_text;
          let created_by = req.body.created_by;
          let assigned_to = req.body.assigned_to;
          let status_text = req.body.status_text;*/
           /*  if (issue_title) {
               setData["issue_title"] = issue_title;
                }
                if (issue_text) {
                setData["issue_text"] = issue_text;
                }
                if (created_by) {
                setData["created_by"] = created_by;
                }
                if (assigned_to) {
                setData["assigned_to"] = assigned_to;
                }
                if (status_text) {
                setData["status_text"] = status_text;
                } */
                 if (req.body.open == "false")
                  {
                     setData["open"] = false;
                 }
                    if (_id && _id.length == ID_LENGTH) 
                     {
                       if (!req.body.issue_title &  
                            !req.body.issue_text  &  
                            !req.body.created_by  &
                            !req.body.assigned_to &
                            !req.body.status_text &
                            !req.body.open
                          )
                         {
                          res.json({ error: "no update field(s) sent", _id: _id });
                         } 
                        else 
                         {
                          const url = process.env["MONGO_URI"];
                          const myid = new ObjectId(_id);
                          let myquery = { _id: myid };
                          let newvalues = { $set: setData };
                          MongoClient.connect(url, function (err, db) 
                          {
                            const myDatabase = db.db("Project");
                            myDatabase
                            .collection("issue tracker")
                            .updateOne(myquery, newvalues, function (err, result) 
                            {
                             if (err) 
                             {
                              console.log("Error occured while update operation", err);
                             }
                            
                                if (result.matchedCount == 0) 
                                {
                                  res.json({ error: "could not update", _id: _id });
                                } 
                                else 
                                {
                                  res.json({ result: "successfully updated", _id: _id });
                                }
                                db.close();
                             })
                           
                          })
                         }
                        }
                      else if (!_id) 
                        {
                           console.log("Entered in missing area");
                           res.json({ error: "missing _id" });
                        } 
                      else 
                        {
                          console.log("Short ID");
                          res.json({ error: "could not update", _id: _id });
                        }
       })
    .delete(function (req, res) {
      console.log("Request received in delete");
      const project = req.params.project;
      const _id = req.body._id;

      if (!_id) {
        return res.json({ error: "missing _id" });
      }

      if (_id.length !== ID_LENGTH) {
        console.log("_id is not valid", _id);
        return res.json();
      }

      MongoClient.connect(MONGO_DB_URL, function (err, db) {
        if (err) {
          console.log("Error occured while creating connection in delete", err);
          return res.json();
        }
        console.log("Connection created in delete");

        const projectDatabase = db.db("Project");
        const query = { _id: new ObjectId(_id), projectname: project };

        projectDatabase
          .collection("issue tracker")
          .deleteOne(query, function (err, result) {
            if (err) {
              console.log("Error occured while fetching record in delete", err);
              return res.json();
            }

            if (result.deletedCount == 1) {
              console.log("One record deleted");
              res.json({ result: "successfully deleted", _id: _id });
            } else {
              console.log("Record not found");
              res.json({ error: "could not delete", _id: _id });
            }

            db.close();
          });
      });
    });
};