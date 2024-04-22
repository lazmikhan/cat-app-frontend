import {
    Box,
    Button,
    Container,
    FileInput,
    Group,
    Select,
    TextInput,
    Textarea,
  } from "@mantine/core";
  import { useForm } from "@mantine/form";
  import React, { useEffect, useState } from "react";
  import { checkUser, updateUser } from "../../services/apiCall";
  import { notifications } from "@mantine/notifications";
  import { postAdoption } from "../../services/adoptService";
  import { DateInput } from "@mantine/dates";
  import { postMissing } from "../../services/missingService";
  interface Post {
    email: string;
    name: string;
    address: string;
    mobileNo: string;
    _id: string;
    
  }
  export default function AddMissingPost() {
 
    const [missingFile, setMissingFile]:any = useState([]);
    const [user, setUser] = useState<Post>({
      email: "",
      name: "",
      address: "",
      mobileNo: "",
      _id: "",
     
    });
  
   
    const missingForm = useForm({
      initialValues: {
        name: "",
        description:'',
        contactNumber:'',
        postedBy_name: "",
        postedBy_email: "",
         images:[],
         missingLocation:'',
        mobileNo: "",
        _id: "",
        status: "",
        dateOfDisappearance:''
  
     
       
      
      },
    });
 
    useEffect(() => {
      const checkUserInfo = async () => {
        const result = await checkUser();
        setUser(result);
  
     
        missingForm.setValues({
          postedBy_name: result?.name,
          postedBy_email: result?.email,
          contactNumber:result?.mobileNo,
          _id: result?._id,
        });
        return result;
      };
      checkUserInfo();
    }, []);
  const onReset=()=>{
    console.log('on')

    missingForm.setValues({
      postedBy_name: user?.name,
      postedBy_email: user?.email,
      contactNumber:user?.mobileNo,
      _id: user?._id,
    });
  }

    const submitMissingForm = async () => {
      console.log(missingForm.values)
      
          const missingFormData :any= {
            name: missingForm.values.name,
            description: missingForm.values.description,
            status: "not-found",
            images:[],
            missingForm: missingForm.values.missingLocation,
            contactNumber: missingForm.values.contactNumber,
            dateOfDisappearance: missingForm.values.dateOfDisappearance,
            postedBy: {
              name: missingForm.values.postedBy_name,
              email: missingForm.values.postedBy_email,
              id: user._id,
            
            },
          };
          const sendingForm:any = new FormData();
         
          for(let index=0; index<missingFile.length; index++)
          {
       const element = missingFile[index];
       
       sendingForm.append("images", element)
          }
         
      sendingForm.append("name", JSON.stringify(missingFormData))
      console.log(sendingForm.name)
          try {
            const result = await postMissing(sendingForm);
            console.log(result)
            if (result?.data._id) {
              notifications.show({
                title: "Successfully added post",
                message: "",
                autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
                color: "yellow", // Set the notification color (optional)
              });
            }
          } catch (error) {
            notifications.show({
              title: "Error posting",
              message: "",
              autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
              color: "red", // Set the notification color (optional)
            });
          }
        };
    return (
      <div className="Madimi" style={{ maxHeight: "100vh" }}>
        <div style={{ margin: "0 auto" }}>
          <Container style={{ width: "50%" }}>
            <Box maw={540} mx="auto">
             
                <span>
                <h1>Add a Missing Post</h1>
                <form
                  onReset={(e)=>{
                    missingForm.onReset(e);
                    onReset()
                  }}
                  onSubmit={missingForm.onSubmit((values) => {
                    submitMissingForm();
                  })}
                >
                  <TextInput
                    label="Cat Name"
                    placeholder="Enter Cat name"
                    {...missingForm.getInputProps("name")}
                  />
                  <Textarea
                    label="Description"
                    placeholder="Cat Description"
                    {...missingForm.getInputProps("description")}
                  />
                
                  <label>Upload Cat Image</label>
                  <input multiple  onChange={(e:any)=>setMissingFile(e.target.files)} type="file" />
                  <TextInput
                    label="Missing Location"
                    placeholder="Enter Location"
                    {...missingForm.getInputProps("missingLocation")}
                  />
                  <TextInput
                    label="Contact Number"
                    placeholder="Enter Contact Number"
                    {...missingForm.getInputProps("contactNumber")}
                  />
                 
                 <DateInput
        valueFormat="DD/MM/YYYY"
        label="Date input"
        placeholder="Date input" {...missingForm.getInputProps("dateOfDisappearance")}
      />
                  <TextInput
                    label="Posted By"
                    placeholder="Enter your Name"
                    {...missingForm.getInputProps("postedBy_name")}
                  />
                  <TextInput
                    label="Email"
                    placeholder="Enter your Email"
                    {...missingForm.getInputProps("postedBy_email")}
                  />
                  <Group justify="flex-end" mt="md">
                    <Button
                      type="submit"
                      style={{ width: "100%" }}
                      variant="filled"
                      color="rgba(66, 66, 66, 1)"
                    >
                      Create Post
                    </Button>
                    <Button
                
                      type="reset"
                      style={{ width: "100%" }}
                      variant="filled"
                      color="rgba(66, 66, 66, 1)"
                    >
                      Reset
                    </Button>
                  </Group>
                </form>
              </span>
             
            </Box>
          </Container>
        </div>
      </div>
    );
  }
  