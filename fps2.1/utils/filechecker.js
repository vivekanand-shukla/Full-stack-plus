require("dotenv").config();
const fs = require("fs")
const path = process.env.FILE_PATH
const logError = require("../errorlogger.js")
function checkAndCreatefile(filePath){
  if(!filePath){
       console.log("file Path is not Defined")

       return
  }
  fs.access(filePath , fs.constants.F_OK,  (error)=>{
    if(error){
        fs.writeFile(filePath , "Sample text" , (writeError)=>{
            if(writeError) {
                //    console.log(writeError)
                logError(`Error creating file : ${writeError} `)

                }
            console.log("file Created")
        })
    }else{

        console.log("file already exist.")
    }

  })
}

checkAndCreatefile(path)