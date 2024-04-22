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
    const form = {
      name: "found pet sabt",
      description:
        "My lovely pet was found yesterday. She is a small brown dog with a white spot on her tail.",
      status: "found",
      images: [
        "1709136821417-1000000001-WIN_20220429_17_18_12_Pro.jpg",
        "1709136821417-1000000001-WIN_20220429_17_18_12_Pro.jpg",
      ],
    };
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
