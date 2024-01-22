import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const dummyFollowers = [
  {
    id: 1,
    name: "John Doe",
    location: "New York",
    imgSrc: "url_to_image_1",
  },
  {
    id: 2,
    name: "Jane Smith",
    location: "Los Angeles",
    imgSrc: "url_to_image_2",
  },
  // Add more dummy followers as needed
];

const FollowerCard = () => {
  const [followers, setFollowers] = useState(dummyFollowers);

  const handleFollowClick = (followerId) => {
    setFollowers((prevFollowers) =>
      prevFollowers.map((follower) =>
        follower.id === followerId
          ? { ...follower, isFollowed: !follower.isFollowed }
          : follower
      )
    );
  };

  return (
    <div className="w-[fit-content] rounded-3xl shadow-lg border border-gray-300 flex-shrink-0 ml-4 p-4">
      {followers.map((follower) => (
        <div key={follower.id} className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={follower.imgSrc}
              alt={follower.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold">{follower.name}</p>
            <p className="text-gray-500">{follower.location}</p>
          </div>
          <button
            onClick={() => handleFollowClick(follower.id)}
            className={`ml-auto px-4 py-2 rounded-full ${
              follower.isFollowed
                ? "bg-green-500 text-white"
                : "bg-transparent text-green-500 border border-green-500"
            } hover:bg-transparent hover:border-green-500 hover:text-green-500 flex items-center focus:outline-none`}
          >
            {follower.isFollowed ? (
              <>
                <FaCheck className="mr-2" /> Followed
              </>
            ) : (
              "Follow"
            )}
          </button>
        </div>
      ))}
    </div>
  );
  
};

export default FollowerCard;