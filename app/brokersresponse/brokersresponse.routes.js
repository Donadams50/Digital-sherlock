module.exports = app => {
    const brokersresponse = require("./brokersresponse.controller");
    const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
    const { verifyToken } = jwtTokenUtils
    require('../cloudinary/cloudinary.js')
    const upload = require('../cloudinary/multer.js');
      
       app.get("/response/:userId", verifyToken,    brokersresponse.getResponse)

       app.post("/response", verifyToken, upload.single("files"), brokersresponse.postResponse)


       
     
}

          
