import { useEffect, useState } from "react"
import axios from "axios"

function GoogleProfile() {

  const [user, setUser] = useState(null)
  if(user){

      console.log(user.picture)
  }
  useEffect(() => {
    axios.get("http://localhost:4000/user/profile/google", {
      withCredentials: true
    })
    .then(res => {
      setUser(res.data.user)
    })
    .catch(err => {
      console.log(err)
      window.location.href = "/"
    })
  }, [])

  if (!user) {
    return <h2 style={{color:"white", textAlign:"center"}}>Loading...</h2>
  }

  return (
    <div style={{textAlign:"center", color:"white", background:"#111", height:"100vh"}}>
      <img
        src={user?.picture}
        alt="profile"
        width="120"
        style={{borderRadius:"50%", marginTop:"50px"}}
      />
      {/* <img
  src={user.picture.replace("=s96-c", "=s200-c")}
  alt="profile"
  width="120"
  style={{borderRadius:"50%", marginTop:"50px"}}
/> */}

      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}

export default GoogleProfile
