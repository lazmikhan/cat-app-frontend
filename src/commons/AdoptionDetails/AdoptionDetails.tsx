import { Carousel } from '@mantine/carousel';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '@mantine/carousel/styles.css';
import { Divider, Tabs, Text } from '@mantine/core';
import { IconDetails, IconMessageCircle, IconPhoto, IconSettings, IconUser } from '@tabler/icons-react';
import { getAllAdoptionPostsById } from '../../services/adoptService';
import { IconUserBolt } from '@tabler/icons-react';
import { convertDate } from '../DateConverter/DateConverter';

export default function AdoptionDetails() {
    interface AdoptionPost {
        _id: string;
        name: string;
        description: string;
        createdAt: string;
        contactNumber: string;
        images: string[]; // Assuming images is an array of strings (adjust type accordingly)
        location: string;
        postedBy: {
            name: string;
            email: string;
        };
        status: string;
        updatedAt: string;
   

    }
    const iconStyle = { width: "rem(12)", height: "rem(12)" };
    const [adoptionPost, setAdoptionPost] = useState<AdoptionPost>({
        _id: '',
        name: '',
        description: '',
        createdAt: '',
        contactNumber:'',
        images:[],
        location:'',
        postedBy:{
            name:'',
            email:''
        },
        status:'',
        updatedAt:'',

    });

    const {id }= useParams();
    useEffect(()=>{
     const getPostById=async()=>{
        const result = await getAllAdoptionPostsById(id);
        setAdoptionPost(result);
        console.log(result)
     }
     getPostById();
    },[])
  return (
    <div className='Madimi'>
<div>
<Carousel withIndicators height={400}>
      <Carousel.Slide>
        <img style={{
            width:'100%'
        
        }} src="https://img.freepik.com/free-photo/pattern-with-watercolor-flowers-vintage_1268-29266.jpg?size=626&ext=jpg" alt="" />

      </Carousel.Slide>
      <Carousel.Slide> <img style={{
            width:'100%'
        
        }} src="https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?size=626&ext=jpg" alt=""  /></Carousel.Slide>
      <Carousel.Slide>   <img style={{
            width:'100%'
        
        }} src="https://img.freepik.com/free-photo/pattern-with-watercolor-flowers-vintage_1268-29266.jpg?size=626&ext=jpg" alt="" /></Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
</div>
<div>
<Tabs defaultValue="details">
      <Tabs.List>
    
        <Tabs.Tab value="details" leftSection={<IconDetails style={iconStyle} />}>
        Cat Details
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<IconUser style={iconStyle} />}>
          Owner Details
        </Tabs.Tab>
      </Tabs.List>

  

      <Tabs.Panel value="details">
      <Text>
      <h2 className='color-head'> Cat Name</h2>
       {adoptionPost.name}
      </Text>

      <Divider my="md" />

      <Text>
      <h2 className='color-head'>Cat Description</h2>
       {adoptionPost.description}
       <Divider my="md" />
       <span className='color-head'>Location:</span> {adoptionPost.location}
       <Divider my="md" />
     
       <span className='color-head'>Posted At:</span> {convertDate(adoptionPost.createdAt)}
    
  
      </Text>

      <Divider my="md" />

     
      </Tabs.Panel>

      <Tabs.Panel value="settings">
      <Text>
      <Divider my="md" />
      <h2 className='color-head'> Owner Details</h2>
       <span className='color-head'>Owner Name:</span> {adoptionPost.postedBy.name}
       <Divider my="md" />
       <span className='color-head'>Owner Contact:</span> {adoptionPost.contactNumber}
       <Divider my="md" />
     
       <span className='color-head'>Owner Email:</span> {adoptionPost.postedBy.email}
       <Divider my="md" />
      </Text>
      </Tabs.Panel>
    </Tabs>
</div>
   
    </div>
  )
}
