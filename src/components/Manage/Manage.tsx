import React, { useEffect, useState } from "react";
import { Button, Grid, Pagination } from "@mantine/core";
import ManageAdoption from "../../commons/ManageCards/ManageAdoption";
import { checkUser } from "../../services/apiCall";
import ManageMissing from "../../commons/ManageCards/ManageMissing";
interface AdoptionPost {
  _id: string; // Adjust the type based on the name?
  contactNumber?: String;
  images: string;
  location?: String;
  postedBy: {
    name: string;
    email: string;
    id: string;
  };
  status: string;
  createdAt?: string;
  description?: String;
  name: string;
}
interface MissingPost {
  _id: string; // Adjust the type based on the name?
  contactNumber?: String;
  images: string;
  location?: String;
  postedBy: {
    name: string;
    email: string;
    id: string;
  };
  status: string;
  createdAt?: string;
  description?: String;
  name: string;
}
export default function Manage() {
  const itemsPerPage = 4;
  const [isDeleted, setIsDeleted] = useState(false);
  const [activePage, setPage] = useState(1);
  const [activeMissingPage, setMissingPage] = useState(1);
  const [user, setUser]: any = useState({});
  const [adoptionPosts, setAdoptionPosts] = useState<AdoptionPost[]>([]);
  const [missingPosts, setMissingPosts] = useState<MissingPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<AdoptionPost[]>([]);
  const [visibleMissingPosts, setVisibleMissingPosts] = useState<MissingPost[]>(
    []
  );
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await checkUser();
        console.log(result);
        setUser(result);
        setAdoptionPosts(result.adoptionPosts);
        setMissingPosts(result.missingPosts);
        updateVisiblePosts(result.adoptionPosts, activePage);
        updateVisibleMissingPosts(result.missingPosts, activeMissingPage);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentUser();
  }, [isDeleted]);
  const updateVisiblePosts = (allPosts: AdoptionPost[], page: number) => {
    console.log(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(allPosts);
    console.log(startIndex, endIndex);
    const postsOnCurrentPage = allPosts.slice(startIndex, endIndex);
    setVisiblePosts(postsOnCurrentPage);
  };
  const updateVisibleMissingPosts = (allPosts: MissingPost[], page: number) => {
    console.log(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(allPosts);
    console.log(startIndex, endIndex);
    const postsOnCurrentPage = allPosts.slice(startIndex, endIndex);
    setVisibleMissingPosts(postsOnCurrentPage);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateVisiblePosts(adoptionPosts, newPage);
  };
  const handleMissingPageChange = (newPage: number) => {
    setMissingPage(newPage);
    updateVisibleMissingPosts(missingPosts, newPage);
  };
  return (
    <div className="Madimi">
      <div>
        <h1 className="color-head">Edit Adoption Posts</h1>
        <Grid>
          {visiblePosts.length === 0 ? (
            <Grid.Col span={12}>
              <h3 className="color-head">No Posts Found</h3>
            </Grid.Col>
          ) : (
            visiblePosts.map((post) => (
              <Grid.Col span={3}>
                <ManageAdoption
                  isDeleted={isDeleted}
                  setIsDeleted={setIsDeleted}
                  postedById={user._id}
                  id={post._id}
                  images={post.images[0]}
                  name={post.name}
                  status={post.status}
                ></ManageAdoption>
              </Grid.Col>
            ))
          )}
        </Grid>

        <Pagination
          color="yellow"
          total={Math.ceil(adoptionPosts.length / itemsPerPage)}
          value={activePage}
          onChange={handlePageChange}
          mt="sm"
        />
      </div>
      <div>
        <h1 className="color-head">Edit Missing Posts</h1>
        <Grid>
          {visibleMissingPosts.length === 0 ? (
            <Grid.Col span={12}>
              <h3 className="color-head">No Posts Found</h3>
            </Grid.Col>
          ) : (
            visibleMissingPosts.map((post) => (
              <Grid.Col span={3}>
                <ManageMissing
                  isDeleted={isDeleted}
                  setIsDeleted={setIsDeleted}
                  postedById={user._id}
                  id={post._id}
                  images={post.images[0]}
                  name={post.name}
                  status={post.status}
                ></ManageMissing>
              </Grid.Col>
            ))
          )}
        </Grid>

        <Pagination
          color="yellow"
          total={Math.ceil(missingPosts.length / itemsPerPage)}
          value={activePage}
          onChange={handleMissingPageChange}
          mt="sm"
        />
      </div>
    </div>
  );
}
