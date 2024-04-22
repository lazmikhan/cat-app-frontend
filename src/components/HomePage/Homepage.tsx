import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../services/apiCall';
import Header from '../../commons/Header/Header';
import landingPage from './images/landingPage.png'
import shape from './images/Shape.png'
import circle from './images/circle.png'
import shapeNoodle from './images/ShapeNoodle.png'
import { BackgroundImage, Button, Container, Grid } from '@mantine/core';
import CardComponent from '../../commons/Card/CardComponent';
import Cat1 from '../../components/HomePage/images/cat.jpeg';
import Cat2 from '../../components/HomePage/images/images.jpeg'

interface User {
  _id: string;
  // Add other properties based on your user data structure
}

export default function Homepage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {

    const fetchData = async (): Promise<void> => {
      try {
      
        const result = await fetchAllUsers();

        setUsers(result as User[]);
    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []);

  return (
    <div>
      <Grid style={{justifyContent:'center', position:'relative'}}>
      <BackgroundImage
            src={shape}
           
            style={{
              position: 'absolute',
              top: -100,
              left: -300,
              width: '700px',
             height:'500px',
              zIndex: 1,
              backgroundSize: '200px',   backgroundRepeat: 'no-repeat'
            }}
          />
             <BackgroundImage
            src={circle}
           
            style={{
              position: 'absolute',
              top: -100,
              left: -300,
              width: '700px',
              height:'500px',
       
              zIndex: 1,
              backgroundSize: '150px',   backgroundRepeat: 'no-repeat'
            }}
            
          />
                  <BackgroundImage
            src={shapeNoodle}
           
            style={{
              position: 'absolute',
              top: -200,
              left: 300,
              width: '700px',
              height:'500px',
         
              zIndex: 1,
              backgroundSize: '150px',   backgroundRepeat: 'no-repeat'
            }}
            
          />
                  <BackgroundImage
            src={shapeNoodle}
           
            style={{
              position: 'absolute',
              top: -230,
              left: 200,
              width: '700px',
              height:'500px',
            
              zIndex: 1,
              backgroundSize: '150px',   backgroundRepeat: 'no-repeat'
            }}
            
          />
      <Grid.Col  span={6}><Container 
     
      >
  <div ><br />
    <img src={landingPage} style={{ width: '100%'}} alt=""  />
  </div>
</Container></Grid.Col>
      <Grid.Col span={6}><Container className='Madimi'>
  <div>
    <h1 style={{
      color:'#FFB017',
      fontSize:'45px'
    }}>Find your Feline Companion TOday</h1>
    <h3 style={{
      color:'grey',
      fontSize:'30px'
    }}>Discover the love and joy of Cat Adoption</h3>
   
    <Button onClick={()=>{

    }} variant="filled" color="#FFB017">About Us</Button>
  </div>
</Container></Grid.Col>
    </Grid>

<div style={{
  margin:'20px'
}}>
  
<Grid className='Madimi' >
  <Grid.Col  span={4}>  <CardComponent title=" John" description="I always wanted a cat but did not have the money to buy one so i adopted one from here , thank you CatsAid" backGround="salmon" imgSrc={Cat2}></CardComponent></Grid.Col>
  <Grid.Col  span={4}>  <CardComponent title=" Stephen" description="Billie lost her way and went to the town bridge, a good samaritan found it and sent it back to me seeing my post" backGround="pink" imgSrc={Cat1}></CardComponent></Grid.Col>
  <Grid.Col  span={4}>  <h1 className='Madime' style={{
      color:'#FFB017',
      fontSize:'45px'
    }}>Success Stories</h1>
    
    <h4 style={{
      color:'grey'
    }} className='Madime'>These success stories showcase the positive impact of cat adoption through CatsAid, bringing happiness to both cats and their new owners.</h4>
    </Grid.Col>
  </Grid>
</div>


      {/* <h1>Home Page</h1>
    
      {users.length!=0? users?.map((user) => (
        <p key={user._id}>{user._id}</p>
        // Add other properties as needed
      )): <p>Not found</p>} */}
    </div>
  );
}
