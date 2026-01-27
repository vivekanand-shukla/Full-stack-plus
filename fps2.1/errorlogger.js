const fs = require("fs")
const path = require("path")

function logError(massege ){
   const errorFilePth = path.resolve('../logs/error.log')
   fs.appendFile(errorFilePth , `${new Date().toISOString()} :  ${massege}\n` ,(err)=>{
    if(err){
        console.error("failed to log error " ,err )
    }
   })
}
module.exports = logError