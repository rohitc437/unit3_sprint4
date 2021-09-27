
const express = require("express");

const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/naukri")
}

const app = express();
app.use(express.json())

//step1: creating schema for jobs 
const jobSchema = new mongoose.Schema({
    id:{type:Number, required:true},
    job_name:{type:String, required:true},
    skill:{type:String, required:true},
    city:{type:String, required:true},
    rating:{type:Number, required:true}
})

//step2: create model for schema
const Job = mongoose.model("job", jobSchema)

//step1:creating company schema
const companySchema = new mongoose.Schema({
    company_name:{type:String, required:true},
    jobs:{type:String, required:true},
    city:{type:String, required:true},
    sector:{type:String, required:true}
})
//ste2:model for schema
const Company = mongoose.model("company", companySchema)

//api for find all job
app.get("/jobs", async ( req, res) => {
    const jobs = await Job.find()

    return res.status(200).send({jobs})
})

//find job perticular city and skill
app.get("/jobs/Barajalan&RecruitingManager", async ( req, res) => {
    const job1 = await Job.find({city:"Barajalan"})

    const job2 = await Job.find({$skill:"Recruiting Manager"})
    return res.status(200).send({job1,job2})
})

//sorting job by rating
app.get("/jobs/sortJob", async ( req, res) => {
    const jobs = await Job.find().sort({rating:-1})

    return res.status(200).send({jobs})
})


//get company details
app.get("/companies", async ( req, res) => {
    const company = await Company.find()

    return res.status(200).send({company})
})


























app.listen(2345, async function(req, res){
    await connect();
    console.log("Jobs search engine started")
})