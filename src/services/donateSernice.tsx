const postDonate = async (formData: Object) => {
    try {
   console.log(formData)
      const response = await fetch("http://localhost:5000/api/v1/donations", {
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
  const postStripePayment = async (formData: Object) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/donations//add-payment-stripe", {
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
  const getAllDonations= async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/donations", {
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
  const deleteDonate= async (formData: Object,  id:string) => {
    try {
      
      const response = await fetch(`http://localhost:5000/api/v1/donations/${id}`, {
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
  export {
    postDonate,getAllDonations,deleteDonate,postStripePayment
  }