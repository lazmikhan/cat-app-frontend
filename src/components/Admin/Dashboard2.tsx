
import {
    Badge,
    Button,
    Card,
    Group,
    Image,
    ModalBase,
    Pagination,
    Select,
    Text,
    TextInput,
    Grid
  } from "@mantine/core";
  import React, { useEffect, useState } from "react";
  
  import { IconTrash } from "@tabler/icons-react";
  
  import { openConfirmModal } from "@mantine/modals";
  
  import { useNavigate } from "react-router-dom";
  import { Navigate } from "react-router-dom";
  import { deleteAdoption, getAllAdoptionPosts, updateAdoption } from "../../services/adoptService";
  
  import { checkUser } from "../../services/apiCall";
  import DashboardEdit from "./DashboardEdit";
import { getAllMissingPosts } from "../../services/missingService";
import DashboardEdit2 from "./DashboardEdit2";
  
  export default function Dashboard2() {
    interface AdoptionPost {
      _id: string; // Adjust the type based on the name?
      contactNumber?: string;
      images: Array<any>;
      location?: string;
      postedBy?: {
        name: string;
        email: string;
      };
      createdAt: string;
      description?: string;
      name: string;
    }
    const [isDeleted, setIsDeleted] = useState(false);
    const [user, setUser] = useState<any>({});
    const itemsPerPage = 10;
    const [activePage, setPage] = useState(1);
    const [adoptionPosts, setAdoptionPosts] = useState<AdoptionPost[]>([]);
    const [visiblePosts, setVisiblePosts] = useState<AdoptionPost[]>([]);
    useEffect(() => {
      const checkUserInfo = async () => {
        const result = await checkUser();
        setUser(result);
  
     
  
        return result;
      };
      checkUserInfo();
    }, []);
    useEffect(()=>{
   
  
      const getAdoptionPosts = async () => {
      
        const adoptionPostsData = await getAllMissingPosts();
        setAdoptionPosts(adoptionPostsData);
  
        updateVisiblePosts(adoptionPostsData, activePage);
        return adoptionPosts;
      };
      getAdoptionPosts();
  
    },[isDeleted])
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
  
    let deletionResult: any = {};
    const navigate = useNavigate();
    useEffect(() => {
      if (deletionResult.acknowledged == true) {
        console.log("ss");
      }
    }, []);
  
    return (
      <div>
        <h1 className='Madimi color-head'>All Missing Posts</h1>
        <Grid>
          {visiblePosts.map((post) => (
            <Grid.Col span={3}>
               <DashboardEdit2
                    isDeleted={isDeleted}
                    setIsDeleted={setIsDeleted}
                    postedById={user._id}
                    id={post._id}
                    images={post.images[0]}
                    name={post.name}
                    status="l"
                 
                  ></DashboardEdit2>
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
  
  
  