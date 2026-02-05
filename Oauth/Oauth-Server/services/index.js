// hepler function 
function setSecureCookie(res ,token){
    //    console.log("Setting cookie with token:", token)  // Add this line
   res.cookie("access_token" , token , {
    // httpOnly :true,
    maxAge:  60*60 * 1000,
  
      
   })

//    return res
}
module.exports ={
    setSecureCookie
}