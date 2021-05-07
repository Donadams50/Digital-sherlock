const  jwt =require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();
  


exports.signToken= (id, firstName,   lastName,  email, role)=> {
  const key = process.env.SECRET_KEY;
  const token = jwt.sign({ id: id, firstName:firstName ,  lastName:lastName ,  email:email , role: role }, key, { expiresIn: '1h' });
  return token;
}
  exports.verifyToken= (req, res, next)=> { 
    console.log(req.headers.authorization || req.params.token)
    const key = process.env.appKey;
    const appKey = req.headers.authorization || req.params.token;
    if (!appKey) {
      console.log("no app key")
      res.status(403).json({ status: 403, error: 'No app key provided' }); 
    }else{
        if (appKey === key) {
            next();
          }else{
        res.status(400).json({ status: 400, error: 'Invalid app key provided' });
        console.log("invalid app key")
          }
          
        
    }
    
  }
  

  
 

  
  