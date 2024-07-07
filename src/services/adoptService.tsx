import axios from "axios";


const getAllAdoptionPosts=async()=>{
try{
    const response = await fetch("http://localhost:5000/api/v1/adoptionPosts", {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
        // Other options...
      });

      const result= await response.json();

      return result.data;


}
catch(error){
console.log(error)
}
    }
    const getUserAdoption=async(id:any)=>{
     
      try{
        const response = await fetch(`http://localhost:5000/api/v1/userAdoption/${id}`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
            // Other options...
          });
    
          const result= await response.json();
  console.log(result.data)
          return result.data;
    
    
    }
    catch(error){
    console.log(error)
    }
          }
    const postAdoption = async (formData: Object) => {
        try {
          const response = await axios.post("http://localhost:5000/api/v1/adoptionposts", formData,
      {headers: {
        "Content-Type": "multipart/form-data",
    },withCredentials:true

      },
            
            
          );
      
          return response;
        } catch (error) {
          console.log(error);
        }
      };
      const updateAdoption = async (formData: Object, id:string) => {
        try {
          console.log(formData)
          const response = await fetch(`http://localhost:5000/api/v1/adoptionposts/${id}`, {
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
      const deleteAdoption = async ( formData: Object,id:string) => {
        try {
          
          const response = await fetch(`http://localhost:5000/api/v1/adoptionposts/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(formData),
          });
          const result = await response.json();
         
          return result.data;
        } catch (error) {
          console.log(error);
        }
      };
    const getAllAdoptionPostsById=async(id:any)=>{
        try{
            const response = await fetch(`http://localhost:5000/api/v1/adoptionPosts/${id}`, {
                method: 'GET',
                credentials: 'include', // Include cookies in the request
                // Other options...
              });
        
              const result= await response.json();
        
              return result.data;
        
        
        }
        catch(error){
        console.log(error)
        }
            }
  export  {getAllAdoptionPosts,getAllAdoptionPostsById,postAdoption,getUserAdoption,updateAdoption,deleteAdoption} 