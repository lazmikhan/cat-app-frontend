import { Carousel } from '@mantine/carousel';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '@mantine/carousel/styles.css';
import { Divider, Tabs, Text } from '@mantine/core';
import { IconDetails, IconMessageCircle, IconPhoto, IconSettings, IconUser } from '@tabler/icons-react';
import { IconUserBolt } from '@tabler/icons-react';
import { getAllMissingPostsById } from '../../services/missingService';
import { convertDate } from '../DateConverter/DateConverter';

export default function MissingDetails() {
    interface MissingPost {
        _id?: string;
        name?: string;
        description?: string;
        createdAt: string;
        contactNumber?: string;
        images?: string[]; // Assuming images is an array of strings (adjust type accordingly)
        location?: string;
        postedBy?: {
            name: string;
            email: string;
        };
        status?: string;
        updatedAt?: string;
   

    }
    const iconStyle = { width: "rem(12)", height: "rem(12)" };
    const [adoptionPost, setAdoptionPost] = useState<MissingPost>({
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
        const result = await getAllMissingPostsById(id);
        setAdoptionPost(result);
        console.log(result)
     }
     getPostById();
    },[])
  return (
    <div className='Madimi'>
<div>
<Carousel withIndicators height={400}>
    
{
    adoptionPost?.images?.map((image)=>(
      <Carousel.Slide style={{
        display:'flex',
        justifyContent:'center'
      }}>
      <img style={{
        textAlign:'center',
          width:'20%',
          height:'100%'
      
      }}    src={image?`http://localhost:5000/${image}`:""} alt="" />

    </Carousel.Slide>
    ))
  }
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
     
       <span className='color-head'>Posted At:</span> {adoptionPost.createdAt.slice(0,10)}
    
  
      </Text>

      <Divider my="md" />

     
      </Tabs.Panel>

      <Tabs.Panel value="settings">
      <Text>
      <Divider my="md" />
      <h2 className='color-head'> Owner Details</h2>
       <span className='color-head'>Owner Name:</span> {adoptionPost.postedBy?.name}
       <Divider my="md" />
       <span className='color-head'>Owner Contact:</span> {adoptionPost.contactNumber}
       <Divider my="md" />
     
       <span className='color-head'>Owner Email:</span> {adoptionPost.postedBy?.email}
       <Divider my="md" />
      </Text>
      </Tabs.Panel>
    </Tabs>
</div>
   
    </div>
  )
}
