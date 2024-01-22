import React, { useState } from "react";

import { IoIosNotifications } from "react-icons/io";

const Drawer = ({ isOpen, onClose, children, notifications }) => {
  const [isNotificationVisible, setNotificationVisible] = useState(isOpen);

  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const generateDescription = (action, target) => {
    switch (action) {
      case "follow":
        return `started following you.`;

      case "like":
        return `liked your ${target}.`;

      case "comment":
        return `commented on your ${target}.`;

      default:
        return `performed an action on your ${target}.`;
    }
  };

  // Sort notifications in reverse order (newest first)

  const sortedNotifications = [...notifications].reverse();

  const handleNotificationClick = () => {
    setNotificationVisible(false);
  };

  const handleViewAllClick = () => {
    setShowAllNotifications(true);
  };

  return (
    <div
      className={`fixed top-0  left-0 z-50 h-screen w-80 bg-white transform ${
        isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex border-b border-dashed pb-7 items-center w-full mb-8">
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>

          <ul className="flex-grow overflow-y-auto">
            {sortedNotifications.map((post, index) => (
              <li
                key={post.id}
                className={`mb-7 border-b border-dashed pb-7 flex items-center hover:bg-gray-200 rounded-lg cursor-pointer p-4 relative ${
                  index === 0 ? "relative" : ""
                }`}
                style={{ width: "100%" }}
                onClick={handleNotificationClick}
              >
                {isNotificationVisible && index === 0 && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <IoIosNotifications className="text-blue-500 text-xl" />
                  </div>
                )}

                <img
                  className="h-9 w-9 rounded-full mr-2"
                  src={post.profileimg}
                  alt=""
                />

                <div>
                  <div>
                    <span className="font-semibold">{post.title}</span>,{" "}
                    {generateDescription(post.action, post.target)}
                  </div>

                  <div className="text-gray-500 text-sm mt-1">
                    {post.timestamp}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {!showAllNotifications && notifications.length > 5 && (
            <button
              className="mt-4 text-blue-500 cursor-pointer"
              onClick={handleViewAllClick}
            >
              View All
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>

        <span className="sr-only">Close menu</span>
      </button>
    </div>
  );
};

export default Drawer;
