import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import './AdoptionCard.css';
import { Link } from 'react-router-dom';
import { convertDate } from '../DateConverter/DateConverter';
interface AdoptionProps{
    _id?:String,
name?:String,
contactNumber?:String,
images?:Array<String>,
location?:string,
postedBy?:{
    name:String,
    email:String
},
createdAt:string,
description?:string,

}
function AdoptionCard( props: AdoptionProps) {
  console.log('adoptoion', props);
  return (
 <Link className='Madimi' style={{
  
    textDecoration:'none'
 }} to={`/adopt/${props._id}`}>
    <Card className='hover-card' style={{

width:'75%',
      
height:'100%'
}} shadow="sm" padding="lg" radius="md" withBorder>
<Card.Section>
  <Image 
    src={props.images?`http://localhost:5000/${props.images}`:""}
    height={200}
    width={50}
    alt="Norway"
  />
</Card.Section>

<Group justify="space-between" mt="md" mb="xs">
  <Text fw={500}>{props.name}</Text>

</Group>


<b>Posted By:</b>
<Badge color="yellow">{props?.postedBy?.name}</Badge>
<b>Posted At:</b>
<Badge color="yellow">{props.createdAt}</Badge>


</Card></Link>
  );
}
 export default AdoptionCard;