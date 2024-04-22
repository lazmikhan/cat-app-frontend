import React from 'react'
import logo from '../../images/CatsAidLogo.png'

import { Link } from 'react-router-dom'
import { logoutUser } from '../../services/apiCall';
import { Button } from '@mantine/core';
export default function Head({ children }: { children: React.ReactNode }) {
  return (
 <div>
       <div  style={{display:'flex', justifyContent:'space-between', padding:'20px'
     
    }}>
      <div style={{
        zIndex:3
      }}>
        <Link to='/'>
        <img width={100} src={logo} alt="" />
        </Link>
    

     
      </div>
      <div style={{ marginLeft: 'auto' }}> 

        <Link  className='Madimi' style={{
         
            textDecoration:'none',
            fontWeight:'bold',
            color:'black'
        }} to="/login">
            <Button style={{color:'black'}}  variant="filled" color="#FFB017" onClick={logoutUser}>Logout</Button>
        </Link>
      </div>
    <div>

    </div>
 
    </div>
    {children}
 </div>
  )
}
