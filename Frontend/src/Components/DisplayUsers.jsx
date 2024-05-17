import axios from "axios"
import { useEffect, useState } from "react"

function DisplayUser(){
    const[users,setUsers] = useState([])
    useEffect(()=>{
        const fetchUsers = async()=>{
            try{
                const userFetched = await axios.get("http://localhost:8080/api/user")
                setUsers(userFetched.data)
            }
            catch(error){
                console.log("Error in fectching user details",error.message)
            }
        }
        fetchUsers()
  },[])

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user, id) => (
          <div key={id} className="bg-blue-300 flex items-center p-4">
            <div>
              <img 
                className="w-36 h-36 rounded-full object-cover" 
                src={user.profilePhoto} 
                alt={`${user.username}'s Profile Photo`} 
              />
            </div>
            <div className="ml-4">
              <p>Name: {user.username}</p>
              <p>Age: {user.age}</p>
              <p>Skills: {user.skills.join(", ")}</p>
              <p>GitHub: <a href={user.socialMedia.github}>{user.socialMedia.github}</a></p>
              <p>LinkedIn: <a href={user.socialMedia.linkedin}>{user.socialMedia.linkedin}</a></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
    
}

export default DisplayUser