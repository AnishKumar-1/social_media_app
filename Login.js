import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';

function Login({ updateUser }) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [checkemaildata, setemaildata] = useState(false);
  const [checkpassword, setcheckpassword] = useState(false);
  const [getmessage, setgetmessage] = useState('');
  const [checkgetmessage, setcheckgetmessage] = useState(false);
  const [show, setshow] = useState(false);
  const nav=useNavigate();
  const logichange = (e) => {
    e.preventDefault();
    if (!email) {
      setemaildata(true);
    }
    else if (!password) {
      setcheckpassword(true);
    }
    else {
      setemaildata(false);
      setcheckpassword(false);

      axios.post('http://localhost:5000/login', { email, password }).then(res => {
        setcheckgetmessage(true);
        setgetmessage(res.data.message);
        if (res.data) {
          updateUser(res.data.user);
          setemail('');
          setpassword('');
          setTimeout(()=>{
            nav('/')
          },800)

        }

      }).catch(err => {

      })
    }
  }


  return (
    <>
      <div className='login-container'>

        <h1>Login Page</h1> <br />
        <br /><br />
        {checkgetmessage ? <span className='signup-message' style={{ fontWeight: "bold" }}>{getmessage}</span> : ""}




        <form>



          <div className='login-sub-container'>


            <input type="email" style={{border:"1px solid blue"}} placeholder="enter email" value={email} onChange={(e) => setemail(e.target.value)} /><br />

            {checkemaildata ? <small style={{ color: "red" }}>Please enter email</small> : ""}


            <div className='showpassword'>

              <input type={show ? "text" : "password"}  autoComplete="on"   placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} className="signup_password" />
              <div className='svg-container'>
                {show ? <BiShow className='showpassword-icon' onClick={() => setshow(false)} /> : <BiHide onClick={() => setshow(true)} className="showpassword-icon" />}
              </div>
              <br />
            </div>

            <br />


            {checkpassword ? <small style={{ color: "red" }}>enter password</small> : ""}<br />

            <button onClick={logichange}>Login</button>
          </div>



        </form>





        <span className='signup_forget'>
          <Link to='/signup' className='signup'>Signup</Link>
          <Link to='/forget' className='signup'>Forget password</Link>
        </span>
      </div>

    </>
  )

}

export default Login
