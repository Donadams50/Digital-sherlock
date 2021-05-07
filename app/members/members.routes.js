module.exports = app => {
    const member = require("./members.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken ,  isExchanger, isAdminOrSubadmin, isAdmin} = jwtTokenUtils;
    

     app.post("/admin",  member.create)
     app.post("/authenticate", member.signIn)
    


}
