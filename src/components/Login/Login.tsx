
import React, { useEffect, useState } from 'react'
import '../Register/Register.css'
import CatApp from '../Register/images/CatAppLogo.png'
import CatApplOGO from '../../images/CatsAidLogo.png'
import { TextInput, Checkbox, Button, Group, Box,Container, Flex, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import {fetchAllUsers, loginUser} from '../../services/apiCall';
import { notifications } from '@mantine/notifications';
export default function Login() {
  const Navigate = useNavigate();
    const [users, setUsers]= useState([]);

  const form = useForm({
    initialValues: {
      email: '',
      password:'',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
const submitLogin =async()=>{

  console.log(form.values)
  const result = await   loginUser(form.values);
 
 
  if(result?.data?._id)
  {
  if(result?.data?.email=='admin@gmail.com')
  {
    Navigate('/admin');
  }
  else
   Navigate('/');
  }
  else{
 
   notifications.show({
     title: 'Registration Failed',
     message: result?.message?.message,
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
  <h1 >Please Login to Continue</h1>
      <form onSubmit={form.onSubmit((values) => {
     submitLogin()
      })}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
  
          <PasswordInput
          withAsterisk
      label="Password"
      description="Your Password"
      placeholder="Your Password"
      {...form.getInputProps('password')}
    />
        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />
    <Link to={'/'}>Forgot Password?</Link>
        <Group justify="flex-end" mt="md">
        <Button  type='submit' style={{width:'100%'}} variant="filled" color="rgba(66, 66, 66, 1)">Sign Up</Button>
        </Group>
      </form>
      <p>New to CatsAid?<Link to={'/register'}>Register</Link></p>
    </Box>
  </Container>

    </div>

    </div>
  )
}

