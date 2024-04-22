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
import React, { useEffect, useRef, useState } from "react";
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
export default function AddPost() {
  const [postType, setPostType] = useState("");
  const [file, setFile]:any = useState([]);
  const [missingFile, setMissingFile]:any = useState([]);
  let adoptFileInputRef:any = useRef(null);
  let missingFileInputRef:any = useRef(null);
  const [user, setUser] = useState<Post>({
    email: "",
    name: "",
    address: "",
    mobileNo: "",
    _id: "",
   
  });

  const form = useForm({
    initialValues: {
      location:'',
      description:'',
      contactNumber:'',
      postedBy_name: "",
      postedBy_email: "",
      email: "",
      name: "",
       images:null,
      mobileNo: "",
      _id: "",
   
     
    
    },
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
  const clearFileInput = () => {
 console.log(file)

    if (adoptFileInputRef.current) {
      adoptFileInputRef.current.value = "";
      adoptFileInputRef.current.type = "text";
      adoptFileInputRef.current.type = "file";
  }
  if (missingFileInputRef.current) {
    missingFileInputRef.current.value = "";
    missingFileInputRef.current.type = "text";
    missingFileInputRef.current.type = "file";
}
  };
  const selectPostType = (value: any) => {
    
    console.log(value);
    setPostType(value);
    form.reset();
    missingForm.reset();
    setFile([]);
    setMissingFile([])
    onReset();
  };
  useEffect(() => {
    const checkUserInfo = async () => {
      const result = await checkUser();
      setUser(result);

      form.setValues({
        postedBy_name: result?.name,
        postedBy_email: result?.email,
        contactNumber:result?.mobileNo,
        _id: result?._id,
      });
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
  clearFileInput()
  form.setValues({
    postedBy_name: user?.name,
    postedBy_email: user?.email,
    contactNumber:user?.mobileNo,
    _id: user?._id,
  });
  missingForm.setValues({
    postedBy_name: user?.name,
    postedBy_email: user?.email,
    contactNumber:user?.mobileNo,
    _id: user?._id,
  });
  console.log(file)
}
  const submitForm = async () => {
console.log(form.values)

    const formData :any= {
      name: form.values.name,
      description: form.values.description,
      status: "available",
      images:[],
      location: form.values.location,
      contactNumber: form.values.contactNumber,
      postedBy: {
        name: form.values.postedBy_name,
        email: form.values.postedBy_email,
        id: user._id,
      
      },
    };
    const sendingForm:any = new FormData();
   
    for(let index=0; index<file.length; index++)
    {
 const element = file[index];
 console.log("element"+element)
 sendingForm.append("images", element)
    }
    console.log("file"+file)
sendingForm.append("name", JSON.stringify(formData))

    try {
      const result = await postAdoption(sendingForm);
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
            <Select
              onChange={selectPostType}
              label="Post Type"
              placeholder="Post Type"
              data={["Adoption", "Missing"]}
            />
            {postType == "Adoption" ? (
              <span>
                <h1>Add an Adoption Post</h1>
                <form
                  onReset={(e)=>{
                    form.onReset(e);
                    onReset()
                  }}
                  onSubmit={form.onSubmit((values) => {
                    submitForm();
                  })}
                >
                  <TextInput
                    label="Cat Name"
                    placeholder="Enter Cat name"
                    {...form.getInputProps("name")}
                  />
                  <Textarea
                    label="Description"
                    placeholder="Cat Description"
                    {...form.getInputProps("description")}
                  />
                
                  <label>Upload Cat Image</label>
                  <input  id="fileInputAdopt"     ref={adoptFileInputRef} multiple  onChange={(e:any)=>setFile(e.target.files)} type="file" />
                  <TextInput
                    label="Location"
                    placeholder="Enter Location"
                    {...form.getInputProps("location")}
                  />
                  <TextInput
                    label="Contact Number"
                    placeholder="Enter Contact Number"
                    {...form.getInputProps("contactNumber")}
                  />
                  <TextInput
                    label="Posted By"
                    placeholder="Enter your Name"
                    {...form.getInputProps("postedBy_name")}
                  />
                  <TextInput
                    label="Email"
                    placeholder="Enter your Email"
                    {...form.getInputProps("postedBy_email")}
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
            ) : postType == "Missing" ? (
              <span>
              <h1>Add a Missing Post</h1>
              <form
                onReset={(e)=>{
                  form.onReset(e);
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
                <input multiple  ref={missingFileInputRef}  onChange={(e:any)=>setMissingFile(e.target.files)} type="file" />
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
            ) : (
              <></>
            )}
          </Box>
        </Container>
      </div>
    </div>
  );
}
