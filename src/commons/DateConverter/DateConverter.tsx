const convertDate =(timestamp:string)=>{

   
    const date = new Date(timestamp);

    // Extract the parts of the date
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    
    // Construct the readable date format
    const readableDate = `${year} ${month} ${day}`;
return readableDate;
}
export {
    convertDate
}