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

const dotenv=require('dotenv');
      dotenv.config();


const sendemail = require('./app/Helpers/emailhelper.js');
const jwtTokenUtils = require('./jwtTokenUtils')
const { verifyToken } = jwtTokenUtils




app.post('/transactionmail',verifyToken, async(req, res) =>{
    
    const {   firstName, lastName  , dob, gender, address, city } = req.body;

    if (firstName&& lastName && dob, gender && address && city ){
            if ( firstName==="" ||  lastName==="" || dob===""   || gender==="" || address===  "" || city==="" ){
                res.status(400).send({
                    message:"The fields cannot be empty"
                });
            }else{

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
                        },
                        {

                            "email" : "dantereus1@gmail.com",
                            "firstName" : "Moses",
                            "lastName" : "Chukwunekwu"
                            
                        }
                    ]


                        try{ 
                            
                                emailList.map(email => {

                                        const emailFrom = process.env.emailFrom;
                                        const subject = "New registration Alert ";
                                        const emailTo = email.email
                                        const hostUrl = process.env.hostUrl
                                        const hostUrl2 = process.env.hostUrl2
                                        const link = `${hostUrl}`;
                                        const link2 = `${hostUrl2}`;
                                        const firstNameDataBroker  = email.firstName;
                                        const message = `Welcome to digital sharlock. ${firstName} ${lastName} just registered. More details are listed below`; 
                                
                                        processEmail(emailFrom, emailTo, subject, link, link2, message,firstNameDataBroker, firstName, lastName  , dob, gender, address, city  ) 
                                    }) 
                        
                                        res.status(200).send({message:"Success "})
                        }catch(err){
                            console.log(err)
                            res.status(500).send({message:"Error while sending email"}) 

                        }
            }
     }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
})




const processEmail = async (emailFrom, emailTo, subject, link, link2, message, firstNameDataBroker, firstName, lastName  , dob, gender, address, city ) => {
    try{

       const sendmail =  await sendemail.emailUtility(emailFrom, emailTo, subject, link, link2, message, firstNameDataBroker, firstName, lastName  , dob, gender, address, city);
       console.log(sendmail)
        return sendmail
    }catch(err){
        console.log(err)
        return err
    }

}

const port = process.env.PORT || 7000     

app.listen(port, ()=> console.log(`listening on port ${port}...`)); 