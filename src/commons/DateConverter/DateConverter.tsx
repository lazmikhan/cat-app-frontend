const convertDate =(timestamp:string)=>{

   
const date = new Date(timestamp);

const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

console.log(formattedDate);
return formattedDate;
}
export {
    convertDate
}