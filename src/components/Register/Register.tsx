
import React from 'react'
import './Register.css'
import '@mantine/notifications/styles.css';
import CatApp from './images/CatAppLogo.png'
import CatApplOGO from '../../images/CatsAidLogo.png'
import { TextInput, Checkbox, Button, Group, Box,Container, Flex, PasswordInput, Notification } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { postUser } from '../../services/apiCall';
import { notifications, showNotification } from '@mantine/notifications';
export default function Register() {
  const Navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: '',
      password:''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
const submitRegistration =async()=>{

 console.log(form.values)
 const result = await   postUser(form.values);


 if(result.data?._id)
 {
  Navigate('/');
 }
 else{

  notifications.show({
    title: 'Registration Failed',
    message: result.message.message,
    autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
    color: 'red', // Set the notification color (optional)
  });
 
 }
 console.log(result)
}
  return (
    <div   className='Madimi' style={{maxHeight: "100vh"}}>
        <div

style={{display:'flex' }}
    >
  <Container style={{width:'50%'}} fluid>
<div>
    <img style={{ height:'25vh'}}  src={CatApplOGO} alt="" />
</div>
<div>
<img src={CatApp} style={{ height:'65vh'}} alt="" />
</div>
  </Container>
  <Container style={{width:'50%'}}>
 
  <Box maw={340} mx="auto">
  <h1 >Please Sign Up to Continue</h1>
      <form onSubmit={form.onSubmit((values) => {
     submitRegistration()
      })}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

<TextInput
        withAsterisk
        label="Name"
        placeholder="Your Name"
        {...form.getInputProps('name')}
      />
           <TextInput
        withAsterisk
        label="Address"
        placeholder="Your Address"
        {...form.getInputProps('address')}
      />
      <TextInput
        withAsterisk
        label="Mobile No"
        placeholder="Your Mobile No"
        {...form.getInputProps('mobileNo')}
      />
          <PasswordInput
          withAsterisk
      label="Password"
      description="Your Password"
      placeholder="Your Password"
      {...form.getInputProps('password')}
    />
        

        <Group justify="flex-end" mt="md">
        <Button  type='submit' style={{width:'100%'}} variant="filled" color="rgba(66, 66, 66, 1)">Sign Up</Button>
      
    
        </Group>
      </form>
      <p>Already Have an Account?<Link to={'/login'}>Login</Link></p>
    </Box>
  </Container>

    </div>

    </div>
  )
}
