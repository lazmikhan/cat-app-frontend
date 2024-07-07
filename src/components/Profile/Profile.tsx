import { Box, Button, Container, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import { checkUser, updateUser } from '../../services/apiCall';
import { notifications } from '@mantine/notifications';
interface User{
  email:string,
  name:string,
  address:string,
  mobileNo:string,
  _id:string
}
export default function Profile() {
  const [user, setUser]= useState<User>({
    email:'',
    name:'',
    address:'',
    mobileNo:'',
    _id:''

  });

  const form = useForm({
    initialValues: {
      email: '',
 
      address:'',
      mobileNo:'',
      name:'',
    },
    validate: {
      email: (value) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Invalid email'),
      name: (value) => (/.{3,}/.test(value) ? null:'name must be atleast 3 letters' ),
      address: (value) => ( /.{20,}/.test(value) ? null: 'address must be atleast 20 letters' ),
      mobileNo: (value) => ( /.{2,}/.test(value) ? null: 'Invalid mobile number' ),
    },

   
  });
 const updateProfile =async()=>{
try{
  const result = await updateUser(form.values, user._id);
  console.log(result);
  if(result.data._id){
    notifications.show({
      title: 'Successfully Updated',
      message: '',
      autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
      color: 'yellow', // Set the notification color (optional)
    });
  }
}catch(error){
  notifications.show({
    title: 'Error in updating',
    message: '',
    autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
    color: 'red', // Set the notification color (optional)
  });
}

 }
  useEffect(()=>{
    const checkUserInfo =async()=>{
       const result = await checkUser();
       setUser(result)
       console.log(result);
       form.setValues(
        {
          email:result?.email,
          address:result?.address,
          mobileNo:result?.mobileNo,
          name:result?.name,
        }   )
    return result;
    }
checkUserInfo();


   
         },[])
    
      
      const submitForm =async()=>{
     
       console.log(user.email)
      }
 
  return (
    <div   className='Madimi' style={{maxHeight: "100vh"}}>
        <div

style={{margin:'0 auto'}}
    >

  <Container style={{width:'50%'}}>
 
  <Box maw={340} mx="auto">
  <h1 >Your Profile</h1>
      <form onSubmit={form.onSubmit((values) => {
     submitForm()
      })}>
        <TextInput
         
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
         
        />

<TextInput
value={'sd'}
        label="Name"
        placeholder="Your Name"
        {...form.getInputProps('name')}
      />
           <TextInput
    
        label="Address"
        placeholder="Your Address"
        {...form.getInputProps('address')}
      />
      <TextInput
     
        label="Mobile No"
        placeholder="Your Mobile No"
        {...form.getInputProps('mobileNo')}
      />
    
        

        <Group justify="flex-end" mt="md">
        <Button onClick={updateProfile} type='submit' style={{width:'100%'}} variant="filled" color="rgba(66, 66, 66, 1)">Update</Button>
      
    
        </Group>
      </form>
 
    </Box>
  </Container>

    </div>

    </div>
  )
}
