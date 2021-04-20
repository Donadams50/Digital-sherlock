// import packages into the app. Express, body-parser, 
//const sql=require("./app/Database/db")
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require("cors");
const uuid = require('uuid')
app.use(cors()); 
const path = require('path')
const fileUpload=require('express-fileupload')
app.use(fileUpload())
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
const axios = require('axios')
const sendemail = require('./app/Helpers/emailhelper.js');
const dotenv=require('dotenv');

dotenv.config();

const jwtTokenUtils = require('./jwtTokenUtils')
const { verifyToken } = jwtTokenUtils




app.post('/transactionmail',verifyToken, async(req, res) =>{
    console.log(req.body)
    const {   firstName, lastName  , phoneNumber } = req.body;
    let emailList = [
        {
            "email" : "sumbomatic@gmail.com",
            "firstName" : "Adam",
            "lastName" : "Alaka"
        },
        {
            "email" : "umer@coderconsulting.de",
            "firstName" : "Umer",
            "lastName" : "Umer"
        },
        {
            "email" : "umer1807F@aptechsite.net",
            "firstName" : "Umer1807",
            "lastName" : "Umer"
        }
    ]
     try{
             
        for( var i = 0; i < emailList.length; i++){
            const emailFrom ="no-reply@interviewshare.de";
            const subject = "New registration from ";
          const emailTo = emailList[i].email
         const hostUrl = "digitalsherlock.coderconsulting.io/query-page/"
         const hostUrl2 = "https://digitalsherlock.coderconsulting.io/query-page/"
         const link = `${hostUrl}`;
         const link2 = `${hostUrl2}`;
         const firstNameDataBroker  = emailList[i].firstName;
         const message = "Welcome to digital sharlock. "+firstName+" "+lastName+" just registered you can contact them on "+phoneNumber+""
     

            processEmail(emailFrom, emailTo, subject, link, link2, message,firstNameDataBroker)
          
        
          }

         
           
            res.status(200).send({message:"Success "})
           
         
       
        
 
     }catch(err){
         console.log(err)
        res.status(500).send({message:"Error while sending email"}) 

     }


})


app.get('/',  (req,res)=>{
    res.status(200).send({message:"Welcome to Digita sherlockk"})
         
     })

async function processEmail(emailFrom, emailTo, subject, link, link2, message, firstName){
    try{

       const sendmail =  await sendemail.emailUtility(emailFrom, emailTo, subject, link, link2, message, firstName);
       console.log(sendmail)
        return sendmail
    }catch(err){
        console.log(err)
        return err
    }

}

const port = process.env.PORT || 7000     

app.listen(port, ()=> console.log(`listening on port ${port}...`)); 