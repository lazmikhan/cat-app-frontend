import React, { useEffect, useState } from "react";
import { getAllAdoptionPosts } from "../../services/adoptService";
import AdoptionCard from "../../commons/AdoptionCard/AdoptionCard";
import { Button, Container, Grid, Input, Pagination } from "@mantine/core";
import { convertDate } from "../../commons/DateConverter/DateConverter";
import { IconSearch } from "@tabler/icons-react";
interface AdoptionPost {
  _id: string; // Adjust the type based on the name?
  contactNumber?: String;
  images: Array<any>;
  location?: String;
  postedBy?: {
    name: String;
    email: String;
  };
  createdAt: string;
  description?: string;
  name: String;
}
export default function Adopt() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const filteredResults:any = adoptionPosts.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVisiblePosts(filteredResults)
  };

  const handleInputChange = (event:any) => {
    setSearchTerm(event.target.value);
   
  };

  const handleKeyPress = (event:any) => {
  
      handleSearch();
    
  };
  const itemsPerPage = 10;
  const [activePage, setPage] = useState(1);
  const [adoptionPosts, setAdoptionPosts] = useState<AdoptionPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<AdoptionPost[]>([]);
  useEffect(() => {
    const getAdoptionPosts = async () => {
      const adoptionPostsData = await getAllAdoptionPosts();
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
  console.log('all adoptions', visiblePosts)
  return (
    <div>
      <Container style={{
        position:'relative',
        display:'flex',
        justifyContent:'center'
      }}>
<span>
<span style={{
       
       position:'absolute',
       zIndex:'1',
       top:'5px',
       color:'grey'
      
     }}> <IconSearch/> </span><Input style={{
       paddingLeft: "40px",
       width:'800px'
     }} placeholder="Search by Name...."
     value={searchTerm}
     onChange={handleInputChange}
   
     />
</span>
      <Button  style={{
        backgroundColor:'#FFB017'
      }} onClick={handleKeyPress}>Search</Button>
      </Container>
      <br />
      <Grid>
        {visiblePosts.map((post) => (
          <Grid.Col span={3}>
            <AdoptionCard
              _id={post._id}
              images={post.images[0]}
              key={post._id}
              name={post.name}
              description={post.description}
              createdAt={convertDate(post.createdAt)}
              postedBy={post.postedBy}
            ></AdoptionCard>
          </Grid.Col>
        ))}
      </Grid>
      <Pagination color="yellow" 
        total={Math.ceil(adoptionPosts.length / itemsPerPage)}
        value={activePage}
        onChange={handlePageChange}
        mt="sm"
      />
    </div>
  );
}
