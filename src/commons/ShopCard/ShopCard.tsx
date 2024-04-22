import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

import { Link } from 'react-router-dom';
interface AdoptionProps{
    _id?:String,
name?:String,
contactNumber?:String,
images?:Array<String>,

description?:String,

}
function ShopCard( props: AdoptionProps) {
  
  return (

   <div>
   
     <Card className='hover-card Madimi' style={{

      
      
height:'100%'
}} shadow="sm" padding="lg" radius="md" withBorder>
<Card.Section>
  <Image 
    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGNdLBVfqb1riq9gnXpE4BZ6uzCwqpmBSS5w&usqp=CAU`}
    height={160}
    alt="Norway"
  />
</Card.Section>

<Group justify="space-between" mt="md" mb="xs">
  <Text fw={500}>{props.name}</Text>

</Group>



<a target="_blank" style={{textDecoration:'none', color:'black'}} href="https://www.daraz.com.bd/shop/jcs-trading/?spm=a2a0e.pdp.seller.1.5b066adcgEFf4P&itemId=282252263&channelSource=pdp"><Button color='yellow' style={{
    color:'black'
}}>Go to Shop</Button></a>

</Card>
   </div>
  );
}
 export default ShopCard;