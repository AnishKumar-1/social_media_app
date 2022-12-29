import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cartoon from './cartoon.png';
import {  MdModeEditOutline } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import axios from 'axios';
function Home({ senddata }) {


  const [postdata, setpostdata] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/get_user_data').then((result) => {
      setpostdata(result.data);
    })
  }, [postdata])

 const deldata=(id)=>{

  axios.post(`http://localhost:5000/delete_data_by_id/${id}`).then(rec=>{    
})

 }

  return (
    <>
      {/* map function start from here get value one by one.. */}
      <span className='c_button'>{senddata ? <button ><Link to="/createpost">Create Post</Link></button> : ""}</span>
      <br />
      {postdata.map((res) => {
        return (<>

          <div className='post-container' key={res._id}>

            {
              senddata ? (
                <div className='post-data-container'>

                  <div className='img-container'>

                    <img src={cartoon} height="100" alt='cartoon image' />

                    <p style={{ color: "blue", fontWeight: "bold"}}>{res.username}</p>

                  
                  
                  


                  <div className='edit_delete_post'>
                      <Link to={`/update/${res._id}`}><MdModeEditOutline/></Link>

                     <MdDelete onClick={()=>deldata(res._id)} style={{cursor:"pointer"}}/>

                    </div>


                  </div>


                  <div className='title_location_des_container'>
                    <div className='post_title_location'>
                      <h4><i>Post title : </i>{res.title}</h4>
                      <h5><i>Location : </i>{res.location}</h5>
                    </div>
                    <div className='post_dis'>
                      <i>Description : </i><br />
                      <p>{res.userdes}.</p>

                    </div>
                  </div>
                </div>
              ) : ""
            }
          </div>
        </>
        )
      })}


      {/* map function end from here get value one by one.. */}
    </>
  )
}

export default Home

