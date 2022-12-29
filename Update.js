import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const [title,settitle]=useState('');
    const [location,setlocation]=useState('');
    const [userdes,setdes]=useState('');
    const [getmessage,setgetmessage]=useState('');
    const nav=useNavigate();
    const {id}=useParams();

    const handledata=(e)=>{
        e.preventDefault();
      settitle('');
      setlocation('');
      setdes('');
      if(title && userdes)
      {
        axios.post(`http://localhost:5000/update_data_by_id/${id}`,{title,location,userdes}).then(result=>{
        setgetmessage(result.data.message);
        setTimeout(()=>{
            nav('/');
        },900)
        })
      }
 }
 useEffect(()=>{
axios.post(`http://localhost:5000/get_data_by_id/${id}`).then(result=>{
    settitle(result.data.title);
    setlocation(result.data.location);
    setdes(result.data.userdes);
})
 },[])
  return (
    <div className='post_inputs_constainer'>
             {getmessage?<span style={{color:"green",fontWeight:"bold",paddingTop:"10px",marginLeft:"150px",fontSize:"18px"}}>{getmessage}</span>:""}
            <div className='post_inputs_field'>
                <label htmlFor='title'>Post title</label>
                <input type="text" placeholder="enter title" value={title} name="title" id="title"  onChange={(e)=>{settitle(e.target.value)}}/>
                <br /><br />
                <label htmlFor='location'>location </label>
                <input type="text" placeholder="location" value={location} name="location" id="location" onChange={(e)=>{setlocation(e.target.value)}} /> <br /><br />

                <textarea  onChange={(e)=>{setdes(e.target.value)}}  value={userdes}  id="description" name='description' rows="14" cols="45" placeholder='What do you want to say?' /><br />
              
                <button onClick={handledata}>update</button>
            </div>

        </div>
    )
}

export default Update
