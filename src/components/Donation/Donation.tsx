import { Box, Button, Container, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import { checkUser, updateUser } from '../../services/apiCall';
import { notifications } from '@mantine/notifications';
import { postDonate } from '../../services/donateSernice';
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
        amount:''
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
        transactionId:form.values.transactionId,
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

  <Container style={{width:'50%'}}>
 
  <Box maw={340} mx="auto">
  <h1 >Donate to CatsAid</h1>
      <form onReset={form.onReset} onSubmit={form.onSubmit((values) => {
     submitForm()
      })}>
        <TextInput
         
          label="Amount"
          placeholder="Enter Amount"
          {...form.getInputProps('amount')}
         
        />

{/* <TextInput

        label="Account Type"
        placeholder="Choose Account Type"
        {...form.getInputProps('accountType')}
      /> */}
         <Select
      label="Account Type"
      placeholder="Account Type"
      {...form.getInputProps('accountType')}
      data={['Nagad', 'Bkash']}
    />
           <TextInput
    
        label="Transaction Id"
        placeholder="Donation transaction ID"
        {...form.getInputProps('transactionId')}
      />

    
        

        <Group justify="flex-end" mt="md">
        <Button type='submit' style={{width:'100%'}} variant="filled" color="rgba(66, 66, 66, 1)">Donate</Button>
        <Button type='reset' style={{width:'100%'}} variant="filled" color="rgba(66, 66, 66, 1)">Reset</Button>
    
        </Group>
      </form>
 
    </Box>
  </Container>

    </div>

    </div>
  )
}
