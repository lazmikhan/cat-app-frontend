import React, { useEffect, useState } from "react";
import { getAllAdoptionPosts } from "../../services/adoptService";
import AdoptionCard from "../../commons/AdoptionCard/AdoptionCard";
import { Accordion, Grid, Pagination, Text } from "@mantine/core";
import { getAllShopPosts } from "../../services/shopService";
import ShopCard from "../../commons/ShopCard/ShopCard";
import { IconCameraSelfie, IconPhoto, IconPrinter } from "@tabler/icons-react";
interface AdoptionPost {
  _id: string; // Adjust the type based on the name
  description?: String;
  name: String;
}
export default function Shop() {
  const itemsPerPage = 2;
  const [activePage, setPage] = useState(1);
  const [adoptionPosts, setAdoptionPosts] = useState<AdoptionPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<AdoptionPost[]>([]);
  useEffect(() => {
    const getAdoptionPosts = async () => {
      const adoptionPostsData = await getAllShopPosts();
      setAdoptionPosts(adoptionPostsData);

      updateVisiblePosts(adoptionPostsData, activePage);
      return adoptionPosts;
    };
    getAdoptionPosts();
  }, []);
  const updateVisiblePosts = (allPosts: AdoptionPost[], page: number) => {
    console.log(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(allPosts);
    console.log(startIndex, endIndex);
    const postsOnCurrentPage = allPosts.slice(startIndex, endIndex);
    setVisiblePosts(postsOnCurrentPage);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateVisiblePosts(adoptionPosts, newPage);
  };
  return (
    <div >
    
<Grid >
  <Grid.Col span={6}>
  <Grid className="Madimi">
        {visiblePosts.map((post) => (
          <Grid.Col span={6}>
            <ShopCard
              _id={post._id}
              key={post._id}
              name={post.name}
              description={post.description}
       
            ></ShopCard>
          </Grid.Col>
        ))}
      </Grid>
  </Grid.Col>
  <Grid.Col span={6}>

  <Accordion variant="contained">
      <Accordion.Item value="photos">
        <Accordion.Control
      
        >
  <Text className="Madimi">Explore Different Cat Vanity Items through our partnership shops online</Text>
        </Accordion.Control>
        <Accordion.Panel>Pamper your feline friend with the latest and trendiest cat vanity items available through CatsAid's partnered shops. Discover a wide range of stylish cat beds, scratching posts, grooming tools, and more. Treat your cat like royalty and create a purr-fectly comfortable space for them to relax and play.</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="print">
        <Accordion.Control
        className="Madimi"
        >
        Why Shop from CatsAid partnered shops?
        </Accordion.Control>
        <Accordion.Panel> Choosing CatsAid partnered shops for your cat-related needs ensures a seamless and delightful shopping experience. We earn profit through every purchase you make from out partnered shops which we use for the betterment of our application</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="camera">
        <Accordion.Control
        className="Madimi"
        >
          What CatsAids partnered shops provide
        </Accordion.Control>
        <Accordion.Panel> CatsAid partnered shops go beyond just selling products; they provide a curated selection of cat essentials and accessories. From innovative toys to health-conscious cat food, our partners prioritize the happiness and health of your feline companion. Enjoy a variety of choices and discover products that cater to the unique needs and preferences of your beloved cat.</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </Grid.Col>
</Grid>

      <div>

 </div>
      <Pagination color="yellow" 
        total={Math.ceil(adoptionPosts.length / itemsPerPage)}
        value={activePage}
        onChange={handlePageChange}
        mt="sm"
      />
    </div>
  );
}
