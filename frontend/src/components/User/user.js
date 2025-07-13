import React from 'react'
import { Link } from "react-router-dom";


function User(props) {
  const {_id,name,gmail,age,Address}=props.user;
  return (
    <div>



<h1>ID: {_id}</h1>
<h1>Name:{name}</h1>
<h1>Gmail:{gmail}</h1>
<h1>Age:{age}</h1>
<h1>Address:{Address}</h1>
 <Link to={`/UserDetails/${_id}`}>
        <button className="btn btn-primary">Update</button>
      </Link>
<button>Delete</button>
<br></br>


    </div>
  )
}

export default User