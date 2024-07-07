
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
import Dashboard2 from "./Dashboard2";
import { getAllMissingPosts } from "../../services/missingService";
import DashboardEdit2 from "./DashboardEdit2";

export default function Dashboard() {
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
  const [isDeleted2, setIsDeleted2] = useState(false);
  const [activePage2, setPage2] = useState(1);
  const [adoptionPosts2, setAdoptionPosts2] = useState<AdoptionPost[]>([]);
  const [visiblePosts2, setVisiblePosts2] = useState<AdoptionPost[]>([]);
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
    
      const adoptionPostsData = await getAllAdoptionPosts();
      setAdoptionPosts(adoptionPostsData);

      updateVisiblePosts(adoptionPostsData, activePage);
      return adoptionPosts;
    };
    getAdoptionPosts();
console.log('chnged adopted')
  },[isDeleted])
  useEffect(()=>{
   
  
    const getAdoptionPosts2 = async () => {
    
      const adoptionPostsData = await getAllMissingPosts();
      setAdoptionPosts2(adoptionPostsData);

      updateVisiblePosts2(adoptionPostsData, activePage2);
      return adoptionPosts;
    };
    getAdoptionPosts2();
    console.log('chnged missing')
  },[isDeleted2])
  const updateVisiblePosts = (allPosts: AdoptionPost[], page: number) => {
    console.log(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(allPosts);
    console.log(startIndex, endIndex);
    const postsOnCurrentPage = allPosts.slice(startIndex, endIndex);
    setVisiblePosts(postsOnCurrentPage);
  };
  const updateVisiblePosts2 = (allPosts: AdoptionPost[], page: number) => {
    console.log(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(allPosts);
    console.log(startIndex, endIndex);
    const postsOnCurrentPage = allPosts.slice(startIndex, endIndex);
    setVisiblePosts2(postsOnCurrentPage);
  };
  const handlePageChange2 = (newPage: number) => {
    setPage2(newPage);
    updateVisiblePosts2(adoptionPosts2, newPage);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateVisiblePosts(adoptionPosts, newPage);
  };
  let deletionResult2: any = {};
  useEffect(() => {
    if (deletionResult2.acknowledged == true) {
      console.log("ss");
    }
  }, []);
  let deletionResult: any = {};
  useEffect(() => {
    if (deletionResult.acknowledged == true) {
      console.log("ss");
    }
  }, []);

  return (
    <div>
      <h1 className='Madimi color-head'>All Adoption Posts</h1>
      <Grid>
        {visiblePosts.map((post) => (
          <Grid.Col span={3}>
             <DashboardEdit
                  isDeleted={isDeleted}
                  setIsDeleted={setIsDeleted}
                  postedById={user._id}
                  id={post._id}
                  images={post.images[0]}
                  name={post.name}
                  status="l"
               
                ></DashboardEdit>
          </Grid.Col>
        ))}
      </Grid>
      <Pagination color="yellow" 
        total={Math.ceil(adoptionPosts.length / itemsPerPage)}
        value={activePage}
        onChange={handlePageChange}
        mt="sm"
      />
        <div>
        <h1 className='Madimi color-head'>All Missing Posts</h1>
        <Grid>
          {visiblePosts2.map((post) => (
            <Grid.Col span={3}>
               <DashboardEdit2
                    isDeleted={isDeleted2}
                    setIsDeleted={setIsDeleted2}
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
          value={activePage2}
          onChange={handlePageChange2}
          mt="sm"
        />
      </div>
    </div>
  );
}


