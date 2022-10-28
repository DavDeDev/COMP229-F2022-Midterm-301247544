// File name: faculties.js
//   Author's name: David Pietrocola
//   StudentID: 301247544
//   Web App name: David's Web App
// 
// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const { db } = require("../models/faculties");
const faculties = require("../models/faculties");

// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("faculties/index", {
        title: "Faculties",
        faculties: faculties,
      });
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("faculties/add", {
        title: "add",
        faculties: faculties,
      });
    }
  });
});

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post("/add", (req, res, next) => {
  //create a new faculty
  let newFaculty = faculty({
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject,
  });
  //insert the new faculty into the db
  faculty.create(newFaculty, (err, faculty) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the faculty list
      res.redirect("/faculties");
    }
  });
});

// GET the faculty  Details page in order to edit an existing faculty
router.get("/:id", (req, res, next) => {
  // get a reference to the id from the url
  let id = req.params.id;
  // find one faculty by its id
  faculties.findById(id, (err, facultyToEdit) => {
    if (err) {
      console.log(err);
    } else {
      res.render("faculties/details", {
        title: "Edit faculty",
        faculties: facultyToEdit,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  // get a reference to the id from the url
  let id = req.params.id;
  // create a new faculty object
  let updatedFaculty = faculty({
    _id: id,
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject,
  });
  // find the faculty item via db.faculties.update({"_id":id}) and then update
  faculty.updateOne({ _id: id }, updatedFaculty, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the faculty list
      res.redirect("/faculties");
    }
  });
});


router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  faculty.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the faculty list
      res.redirect("/faculties");
    }
  });
});

module.exports = router;
