import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';


import axios from 'axios';
function Signup() {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [checkdata, setchekdata] = useState(false);
  const [checkusername, setcheckusername] = useState(false);
  const [checkemail, setcheckemail] = useState(false);
  const [checkpassword, setcheckpassword] = useState(false);
  const [getregisterdata, setregisterdata] = useState('');
  const [show, setshow] = useState(false);

  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let passwordvarify = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

  const signuphandle = (e) => {
    e.preventDefault();

    if (!username) {
      setcheckusername(true);
    }
    else if (!email.match(validRegex)) {
      setcheckemail(true);
    }
    else if (!password.match(passwordvarify)) {
      setcheckpassword(true);
    }
    else {
      setchekdata(true);
      setcheckusername(false);
      setcheckemail(false);
      setcheckpassword(false);
      setusername('');
      setemail('');
      setpassword('');
      axios.post('http://localhost:5000/registration', { username, email, password }).then(res => {
        setregisterdata(res.data.message);
      }).catch(err => {
      })
    }
  }

  return (
    <div>
      <>
        <div className='login-container'>
          <h1>Signup page</h1>
          <br />
          <br /><br />
          {checkdata ? <span className='signup-message'>{getregisterdata}</span> : ""}

          <form>

            <div className='login-sub-container'>
              <input type="text" style={{border:"1px solid blue"}} placeholder="username" value={username} onChange={(e) => setusername(e.target.value)} /><br />
              {checkusername ? <small style={{ color: "red" }} className="small-text">enter username</small> : ""}
              <input type="text" style={{border:"0.5px solid blue"}} placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} /><br />
              {checkemail ? <small style={{ color: "red" }} className="small-text"> Enter Email</small> : ''}
              <div className='showpassword'>

                <input type={show ? "text" : "password"}  autoComplete="on"  placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} className="signup_password" />
                <div className='svg-container'>
                  {show ? <BiShow className='showpassword-icon' onClick={() => setshow(false)} /> : <BiHide onClick={() => setshow(true)} className="showpassword-icon" />}
                </div>
                <br />
              </div>

              {checkpassword ? <small style={{ color: "red" }} className="small-text">Enter Strong Password</small> : ''}
              <br />
              <br />
              <button onClick={signuphandle}>signup</button>
            </div>






          </form>



          <span className='signup_forget'>
            <Link to='/login' className='signup changelogin'>Login</Link>
          </span>
        </div>

      </>
    </div>
  )

}

export default Signup
