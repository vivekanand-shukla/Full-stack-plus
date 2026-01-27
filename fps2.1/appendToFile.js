const fs = require("fs")
try {
    fs.appendFileSync("log.txt" ,`  \n\n[TAG: INFO] new log data appneded here at 2:00P [PRIRITY: INFO]`)
    console.log("data appended successfully ")
} catch (error) {
    console.error("Error",error)
}