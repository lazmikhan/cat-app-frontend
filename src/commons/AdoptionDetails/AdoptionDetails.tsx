import { Carousel } from '@mantine/carousel';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import '@mantine/carousel/styles.css';
import { Button, Divider, Tabs, Text, TextInput, Textarea, Group, Container } from '@mantine/core';
import { IconDetails, IconMessageCircle, IconPhoto, IconSettings, IconUser } from '@tabler/icons-react';
import { getAllAdoptionPostsById } from '../../services/adoptService';
import { IconUserBolt } from '@tabler/icons-react';
import { convertDate } from '../DateConverter/DateConverter';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import emailjs from '@emailjs/browser';
import { DateInput } from '@mantine/dates';
import { checkUser } from '../../services/apiCall';
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
    const [user,setUser]= useState({name:'',email:''});
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
    const form = useForm({
      initialValues: {
      
        reason:'',
        dateOfAdoption:'',
        location:'',
        contactNumber:''
      },
    });
    const {id }= useParams();
    useEffect(()=>{
     const getPostById=async()=>{
        const result = await getAllAdoptionPostsById(id);
        setAdoptionPost(result);
        console.log(result)
     }
     getPostById();
     const getUser = async ()=>{
      const result = await checkUser();
         setUser(result);
     }
     getUser();
    },[])
    const [value, setValue] = useState<Date | null>(null);

        const formJs: any = useRef();

        const sendEmail = (e:any) => {
          e.preventDefault();
      
          emailjs
            .sendForm('service_xhd4uum', 'template_y3gaqyo', formJs.current, {
              publicKey: 'fXAQrCrNnk-e_staU',
            })
            .then(
              () => {
                  notifications.show({
                      title: 'Successfully sent request',
                      message: '',
                      autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
                      color: 'yellow', // Set the notification color (optional)
                    });
              },
              (error) => {
                  notifications.show({
                      title: 'Error sending request',
                      message: error.text,
                      autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
                      color: 'red', // Set the notification color (optional)
                    });
              },
            );
        };
  return (
    <div className='Madimi'>
<div>
<Carousel withIndicators height={400}>
  {
    adoptionPost.images.map((image)=>(
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
<div style={{
display:'flex',
justifyContent:'space-between',

}}>
<div style={{
width:'50%'
}}>
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
     
       <span className='color-head'>Posted At:</span>{convertDate(adoptionPost.createdAt)} 
    
  
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
<div style={{
  width:'50%'
}}>

      <Container >
       <h1>Send Adoption Request</h1>
         <Divider></Divider>
         <form ref={formJs} onSubmit={sendEmail}>
      
            <TextInput
         name="location"
         label="Your location"
         placeholder="Enter location"
        {...form.getInputProps("location")}
        
       />
         <DateInput
         name="dateOfAdoption"
      value={value}
      onChange={setValue}
      label=" Date of Adoption"
      placeholder="Enter Adoption Date"
    />
      <Textarea
         name="reason"
         label="Reason for adoption"
         placeholder="Enter Reason"
        
        
       />

       <input name='poster_email' hidden value={adoptionPost?.postedBy?.email} type="text"  />
       <input name='poster_name' hidden value={adoptionPost?.postedBy?.name} type="text"  />
       <input name='user_name' hidden value={user.name} type="text"  />
       <input name='user_email' hidden value={user.email} type="text"  />

       <br />
       <Button color="yellow" type="submit">Request Adoption by email</Button>

    </form>
        </Container>: <></>
    
</div>

</div>
   
    </div>
  )
}
