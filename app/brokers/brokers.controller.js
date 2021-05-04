
const db = require("../mongoose");
const Broker = db.brokers;
const sendemail = require('../Helpers/emailhelper.js');

const mongoose = require("mongoose");

exports.getBrokers = async (req, res) => {
    try{
        
            const findBrokers = await Broker.find().sort({"_id": -1})
             
            res.status(200).send(findBrokers)
      
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting brokers "})
       }
};

exports.postBroker= async(req, res) =>{
    
    const {   brokerFirstName, brokerLastName, brokerEmail } = req.body;
    console.log(req.body)
    

    if (brokerFirstName && brokerLastName && brokerEmail   ){
            if ( brokerFirstName==="" ||  brokerLastName==="" || brokerEmail === ""   ){
                res.status(400).send({
                    message:"The fields cannot be empty"
                });
            }else{

                        try{ 
                            
                           const broker = new Broker({      
                            brokerFirstName: brokerFirstName,
                            brokerLastName: brokerLastName, 
                            brokerEmail : brokerEmail                                             
                              })
                          
                            const isUserExist = await Broker.findOne({brokerEmail: brokerEmail})
                            if(isUserExist){
                                res.status(400).send({message:" Email already exists"})
                           }else{
                            const postBroker = await  broker.save()
                            
                            res.status(200).send({message:"Successfully posted broker"})
                           }
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

exports.deleteBroker = async (req, res) => {
    try{
        const id = req.params.id;
    
      
        const findBroker = await Subcategory.findOne({_id: id});
             if(findBroker ){
                const deleteBroker= await Broker.findByIdAndRemove(id)
                res.status(200).send({message:"Deleted succesfully"})
             }else{
                res.status(400).send({message:"Broker does not exists"})
             }
          
           
       
         
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while deleting broker "})
       }
}