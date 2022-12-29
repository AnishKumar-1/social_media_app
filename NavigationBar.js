import React  from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import cartoon from './cartoon.png';

function NavigationBar({senddata,setsenddata}) {

  const nav=useNavigate();
const logoutfun=()=>{
  setsenddata('');
  localStorage.clear("myuser");

  setTimeout(()=>{
    nav('/login');
  },500)
}
  return (
    <div className='All-Links'>
         {senddata?<div className='img_email'><img src={cartoon} height="20" alt='cartoon image' />  <p style={{fontWeight:"bold",color:"black",fontSize:"14px"}}>{senddata.email}</p></div>:""}
      <NavLink to="/">Home</NavLink>
     {senddata?<button onClick={logoutfun} className="logoutbutton">Logout</button>:<NavLink to="/login">Login</NavLink>}
      <NavLink to="/profile">Profile</NavLink>
    </div>
  )
}

export default NavigationBar
