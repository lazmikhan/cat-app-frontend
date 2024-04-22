const getAllHospitals = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/hospitals", {
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
const getAllHospitalsbyId = async (id:any) => {
    try {
   if(id!=undefined){
    const response = await fetch(`http://localhost:5000/api/v1/hospitals/${id}`, {
      method: "GET",
      credentials: "include", // Include cookies in the request
      // Other options...
    });

    const result = await response.json();

    return result.data;
   }
    } catch (error) {
      console.log(error);
    }
  };
export { getAllHospitals,getAllHospitalsbyId };
