import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

function CardComponent( props: {backGround:any, imgSrc:any|string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>>, title: string ; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) {
  return (
    <Card style={{
      backgroundColor:props.backGround
    }} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image 
          src={props.imgSrc}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{props.title}</Text>
  
      </Group>

      <Text size="sm" c="dimmed">
        {props.description}
      </Text>

    </Card>
  );
}
 export default CardComponent;