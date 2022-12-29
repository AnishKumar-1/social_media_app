import { Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import NavigationBar from './components/NavigationBar';
import Forgetpassword from './components/Forgetpassword';
import { useEffect, useState } from 'react';
import Createpost from './components/Createpost';
import Update from './components/Update';

function App() {
  const [senddata,setsenddata]=useState('');

  useEffect(()=>{
    setsenddata(JSON.parse(localStorage.getItem("myuser")));
  },[])

  const updateUser=(parameter)=>{
    localStorage.setItem("myuser",JSON.stringify(parameter));
    setsenddata(parameter);
  }


 


  return (
    <div className="App">
      <NavigationBar senddata={senddata} setsenddata={setsenddata}/>
      <Routes>
        <Route path='/' element={<Home senddata={senddata}/>}/>
        <Route path="/createpost" element={<Createpost senddata={senddata}/>}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login updateUser={updateUser}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget' element={<Forgetpassword />} />
        <Route path='/update/:id' element={<Update/>}/>
       
      </Routes>
    </div>
  );
}

export default App;
