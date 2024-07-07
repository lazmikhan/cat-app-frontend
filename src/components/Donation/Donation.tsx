import { Box, Button, Container, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import { checkUser, updateUser } from '../../services/apiCall';
import { notifications } from '@mantine/notifications';
import { postDonate, postStripePayment } from '../../services/donateSernice';
interface Donate{
  email:string,
  name:string,
  address:string,
  mobileNo:string,
  _id:string,
  transactionId:string,
  accountType:string,
  amount:string,
}
export default function Donation() {
  function generateRandomId(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters[randomIndex];
    }
    return randomId;
}
  const [user, setUser]= useState<Donate>({
    email:'',
    name:'',
    address:'',
    mobileNo:'',
    _id:'',
    transactionId:'',
    accountType:'',
    amount:''

  });

  const form = useForm({
    initialValues: {
        email:'',
        name:'',
        address:'',
        mobileNo:'',
        _id:'',
        transactionId:'',
        accountType:'',
        amount:'',
        cashAmount:''
    },

   
  });
  const form2 = useForm({
    initialValues: {
        email:'',
        name:'',
        address:'',
        mobileNo:'',
        _id:'',
        transactionId:'',
        accountType:'',
        amount:'',
        cashAmount:''
    },

   
  });
  useEffect(()=>{
    const checkUserInfo =async()=>{
       const result = await checkUser();
       setUser(result)
   
       form.setValues(
        {
          email:result?.email,
          name:result?.name,
          _id:result?._id
        }   )

     
    return result;
    }
checkUserInfo();


   
         },[])
    
      
      const submitForm =async()=>{
        form.setValues(
          {
            email:user?.email,
            name:user?.name,
            _id:user?._id
          }   )

     const formData = {
      amount: form.values.amount,
      accountType:form.values.accountType,
      transactionId:generateRandomId(8),
      donorDetails:{
          name:user.name,
          email:user.email,
          id:user._id,
          status:'pending'
          
      }

     }
     try{
      const result = await postStripePayment(formData);
    console.log(result);
      if(result.data){
      window.location.href= result.data
    
      }
    }catch(error){
      notifications.show({
        title: 'Error Donating',
        message: '',
        autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
        color: 'red', // Set the notification color (optional)
      });
    }
      //   form.setValues(
      //       {
      //         email:user?.email,
      //         name:user?.name,
      //         _id:user?._id
      //       }   )

      //  const formData = {
      //   amount: form.values.amount,
      //   accountType:form.values.accountType,
      //   transactionId:form.values.transactionId,
      //   donorDetails:{
      //       name:user.name,
      //       email:user.email,
      //       id:user._id,
      //       status:'pending'
            
      //   }

      //  }
      //  try{
      //   const result = await postDonate(formData);
      
      //   if(result.data._id){
      //     notifications.show({
      //       title: 'Successfully added Donation',
      //       message: '',
      //       autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
      //       color: 'yellow', // Set the notification color (optional)
      //     });
      
      //   }
      // }catch(error){
      //   notifications.show({
      //     title: 'Error Donating',
      //     message: '',
      //     autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
      //     color: 'red', // Set the notification color (optional)
      //   });
      // }
      }
      const donateByCash=async()=>{
    console.log("user", user)
             form2.setValues(
            {
              email:user?.email,
              name:user?.name,
              _id:user?._id
            }   )

       const formData = {
        amount: form2.values.amount,
        accountType:form2.values.accountType,
        transactionId:form2.values.transactionId,
        donorDetails:{
            name:user.name,
            email:user.email,
            id:user._id,
            status:'pending'
            
        }

       }
       try{
        const result = await postDonate(formData);
      
        if(result.data._id){
          notifications.show({
            title: 'Successfully added Donation',
            message: '',
            autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
            color: 'yellow', // Set the notification color (optional)
          });
      
        }
      }catch(error){
        notifications.show({
          title: 'Error Donating',
          message: '',
          autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
          color: 'red', // Set the notification color (optional)
        });
      }
      }
 
  return (
    <div   className='Madimi' style={{maxHeight: "100vh"}}>
        <div

style={{margin:'0 auto'}}
    >

  <Container >
 
  <Box  mx="auto">
  <h1 >Donate to CatsAid</h1>
      <form onReset={form.onReset} onSubmit={form.onSubmit((values) => {
     submitForm()
      })}>
       

<Select
      label="Amount"
      placeholder="Enter Amount"
      {...form.getInputProps('amount')}
      data={[ '50', '100', '500', '1000']}
    />


    
        

        <Group justify="flex-end" mt="md">
        <Button type='submit' style={{width:'100%'}} variant="filled" color="green">Pay by Card</Button>

    
        </Group>
      </form>
    
    </Box>
  </Container>
<Container>
  <Box>
  <form onReset={form2.onReset} onSubmit={form2.onSubmit((values) => {
     donateByCash()
      })}>
       

<Select
      label="Amount"
      placeholder="Enter Amount"
      {...form2.getInputProps('amount')}
      data={[ '50', '100', '500', '1000']}
    />
         <Select
      label="Account Type"
      placeholder="Account Type"
      {...form2.getInputProps('accountType')}
      data={['Nagad', 'Bkash']}
    />
           <TextInput
    
        label="Transaction Id"
        placeholder="Donation transaction ID"
        {...form2.getInputProps('transactionId')}
      />

    
        

        <Group justify="flex-end" mt="md">
        <Button type='submit' style={{width:'100%'}} variant="filled" color="rgba(66, 66, 66, 1)">Donate</Button>
   
        </Group>
      </form>
  </Box>
</Container>
    </div>

    </div>
  )
}
