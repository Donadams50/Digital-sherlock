const db = require("../mongoose");
const Response = db.responses;
const sendemail = require('../Helpers/emailhelper.js');

const mongoose = require("mongoose");
const { response } = require("express");



exports.postResponse= async(req, res) =>{
    
    const {   brokerName, userId, status } = req.body;
    console.log(req.body)
    console.log(req.file.url)

    if (brokerName&& userId   ){
            if ( brokerName==="" ||  userId===""   ){
                res.status(400).send({
                    message:"The fields cannot be empty"
                });
            }else{

                        try{ 
                            
                           const response = new Response({      
                                brokerName: brokerName,
                                userId: userId, 
                                attachment : req.file.url                                              
                              })
                        
                        const postResponse = await  response.save()


                                        const emailFrom = process.env.emailFrom;
                                        const subject = "Response from data broker ";
                                        const emailTo = userId
                                        const hostUrl = process.env.hostUrl
                                        const hostUrl2 = process.env.hostUrl2
                                        const link = `${hostUrl}`;
                                        const link2 = `${hostUrl2}`;
                                     //   const firstNameDataBroker  = email.firstName;
                                        const bodyMessage = `Hi, a response from data broker has been sent. Log in to your dashboard to view.`; 
                                
                                       processEmailResponse(emailFrom, emailTo, subject, link, link2, bodyMessage  ) 
                                    
                        
                                        res.status(200).send({message:"Successfully posted response"})
                        }catch(err){
                            console.log(err)
                            res.status(500).send({message:"Error while posting databroker response"}) 

                        }
            }
     }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
}


exports.getResponse = async (req, res) => {
    try{
            const userId = req.params.userId;
            const findResponse = await Response.find({userId : userId}).sort({"_id": -1})
             
            res.status(200).send(findResponse)
      
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting response for user "})
       }
};

const processEmailResponse = async (emailFrom, emailTo, subject, link, link2, message ) => {
    try{

       const sendmail =  await sendemail.emailUtilityResponse(emailFrom, emailTo, subject, link, link2, message);
       console.log(sendmail)
        return sendmail
    }catch(err){
        console.log(err)
        return err
    }

}