const getAllShopPosts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/shops", {
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

export { getAllShopPosts };
