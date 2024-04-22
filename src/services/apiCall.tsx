const fetchAllUsers = async () => {

  try {
    const response = await fetch("http://localhost:5000/api/v1/signUp", {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
      // Other options...
    });
   
    const result = await response.json();
  
    return result.data;
  } catch (error) {
    console.log(error);
 
  }
};
const checkUser = async () => {

  try {
    const response = await fetch("http://localhost:5000/api/v1/checkUser", {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
      // Other options...
    });
   
    const result = await response.json();
  
    return result.user;
  } catch (error) {
    console.log(error);
 
  }
};
const deleteUser = async ( id:string) => {
  try {
    
    const response = await fetch(`http://localhost:5000/api/v1/signUp/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });
    const result = await response.json();
   
    return result.data;
  } catch (error) {
    console.log(error);
  }}
const logoutUser = async () => {

  try {
    const response = await fetch("http://localhost:5000/api/v1/logout", {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
      // Other options...
    });
   
    const result = await response.json();
  localStorage.removeItem('active');
    return result.data;
  } catch (error) {
    console.log(error);
 
  }
};
const postUser = async (formData: Object) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/signUp", {
      method: "POST",
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
const updateUser = async (formData: Object, id:string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/signUp/${id}`, {
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
const loginUser = async (formData: Object) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/login", {
      method: "POST",
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
export {updateUser, fetchAllUsers, postUser,loginUser ,logoutUser,checkUser,deleteUser};
