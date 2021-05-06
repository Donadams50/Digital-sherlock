module.exports = app => {
    const brokersresponse = require("./brokers.controller");
    const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
    const { verifyToken } = jwtTokenUtils
   
      
       

        app.post("/broker", verifyToken, brokersresponse.postBroker)


       app.get("/brokers", verifyToken,  brokersresponse.getBrokers)

       app.delete("/broker/:id", verifyToken,  brokersresponse.deleteBroker)

       app.put("/broker/:id", verifyToken,  brokersresponse.updateDataBroker)

       app.get("/broker/:id", verifyToken,  brokersresponse.getDataBrokerById)
}

          
