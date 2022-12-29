import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Createpost({senddata}) {
    const username=senddata.username;
    const [title,settitle]=useState('');
    const [location,setlocation]=useState('');
    const [userdes,setdes]=useState('');
    const [getmessage,setgetmessage]=useState('');
    const nav=useNavigate();
    const handledata=(e)=>{
        e.preventDefault();
      settitle('');
      setlocation('');
      setdes('');
      if(title && userdes)
      {
        axios.post('http://localhost:5000/userpost',{title,location,userdes,username}).then((res)=>{
          setgetmessage(res.data.message);
          setTimeout(()=>{
            nav('/');
          },700)
        })
      }
 }
    return (
        <div className='post_inputs_constainer'>
             {getmessage?<span style={{color:"blue",fontWeight:"bold",marginLeft:"150px",fontSize:"18px"}}>{getmessage}</span>:""}
            <div className='post_inputs_field'>
                <label htmlFor='title'>Post title</label>
                <input type="text" placeholder="enter title" value={title} name="title" id="title"  onChange={(e)=>{settitle(e.target.value)}}/>
                <br /><br />
                <label htmlFor='location'>location </label>
                <input type="text" placeholder="location" value={location} name="location" id="location" onChange={(e)=>{setlocation(e.target.value)}} /> <br /><br />

                <textarea  onChange={(e)=>{setdes(e.target.value)}}  value={userdes}  id="description" name='description' rows="14" cols="45" placeholder='What do you want to say?' /><br />
              
                <button onClick={handledata}>Post</button>
            </div>

        </div>
    )
}

export default Createpost
