import { Children, useEffect, useState } from 'react';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight } from '@tabler/icons-react';
import { Box, Button, Center, Divider, NavLink } from '@mantine/core';
import logo from '../../images/CatsAidLogo.png'
import { Link } from 'react-router-dom';
import './Head.css'
import { logoutUser } from '../../services/apiCall';
const data = [
  {  label: 'Login', to:'/login'},
  {  label: 'Adopt', to:'/adopt'},
  {  label: 'Missing Post', to:'/missing' },
  {  label: 'Add Post' , to:'/add-post'},
  {  label: 'Shop' , to:'/shop'},
  { label: 'Doctor' , to:'/doctor'},
  { label: 'Profile', to:'/profile'},
  {  label: 'Manage', to:'/manage'},
  {  label: 'Donate', to:'/donate'},
];

function Header({children}: React.PropsWithChildren<{}>) {
  let storedActive ;
  const [active, setActive] = useState(()=>{
     storedActive = localStorage.getItem('active');
    return storedActive ? parseInt(storedActive, 10) : 0;
  });
  useEffect(() => {
    localStorage.setItem('active', active.toString());
  }, [active]);
  const items = data.map((item, index) => (
    <Link className={ `link-hover Madimi  ${index===active?
    'is-active':''
    }`
  }
    
    to={item.to}
    key={item.label}
    style={{textDecoration:'none',
      fontWeight: 'bold', 
color:'inherit',
flex: 1,
textAlign:'center'
     
    }}
    onClick={() => setActive(index)}
  >
{item.label!="Login"? item.label: null }
  </Link>
  ));

  return <div>
      <div  style={{display:'flex', justifyContent:'space-between', padding:'20px'
     
    }}>
      <div style={{
        zIndex:3
      }}>
        <Link to='/' onClick={()=>{
          setActive(0)
        }}>
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
    <Divider my="md" />
    <Box style={{ 
    display: 'flex', flexDirection: 'row', justifyContent:'space-around', 
  }} >{items.splice(1)}</Box>
      <Divider my="md" />
  {children}
  </div>
  ;
}
export default Header;
