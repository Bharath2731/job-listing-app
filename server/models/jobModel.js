const express = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const jobSchema = new Schema({
  companyName:  { type: String, required: true },
  addLogoUrl:   { type: String, required: true },
  jobPosition:  { type: String, required: true },
  monthlySalary: { type: Number, required: true },
  jobType:       { type: String, enum: ["full-time", "intern"], required: true },
  remoteOrOffice:{ type: String, enum: ["remote", "office"], required: true },
  location:      { type: String, required: true },
  jobDescription:{ type: String, required: true },
  aboutCompany:  { type: String, required: true },
  skillsRequired:{ type: [String], required: true },
  information:   { type: String },
  createdBy : {type: String ,required:true},
  createdOn : {type : String, required : true}
});

const Job =mongoose.model ('Job',jobSchema);

module.exports = Job