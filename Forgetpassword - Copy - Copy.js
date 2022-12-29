import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Forgetpassword() {
  const [email, setemail] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [show1, setshow1] = useState(false);
  const [show2, setshow2] = useState(false);
  const [matchpassword, setmatch] = useState(false);
  const [getmessage, setgetmessage] = useState('');
  const [messagealert, setalert] = useState(false);

  const nav = useNavigate();

  const updatepassword = (e) => {
    e.preventDefault();
    if (!(email && newpassword && confirmpassword)) {
      setalert(true);
    }
    else {
      if (newpassword === confirmpassword) {
        axios.post('http://localhost:5000/updatepassword', { email, confirmpassword }).then((result) => {
          setgetmessage(result.data.message)
          setemail('');
          setnewpassword('');
          setconfirmpassword('');
        })
        setTimeout(() => {
          nav('/login')
        }, 1700)
      }
      else {
        setemail('');
        setnewpassword('');
        setconfirmpassword('');
        setmatch(true);
      }
    }
  }

  setTimeout(() => {
    setalert(false);
  }, 2500)

  return (
    <div>
      <div>
        <>
          <div className='login-container'>
            <h1>Change Password</h1>
            <br /><br />
            {getmessage ? <span className='signup-message'>{getmessage}</span> : ""}
            {messagealert ? <span className='signup-message' style={{ color: "red" }}>Please enter data..</span> : ""}



            <form>


              <div className='login-sub-container'>
                <input type="email" style={{border:"1px solid blue"}} placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} />
                <div className='showpassword'>
                  <input type={show2 ? "text" : "password"} placeholder="enter newpassword" value={newpassword} onChange={(e) => setnewpassword(e.target.value)} className="signup_password" autoComplete="on" />
                  <div className='svg-container'>
                    {show2 ? <BiShow className='showpassword-icon' onClick={() => setshow2(false)} /> : <BiHide onClick={() => setshow2(true)} className="showpassword-icon" />}
                  </div>
                </div>
                <div className='showpassword'>
                  <input type={show1 ? "text" : "password"} placeholder="confirm password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} className="signup_password" autoComplete="on"/>
                  <div className='svg-container'>
                    {show1 ? <BiShow className='showpassword-icon' onClick={() => setshow1(false)} /> : <BiHide onClick={() => setshow1(true)} className="showpassword-icon" />}
                  </div>
                  <br />
                </div>
                {matchpassword ? <small style={{ color: "red" }} className="small-text">Password not matched..please check</small> : ""}
                <br />
                <button onClick={updatepassword}>Save</button>
              </div>




            </form>




          </div>
        </>
      </div>
    </div>
  )
}

export default Forgetpassword
