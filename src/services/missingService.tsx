import axios from "axios";

const getAllMissingPosts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/missingPosts", {
      method: "GET",
      credentials: "include", // Include cookies in the request
      // Other options...
    });

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllMissingPostsById = async (id: any) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/missingPosts/${id}`,
      {
        method: "GET",
        credentials: "include", // Include cookies in the request
        // Other options...
      }
    );

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
const postMissing = async (formData: any) => {
  try {
    console.log(formData)
  
    const response = await axios.post(
      "http://localhost:5000/api/v1/missingPosts",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const updateMissing = async (formData: Object, id:string) => {
  try {
    console.log(formData)
    const response = await fetch(`http://localhost:5000/api/v1/missingPosts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
const deleteMissing= async (formData: Object,  id:string) => {
  try {
    
    const response = await fetch(`http://localhost:5000/api/v1/missingPosts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export { getAllMissingPosts, getAllMissingPostsById, postMissing,updateMissing,deleteMissing };
