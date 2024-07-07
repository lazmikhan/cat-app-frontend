import { Box, Button, Container, Divider, Group, Select, Spoiler, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';

import { getAllHospitals, getAllHospitalsbyId } from "../../services/hospitalService";
import { Email } from "../../commons/Email/Email";
import { checkUser } from "../../services/apiCall";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
interface Hospital {
  name: string;
  _id: string;
  location: string;
}
export default function Doctor() {
  const [hospital, setHospital]:any = useState({});
  const [hospitals, setHospitals]: any[] = useState([]);
  const [user, setUser]: any[] = useState({});
  const [selected, setSelected]: any[] = useState(false);
  const [value, setValue] = useState<Date | null>(null);
  const form= useForm({
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  useEffect(() => {
    const hospitalArray: any[] = [];
    const getCurrentUser =async()=>{
       try{
        const result = await checkUser(); 
        setUser(result) 
        console.log(result)
       }catch(error)
       {
        console.log(error)
       }
    }
    const getAllHospitalsFetch = async () => {
     try{
        const result = await getAllHospitals();
        // console.log(result);
         result.forEach(
           (hospital: { name: string; _id: string; location: string }) => {
             hospitalArray.push({
               value: hospital._id,
               label: `${hospital.name}- ${hospital.location}`,
             });
           }
         );
       
         setHospitals(hospitalArray);
         //console.log(hospitalArray);
         form.setValues({});
         return result;
     }catch(error){
        console.log(error)
     }
    };
    getCurrentUser();
    getAllHospitalsFetch();
  }, []);
  const hospitalSelected =async (value:any) => 
  {
  if(value){
    const result = await getAllHospitalsbyId(value);
    console.log(result);
    setHospital(result);
    if(result._id)
    {
      setSelected(true)
    }
  }
  };
  const formJs: any = useRef();

  const patientNameRef : any =useRef();
  const patientAppointmentDateRef : any =useRef();
  const appointmentReasonRef : any =useRef();
  const sendEmail = (e:any) => {
    e.preventDefault();
if(patientNameRef.current.value==''||patientAppointmentDateRef.current.value==''||patientNameRef.current.value=='')
  {
    notifications.show({
      title: "Fill all the fields",
      message: "",
      autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
      color: "yellow", // Set the notification color (optional)
    });
    return;
  }
   
    emailjs
      .sendForm('service_xhd4uum', 'template_rrqsdry', formJs.current, {
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
    <div className="Madimi">
      <Box maw={340} mx="auto">
        <form onSubmit={form.onSubmit((values) => 
          
          
          console.log(values))}>
          <Select
       
            onChange={hospitalSelected}
            label="Choose your hospital"
            placeholder="Pick hospital"
            data={hospitals}
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
            mt="md"
          />

          <Group justify="flex-end" mt="md">
         
          </Group>
        </form>
     {
          selected?  <Container >
          <span className="color-head">Hospital Contact:</span> {hospital?.contactNumber}
          <Divider></Divider>
       <span className="color-head">   Hospital Address: </span>{hospital?.address}
          <Divider></Divider>
         <span className="color-head"> Hospital Email:</span> {hospital?.email}
         <Divider></Divider>
         <form ref={formJs} onSubmit={sendEmail}>
        <TextInput
         name="patient_name"
         label="Patient Name"
         placeholder="Enter Patient Name"
        ref={patientNameRef}
        
       />
        <TextInput
         name="appointment_by"
         label="Appointment By"
         placeholder="Enter Appointment By"
        value={user?.name}
       
        
       />
            <TextInput
         name="appointment_email"
         label="Your Email"
         placeholder="Enter Email"
        value={user?.email}
        
       />
            <TextInput
         name="appointment_contact"
         label="Your Contact"
         placeholder="Enter Contact"
        value={user?.mobileNo}
        
       />
         <DateInput
         name="appointment_date"
      value={value}
      onChange={setValue}
      label="Appointment Date"
      placeholder="Enter Appointment Date"
      ref={patientAppointmentDateRef}
    />
      <Textarea
         name="message"
         label="Reason for appointment"
         placeholder="Enter Reason"
         ref={appointmentReasonRef}
        
       />

       <input name='hospital_email' hidden value={hospital?.email} type="text"  />
       <input name='hospital_name' hidden value={hospital?.name} type="text"  />

       <br />
       <Button color="yellow" type="submit">Request Appointment</Button>

    </form>
        </Container>: <></>
     }
      
      </Box>

   
      <Text
        style={{
          textAlign: "center",
        }}
      >
        <small>
          <span
            style={{
              color: "red",
            }}
          >
            *
          </span>{" "}
          Hospital will shortly email or call you if appointment is available on the
          following date or suggest you a different date
        </small>{" "}
      </Text>
    </div>
  );
}
