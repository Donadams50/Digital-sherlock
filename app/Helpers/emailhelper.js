const nodemailer = require("nodemailer"); 
const hbs = require('nodemailer-express-handlebars')
const dotenv=require('dotenv');
dotenv.config();


exports.emailUtility= async (emailFrom, emailTo, subject, link, link2, message, firstNameDataBroker, firstName, lastName  , dob, gender, address, city) =>{
   
        let resp= await wrapedSendMail();
         return resp;

    async function wrapedSendMail(){
        return new Promise((resolve,reject)=>{
            let transport = nodemailer.createTransport({
                host: "smtp.sendgrid.net",
                port: 587,
                secure: false, 
                auth: {
                        user: process.env.user,
                        pass:  process.env.pass  
                     }  
                   });
           const handlebarsOptions= {
                            viewEngine:{
                                extName:'index2.handlebars',
                                partialsDir: './', 
                                layoutsDir: './',
                                defaultLayout:'./app/Helpers/index2'
                            },
                            viewPath:'./app/Helpers',
                            extName:'.handlebars',
   
                     };
        transport.use('compile', hbs(handlebarsOptions));
        const mailOptions = {
            // should be replaced with real  recipient's account 
            from: emailFrom,
            to: emailTo,         
            subject: subject, 
            text: message,
            template: 'index2',
            context: {
                name: firstNameDataBroker,
                link: link,
                link2: link2,
                message: message, 
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                gender: gender,
                address: address,
                city: city,
                
               
            }
        }; 


    
     transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('=======================================fail======================')
            console.log("error is "+error);
           reject(false); // or use rejcet(false) but then you will have to handle errors
           //return error
        } 
       else {
          
       console.log('=======================================success======================')
         console.log('Email sent: ' + info.messageId);    
           resolve(true);
        }
       });
     
       })
    }
       
  
} 
