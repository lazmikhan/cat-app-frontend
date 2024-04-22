import React, { useEffect, useState } from 'react'
import { checkUser, deleteUser, fetchAllUsers, logoutUser } from '../../services/apiCall';
import { Link, Outlet, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { Accordion, AppShell, Burger, Button, Divider, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from '../../images/CatsAidLogo.png'
import Dashboard from './Dashboard';
import { DonutChart, PieChart } from '@mantine/charts';
import { getAllAdoptionPosts } from '../../services/adoptService';
import '@mantine/charts/styles.css';
import { IconAddressBook, IconCircle, IconCircle0Filled, IconCircleArrowLeftFilled, IconClock, IconDeviceMobile, IconMail, IconMoneybag, IconTimelineEvent, IconTransactionDollar, IconUser, IconUxCircle } from '@tabler/icons-react';
import { getAllMissingPosts } from '../../services/missingService';
import { notifications } from '@mantine/notifications';
import { deleteDonate, getAllDonations } from '../../services/donateSernice';
import { convertDate } from '../../commons/DateConverter/DateConverter';

export default function Admin() {
  
const [users,setUsers]:any=useState([]);
let [totalAdopted,setTotalAdopted]=useState(0);
let [totalPending,setTotalPending]=useState(0);
let [totalAvailable,setTotalAvailable]=useState(0);
let [totalFound,setTotalFound]=useState(0);
let [totalNotFound,setTotalNotFound]=useState(0);
let [isUserDeleted,setIsUserDeleted]=useState(false);
const [adoptions,setAdoptions]=useState([]);
const [donations,setDonations]=useState([]);
const [opened, { toggle }] = useDisclosure();
const Navigate = useNavigate();


 
    useEffect(()=>{
        setTotalAdopted(0);
        setTotalAvailable(0);
        setTotalPending(0);
        setTotalFound(0);
        setTotalNotFound(0);
        setTotalAdopted(0);

        const getAllUsers =async()=>{
            const result = await fetchAllUsers();
              setUsers(result);
        }
        const getAllDonationsAdmin=async()=>{
            const result = await getAllDonations();
              setDonations(result);
        }
        const getAllAdoptions =async()=>{
            const result:any = await getAllAdoptionPosts();
console.log(result)
result.forEach((element : any)=> {
    if(element.status==='available')
    {
        setTotalAvailable((prevTotalAdopted) => prevTotalAdopted + 1)
    }
    else if(element.status==='pending')
    {
       setTotalPending((prevTotalAdopted) => prevTotalAdopted + 1)
    }
    else if(element.status==='adopted')
    {
        setTotalAdopted((prevTotalAdopted) => prevTotalAdopted + 1)
    }
});
            setAdoptions(result);
            
          }

          const getAllMissing =async()=>{
            const result:any = await getAllMissingPosts();
console.log(result)
result.forEach((element : any)=> {
    if(element.status==='found')
    {
        setTotalFound((prevTotalAdopted) => prevTotalAdopted + 1)
    }
    else if(element.status==='not-found')
    {
       setTotalNotFound((prevTotalAdopted) => prevTotalAdopted + 1)
    }
   
});
            setAdoptions(result);
            
          }   
        const getCurrentUser =async()=>{
            try{
             const result = await checkUser(); 
           
            if(result.email =='admin@gmail.com')
            {
                Navigate('/admin');
            }
            else{
Navigate('/');
            }
            }catch(error)
            {
             console.log(error);
             Navigate('/');
            }
         }

         getCurrentUser();
         getAllAdoptions();
         getAllMissing();
         getAllUsers();
         getAllDonationsAdmin();
    },[isUserDeleted])
    const data = [
        { name: 'Adopted', value: totalAdopted, color: 'indigo.6' },
        { name: 'Pending', value: totalPending, color: 'yellow.6' },
        { name: 'Available', value: totalAvailable, color: 'teal.6' }
      ];
    const missingData =[
        { name: 'Found', value: totalFound, color: 'indigo.6' },
        { name: 'Not-Found', value: totalNotFound, color: 'yellow.6' }
    ]
    const routes = [
        { path: 'dashboard', element: <Dashboard /> },
        // Add more child routes as needed
      ];
      const location = useLocation();
  
      const isChildRouteActive = routes.some((route) => location.pathname.includes(route.path));
      
      const userInfo= users.map((user: { _id: string , name :string, email:string , address:string, mobileNo:string, adoptionPosts:[], missingPosts:[], donations:[]})=>
      <Accordion.Item  key={user._id} value= { user._id}>
      <Accordion.Control ><div style={{display:'flex', justifyContent:'space-between'}}><p> <IconUser></IconUser>  {user.name} - {user.email}  </p>  <Button onClick={async()=>{
         const result =await deleteUser(user._id);
        if(result.deletedCount==1)
        {  setIsUserDeleted(!isUserDeleted);
            notifications.show({
                title: "Deleted Post Successfully",
                message: "",
                autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
                color: "yellow", // Set the notification color v(optional)
              });
        }
        else{
            notifications.show({
                title: "Error Deleting",
                message: "",
                autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
                color: "red", // Set the notification color (optional)
              });
        }
      }} color='red'>Delete</Button></div></Accordion.Control>
      <Accordion.Panel>
     <p> <IconAddressBook></IconAddressBook> Address: {user.address}</p>
   <p>   <IconDeviceMobile></IconDeviceMobile> MobileNo : {user.mobileNo}</p>
   <p>   <IconDeviceMobile></IconDeviceMobile> Adoption Posts : {user.adoptionPosts.length}</p>
   <p>   <IconDeviceMobile></IconDeviceMobile> Missing Posts : {user.missingPosts.length}</p>
   <p>   <IconDeviceMobile></IconDeviceMobile> Donations : {user.donations.length}</p>

      </Accordion.Panel>
    </Accordion.Item>


      )
      const donationinfo= donations.map((donation: {
          [x: string]: any; _id: string , name :string, email:string , address:string, mobileNo:string
})=>
      <Accordion.Item  key={donation._id} value= { donation._id}>
      <Accordion.Control ><div style={{display:'flex', justifyContent:'space-between'}}><p><IconUser></IconUser> {donation.donorDetails.name} - {donation.amount}  </p>  <Button onClick={async()=>{
         const result =await deleteDonate( {
            userId: donation.donorDetails.id
         },donation._id);
         console.log(result)
        if(result.data.deletedCount==1)
        {  setIsUserDeleted(!isUserDeleted);
            notifications.show({
                title: "Deleted Post Successfully",
                message: "",
                autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
                color: "yellow", // Set the notification color (optional)
              });
        }
        else{
            notifications.show({
                title: "Error Deleting",
                message: "",
                autoClose: 5000, // Set the autoClose duration in milliseconds (optional)
                color: "red", // Set the notification color (optional)
              });
        }
      }} color='red'>Delete</Button></div></Accordion.Control>
      <Accordion.Panel>
      <p> <IconAddressBook></IconAddressBook> Donor Name: {donation.donorDetails.name}</p>
      <p>   <IconMail></IconMail> Donor Email : {donation.donorDetails.email}</p>
      <p>   <IconTransactionDollar></IconTransactionDollar> TransactionId : {donation.transactionId}</p>
      <p>   <IconMoneybag></IconMoneybag> Amount : {donation.amount}</p>
      <p>   <IconClock></IconClock> Donated At : {convertDate(donation.createdAt)}</p>
      
      </Accordion.Panel>
      </Accordion.Item>)
  return (
<AppShell style={{backgroundColor:'blue !important'}}
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header >
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
     <div>
     <img style={{width:'9%'}} src={Logo} alt="" />
     </div>
      </AppShell.Header>

      <AppShell.Navbar style={{backgroundColor: '#FFB017', color:'white'}}  p="md">
        

        <div >
       
   
    <h1>
    <Link className='Madimi' style={{color:'white',
        textDecoration:'none'
       }} to={'dashboard'}>Dashbaord</Link>
    </h1>
     <h1>
     <Link onClick={logoutUser} className='Madimi' style={{color:'white',
        textDecoration:'none'
       }} to={'/login'}>Logout</Link>
     </h1>
     <h1>
     <Link  className=' Madimi' style={{color:'white',
        textDecoration:'none'
       }} to={'/admin'}>Website Reports</Link>
     </h1>
   </div>
       
      </AppShell.Navbar>
  

      <AppShell.Main>
      <h1 className="color-head Madimi" style={{ textAlign: 'center' }}>
              Welcome Admin
            </h1>
      {!isChildRouteActive && (
          <>
       
<div className='Madimi'>
<div style={{backgroundColor:'rgb(238, 234, 234)' ,padding:'5px' , borderRadius:'5px'}}>
<h1 className='color-head'>Adoption Posts Report</h1>
<div style={{display:'flex', justifyContent:'space-around'}}>
 <PieChart withLabelsLine labelsPosition="outside" labelsType="percent" withLabels data={data} />
       <div>

<div>      <IconCircleArrowLeftFilled style={{
    color:'#4c6ef5'
}}></IconCircleArrowLeftFilled>Adopted </div>
<div>      <IconCircleArrowLeftFilled style={{
    color:'#fab005'
}}></IconCircleArrowLeftFilled> Pending</div>
<div>      <IconCircleArrowLeftFilled style={{
    color:'#12b886'
}}></IconCircleArrowLeftFilled> Available</div>
      
       </div>
 </div>
</div>
<Divider></Divider>
<br />
<div style={{backgroundColor:'rgb(238, 234, 234)' ,padding:'5px' , borderRadius:'5px'}}>
<h1 className='color-head'>Missing Post Reports</h1>
 <div style={{display:'flex', justifyContent:'space-around'}}>
 <PieChart withLabelsLine labelsPosition="outside" labelsType="percent" withLabels data={missingData} />
       <div>

<div>      <IconCircleArrowLeftFilled style={{
    color:'#4c6ef5'
}}></IconCircleArrowLeftFilled>Found </div>
<div>      <IconCircleArrowLeftFilled style={{
    color:'#fab005'
}}></IconCircleArrowLeftFilled> Not Found</div>

      
       </div>
 </div>
</div>
<br />
 <div style={{backgroundColor:'rgb(238, 234, 234)' ,padding:'5px' , borderRadius:'5px'}}>
 <h1 className='color-head'>User List : {users.length}</h1>

   
     <ScrollArea h={250}>
     <Accordion defaultValue="Apples">
      {userInfo}
    </Accordion>
    </ScrollArea>
 </div>
 <div style={{backgroundColor:'rgb(238, 234, 234)' ,padding:'5px' , borderRadius:'5px'}}>
 <h1 className='color-head'>Donation List : {donations.length}</h1>

   
     <ScrollArea h={250}>
     <Accordion defaultValue="Apples">
      {donationinfo}
    </Accordion>
    </ScrollArea>
 </div>
</div>
          </>
        )}
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
