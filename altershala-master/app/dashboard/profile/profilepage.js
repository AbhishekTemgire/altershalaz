"use client";
import React, { useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import ProfileCard from "../../components/ProfileCard";
import FollowerCard from "@/app/components/FollowerCard";
import MainContainer from "@/app/components/MainContainer";
import dynamic from "next/dynamic";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFollower, setShowFollower] = useState(false);





  

  return (
    <div className="min-h-screen w-full">
      {/* Main Container */}
      <MainContainer/>
      {/* ProfileCard */}
      <div className="pt-4">
        {showProfile && <ProfileCard />}
      </div>
      {/* FollowerCard */}
      <div className="p-6">
        {showFollower && <FollowerCard />}
      </div>
    </div>
  );
};

export default Profile;