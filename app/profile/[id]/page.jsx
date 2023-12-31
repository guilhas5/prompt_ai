"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`/api/users/${params?.id}/posts`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed fetching user profile");
        }
        const data = await response.json();
        setUserPosts(data); // Assuming the response contains user profile data
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (params?.id) {
      fetchUserPosts();
    }
  }, [params.id]);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  return (
    <Profile
      name={capitalizeFirstLetter(userName)}
      description={`Welcome to ${capitalizeFirstLetter(
        userName
      )}'s profile page. Explore ${capitalizeFirstLetter(
        userName
      )}'s amazing prompts and get inspired. Together we are stronger!`}
      data={userPosts}
    />
  );
}

export default UserProfile;
