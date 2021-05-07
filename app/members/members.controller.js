
const db = require("../mongoose");
const Members = db.profiles;
const Auths = db.auths;

const passwordUtils =require('../Helpers/passwordUtils');
const jwtTokenUtils = require('../Helpers/jwtTokenUtils.js');
const sendemail = require('../Helpers/emailhelper.js');

const { signToken } = jwtTokenUtils;
const uuid = require('uuid')
const dotenv=require('dotenv');
dotenv.config();


// Create and Save a new User

exports.create = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }
    
   
    const { firstName,lastName,email,password, role } = req.body;
  
    if ( firstName && role  && lastName && email && password  ){
          if ( firstName==="" ||   lastName==="" || password===""  || email==="" ||  role === "" ){
                res.status(400).send({
                    message:"Incorrect entry format"
                });
               }else{   
                     const members = new Members({
                            firstName: firstName,
                            role: role,
                            lastName: lastName,  
                            email: email,
                           
                            });
                            const auths = new Auths({ 
                                email: req.body.email               
                            });
       
                            try{
                            const isUserExist = await Members.findOne({email: email} )
                                     if(isUserExist){
                                          res.status(400).send({message:" Email already exists"})
                                     }else{
                                            auths.password = await passwordUtils.hashPassword(password.toLowerCase());
                                            
                                            const saveauth = await  auths.save()
                                          
                                                if(saveauth._id){
                                                    const savemember = await  members.save()
                                                  //  console.log(savemember)
                                                    if( savemember._id){
                                                                  
                                                   res.status(201).send({message:"Admin created"})
                                            
                                                    }else{
                                                        res.status(400).send({message:"Error while creating profile "})
                                                    }
                                                }
            
                                            }
                 
                
                            }catch(err){
                                    console.log(err)
                                    res.status(500).send({message:"Error while creating profile "})
                                      }
               }
            } 
            else{
                res.status(400).send({
                    message:"Incorrect entry format"
                });
            }
        }


exports.signIn = async(req, res) => {
  if (!req.body){
    res.status(400).send({message:"Content cannot be empty"});
}
console.log(req.body)

const {   email, password  } = req.body;
 
if ( email && password  ){
    if ( email==="" || password===""){
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }else{
         
        
        const members = new Members({
            email: req.body.email,
            password: req.body.password
            
          });

     
        try{
            const User = await Members.findOne({email: email} )
             const Auth = await Auths.findOne({email: email} )
             
           if(User){
           
                    //  const accountDetails = await Accountdetails.find({userId: User._id} )
                        const retrievedPassword = Auth.password
                        
                        const id = User._id;
                        const {  firstName,   lastName,  email, role} = User
                      
                        const isMatch = await passwordUtils.comparePassword(password.toLowerCase(), retrievedPassword);
                        console.log(isMatch )
                        if (isMatch){
                           
                        const tokens = signToken( id, firstName,   lastName , email,  role) 
                    
                        let user = {}
                        
                            user.profile = { id,firstName, lastName,  email, role} 
                           // user.accountdetails = accountDetails
                            user.token = tokens;                
                            res.status(200).send(user)  
                      
                          
                    }else{
                        res.status(400).json({message:"Incorrect Login Details"})
                    }
                
    
           }else{
            res.status(400).send({message:" User does not exist"})
           }
                   
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:"Error while signing in "})
        }
    }
}else{
    res.status(400).send({
        message:"Incorrect entry format"
    });
}
};




 


// Find all members
exports.findAllMembers = async (req, res) => {
    try{
        
        const{ limit}= req.query
        const{ role}= req.query
      
      
        if(limit){
            const findAllMembers = await Members.find({role: role}).sort({"_id": -1}).limit(lim)
        console.log(findAllMembers)
        res.status(200).send(findAllMembers)
         }else{
            const findAllMembers = await Members.find({role: role}).sort({"_id": -1})    
           console.log(findAllMembers)
        res.status(200).send(findAllMembers)
         }
        
         
        //    const findAllMembers = await Members.find().sort({"_id": -1})  
        //    console.log(findAllMembers)
        //     res.status(200).send(findAllMembers)  
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting all users "})
       }
};

// find member by the id 
exports.findMembeById = async (req, res) => {
   try{
       
            let id = req.params.id
        const findMemberById = await Members.findOne({_id: id})
       
        res.status(200).send(findMemberById)
           
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting member "})
       }

};
















// process email one
async function processEmail(emailFrom, emailTo, subject, link, link2, text, fullName){
  try{
      //create org details
      // await delay();
     const sendmail =  await sendemail.emailUtility(emailFrom, emailTo, subject, link, link2, text, fullName);
   //  console.log(sendmail)
      return sendmail
  }catch(err){
      console.log(err)
      return err
  }

}




// generate 6 alphanumeric code
function getCode(){
    var numbers = "0123456789";

    var chars= "abcdefghijklmnopqrstuvwxyz";
  
    var code_length = 6;
    var number_count = 3;
    var letter_count = 3;
  
    var code = '';
  
    for(var i=0; i < code_length; i++) {
       var letterOrNumber = Math.floor(Math.random() * 2);
       if((letterOrNumber == 0 || number_count == 0) && letter_count > 0) {
          letter_count--;
          var rnum = Math.floor(Math.random() * chars.length);
          code += chars[rnum];
       }
       else {
          number_count--;
          var rnum2 = Math.floor(Math.random() * numbers.length);
          code += numbers[rnum2];
       }
    }
return code
}
