import axios from "axios"
import { useEffect, useState } from "react"

function DisplayUser(){
    const[users,setUsers] = useState([])
    useEffect(()=>{
        const fetchUsers = async()=>{
            try{
                const userFetched = await axios.get("http://localhost:8080/api/user")
                console.log(userFetched.data)
                setUsers(userFetched.data)
            }
            catch(error){
                console.log("Error in fectching user details",error.message)
            }
        }
        fetchUsers()
  },[])

    return(
        <div>
            
            {
                users.map((user,id)=>(
                    <div key={id}>
                        <p>Name: {user.username}</p>
                        <p>Age: {user.age}</p>
                        <p>Skills: {user.skills.join(" , ")}</p>
                        <p>GitHub: {user.socialMedia.github}</p>
                        <p>LinkedIn: {user.socialMedia.linkedin}</p>
                        <img src={user.profilePhoto} alt="Profile Photo"></img>
                        </div>
                ))
            }
        </div>
    )
}

export default DisplayUser