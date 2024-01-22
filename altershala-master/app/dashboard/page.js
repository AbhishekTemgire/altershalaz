"use client";
import React, { useEffect, useState } from "react";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import ScrollableTabs from "../components/ScrollableTabs";
import "../../public/globals.css";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { IoPeopleOutline } from "react-icons/io5";
import { MdAutoGraph } from "react-icons/md";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import Link from "next/link";
import { useSearch } from "../context/SearchContext";
import dynamic from "next/dynamic";

const Home = () => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { searchTerm } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/blogPosts");
        let newBlogPosts = response.data.blogPosts;

        await Promise.all(
          newBlogPosts.map(async (post) => {
            post.coverimage = await loadImage(post.coverimage);
          })
        );

        setBlogPosts(newBlogPosts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setIsLoading(false);
      }
    };

    fetchData();

    const loadImage = async (url) => {
      const image = new Image();
      image.src = url;
      await new Promise((resolve) => {
        image.onload = resolve;
        image.onerror = resolve;
      });
      return url;
    };
  }, [searchTerm]);

  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  };

  function formatTimeAgo(timestamp) {
    const currentDate = new Date();
    const postDate = new Date(timestamp);
    const timeDifference = currentDate - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 30) {
      // If older than 30 days, display in 'YYYY-MM-DD' format
      const year = postDate.getFullYear();
      const month = String(postDate.getMonth() + 1).padStart(2, "0");
      const day = String(postDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } else if (days > 0) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else {
      return "Just now";
    }
  }

  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/blogposts/top-trending")
      .then((response) => {
        setTrendingPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top trending posts:", error);
      });
  }, []);

  const handleBookmarkClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  const [filteredData, setFilteredData] = useState([]);
  const tabs = ["All", "Tech", "Blog", "Finance", "Travel", "Food", "Health"];

  const handleTabChange = (selectedTab) => {
    const dataFromMongoDB = [
      { title: "Tech Post 1", category: "Tech" },
      { title: "Blog Post 1", category: "Blog" },
    ];

    if (selectedTab === "All") {
      setFilteredData(dataFromMongoDB);
    } else {
      const filtered = dataFromMongoDB.filter(
        (item) => item.category === selectedTab
      );
      setFilteredData(filtered);
    }
  };

  const [followingList, setFollowingList] = useState([]);

  // Define demo data for people to follow
  const [peopleToFollow, setPeopleToFollow] = useState([
    {
      id: 1,
      img: "https://i.pinimg.com/564x/9c/f3/4a/9cf34aaa3c3fe3e4a30efab38f657750.jpg",
      name: "Abhishek Temgire",
      isFollowing: false, // Initially, the user is not following
    },
    {
      id: 2,
      img: "https://cdn.pixabay.com/photo/2023/06/20/01/30/ai-generated-8075768_640.jpg",
      name: "John Doe",
      isFollowing: false,
    },
    {
      id: 3,
      img: "https://i.pinimg.com/564x/c0/99/15/c099159849a5f3399e05335f2c56adca.jpg",
      name: "Abhishek Thakur",
      isFollowing: false,
    },

    {
      id: 4,
      img: "https://i.pinimg.com/564x/01/c7/51/01c751482ef7c4f5e93f3539efd27f6f.jpg",
      name: "Adarsh Prakash",
      isFollowing: false,
    },
  ]);

  // Function to handle the Follow button click
  const handleFollowClick = (userId) => {
    const updatedPeopleToFollow = peopleToFollow.map((person) =>
      person.id === userId
        ? { ...person, isFollowing: !person.isFollowing }
        : person
    );

    setPeopleToFollow(updatedPeopleToFollow);

    if (!followingList.includes(userId)) {
      // If the user is not in the following list, add them
      setFollowingList([...followingList, userId]);
    } else {
      // If the user is already in the following list, remove them
      setFollowingList(followingList.filter((id) => id !== userId));
    }
  };

  return (
    <main className="w-full h-max flex flex-col items-center overflow-hidden justify-center">
      <div className="bg-[#fff] overflow-hidden max-media:justify-center justify-center sec-media-min:border-l  max-w-[1556px] flex w-[100%] h-screen">
        <div className="min-media:w-[70%] scroll-smooth overflow-y-scroll min-media:pt-10  pt-5 select-none h-screen">
          {/* //Trending */}
          <div className="flex w-fit h-fit px-4 flex-row">
            <div className="h-6 w-6 rounded-full  border-[#0f0f0f] border-[1.6px]">
              <HiArrowTrendingUp className="h-5 w-5" />
            </div>
            <h1 className="font-semibold ps-2">Trending on Babblr</h1>
          </div>
          <div className="border-b pb-5 pt-3   w-[100%] grid post-min-media:grid-cols-2 grid-cols-1  gap-4">
            {trendingPosts.map((post) => (
              <div
                key={post.id}
                className="flex h-[170px] max-w-lg justify-center w-[100%] items-center flex-row"
              >
                <div className="overflow-hidden min-h-[170px] flex justify-center items-center  min-w-[170px]">
                  <img
                    className="h-[170px] min-h-[170px] min-w-[170px] justify-center object-cover object-center  items-center flex p-2 w-[170px] "
                    src={post.coverimage}
                    alt=""
                  />
                </div>
                <div className="h-[170px] p-2 justify-between flex flex-col items-start max-w-[250px]">
                  <h1 className="text-lg font-semibold text-[#0f0f0f]">
                    {truncateText(post.title, 7)}
                  </h1>
                  <p className="text-sm font-medium">
                    {truncateText(post.description, 7)}
                  </p>
                  <div className="flex flex-row gap-2 items-center">
                    <img
                      className="h-5 w-5 rounded-full"
                      src={post.coverimage}
                      alt=""
                      srcSet=""
                    />
                    <h1 className="text-sm font-semibold">{post.username}</h1>
                  </div>
                  <div className="flex w-full">
                    <div className="flex w-[100%] items-center justify-between">
                      <div className="">
                        <h1 className="text-xs text-[#707070]">
                          {formatTimeAgo(post.createdDate)}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="container w-[100%] h-screen bottombar mx-auto p-4">
            <div className="w-[100%] h-fit rounded-full ">
              {/* <ScrollableTabs tabs={tabs} defaultTab="All" onTabChange={handleTabChange} />
              <div className="mt-4">
                {filteredData.map((item, index) => (
                  <div key={index} className="  border-b  m-0">


                    <div className="flex w-[100%] my-4  h-[150px] flex-row">
                      <div className="overflow-hidden min-h-[150px] min-w-[150px]">
                        <img className="h-[150px] min-h-[150px] min-w-[150px] p-2 w-[150px] object-cover object-center" src="https://images.unsplash.com/photo-1617565817140-53081ee8f047?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1988&q=80" alt="" />
                      </div>
                      <div className="h-[150px] p-2 justify-between flex flex-col items-start">
                        <h1 className="text-base font-semibold text-[#0f0f0f]">Certainly! Here's the code with the provided struggling started..</h1>
                        <p className=" text-xs font-medium">Have you ever found yourself staring at a blank screen struggling to get started or wondering how the best bloggers</p>
                        <div className="flex flex-row gap-2 items-center">
                          <img className="h-5 w-5 rounded-full" src="https://images.unsplash.com/photo-1617565817140-53081ee8f047?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1988&q=80" alt="" srcSet="" />
                          <h1 className="text-xs font-semibold">Abhishek Temgire</h1>
                        </div>
                        <div className="flex w-full">
                          <div className="flex w-[100%] items-center justify-between">
                            <div className=""><h1 className="text-xs text-[#707070]">12-Aug-2023</h1></div>
                            <div className="flex items-end  justify-end">



                              <BsBookmarkCheck />

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>



                  </div>
                ))}
              </div> */}

              {searchTerm ? (
                <div className="flex w-fit py-3 h-fit items-center flex-row">
                  <TbArrowBadgeRightFilled className="h-5 w-5" />
                  <h1 className="font-semibold ps-2">
                    Search Results for &ldquo;{searchTerm}&rdquo;
                  </h1>
                </div>
              ) : (
                <div className="flex w-fit py-3 h-fit items-center flex-row">
                  <TbArrowBadgeRightFilled className="h-5 w-5" />
                  <h1 className="font-semibold ps-2">Latest on Babblr</h1>
                </div>
              )}

              {/* blogsposts */}
              <section
                className={`scrollable-section ${
                  scrollEnabled ? "scroll-enabled" : ""
                } section1 flex lg:col-span-2 justify-center overflow-y-scroll  sec-media:mt-4   `}
              >
                <div>
                  {isLoading ? (
                    <div className="justify-center items-center  flex">
                      <button
                        type="button"
                        className=" flex border px-4 justify-center   items-center rounded-full py-1.5 ..."
                        disabled
                      >
                        <Spinner className="h-5 w-5 mr-3 animate-spin text-gray-900/50" />

                        <h1 className="font-medium text-sm"> Loading...</h1>
                      </button>
                    </div>
                  ) : (
                    blogPosts
                      .filter((post) =>
                        searchTerm
                          ? post.username
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            post.title
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          : true
                      )
                      .map((post) => (
                        <Link
                          key={post._id}
                          href={`/${post.username}/${post.slug}`}
                        >
                          <div className="mobileview  hover:bg-[#1e1e1e0d] active:bg-[#1e1e1e0d] content-between  gap-4 px-3 flex flex-row mb-6 py-3   w-[100%]   border  rounded-xl h-fit max-h-[180px] ">
                            <div className="flex  overflow-hidden h-[150px] max-h-[150px] md:w-[20%] w-[40%] items-center  ">
                              <img
                                className="img-post rounded-md h-full flex justify-center overflow-hidden items-center  object-cover object-center "
                                src={post.coverimage}
                                alt=""
                              />
                            </div>
                            <div className="info md:w-[80%] w-[60%]  max-h-[150px] flex   flex-col ">
                              <div className="m-0 content-between items-start ">
                                <h1 className="title-post font-bold flex-wrap  text-base truncate-title">
                                  {truncateText(post.title, 15)}
                                </h1>
                                <p className="des-post hidden md:block text-[14px] md:text mb-1 truncate-des">
                                  {truncateText(post.description, 25)}
                                </p>
                              </div>

                              <div className="relative flex flex-row items-center gap-x-1">
                                <img
                                  src={post.coverimage}
                                  alt=""
                                  className="h-4 w-4 rounded-full object-cover object-center bg-gray-50"
                                />
                                <div className="text-xs leading-6 flex flex-row justify-center items-center">
                                  <p className="font-medium flex flex-row text-gray-900">
                                    <Link className="font-medium" href="#">
                                      <span className="absolute inset-0" />
                                      {post.username}
                                    </Link>
                                  </p>
                                  {/* <div className="">
                    {post.author.isVerified && (
                      <HiCheckBadge className="text-[#f09bff] ml-2 h-4 w-4" />
                    )}
                  </div>  */}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <div className=" flex-row flex text-sm gap-3 mt-2">
                                  <p className="text-[#0f0f0f] text-xs">
                                    {formatTimeAgo(post.createdDate)}
                                  </p>
                                  <p className="text-[#2c2c2c] flex items-center text-xs ">
                                    •
                                  </p>
                                  <div className="bg-[#ddd] text-center ps-2 pe-2 text-[#1e1e1e] flex rounded-full py-[1.5px] text-xs items-center justify-center ">
                                    <p className="text-center">
                                      {post.category}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                  )}
                </div>
                {/* {loading && <CircularProgress />}
              {!loading && scrollEnabled && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    className="btn-load-more border font-medium text-sm flex rounded-[70px] items-center justify-center pr-4 pl-4 py-2 bg-[#1e1e1e] text-[#ffff]"
                  >
                    Load More
                  </button>
                </div>
              )} */}
              </section>
            </div>
          </div>
        </div>

        <div className="border-l max-media:hidden overflow-hidden max-w-[40%] w-full h-screen">
          <div className="w-[100%] px-4  pt-10 overflow-y-scroll pb-20 h-screen">
            {/* people 
            <div className="bg-white pb-5 px-4 w-full h-auto flex flex-col">
              <div className="flex containers flex-row">
                <div className="h-6 w-6 justify-center items-center flex">
                  <IoPeopleOutline className="h-5 w-5" />
                </div>
                <h1 className="font-semibold ps-2">People to Follow</h1>
              </div>

              <div className="mt-6 gap-4  flex flex-col">
                {peopleToFollow.map((person) => (
                  <div key={person.id} className="justify-between flex">
                    <div className="flex gap-3 justify-start items-center">
                      <img
                        className="h-7 w-7 object-center object-cover rounded-full"
                        src={person.img}
                        alt="Profile"
                      />

                      <h1 className="font-medium text-sm">{person.name}</h1>
                    </div>

                    <div className="flex w-[150px] items-center justify-center">
                      <button
                        onClick={() => handleFollowClick(person.id)}
                        className={`py-2 text-xs justify-center items-center flex font-semibold rounded-full border px-5 text-center ${
                          person.isFollowing
                            ? "bg-[#0f0f0f] shadow-sm text-white"
                            : "border text-[#0f0f0f]"
                        }`}
                      >
                        {person.isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>*/}

            {/* trending 
            <div className="bg-white pt-4 border-t pb-5 w-full h-auto  flex flex-col px-1">
              <div className="flex containers  px-4 flex-row">
                <div className="h-6 w-6 justify-center items-center flex ">
                  <MdAutoGraph className="h-5 w-5" />
                </div>
                <h1 className="font-semibold ps-2">Today top trends</h1>
              </div>

              <div className="px-6 mt-6 gap-4 flex flex-col w-[100%]">
                <div className="gap-1 flex flex-col">
                  <div className="">
                    <h1 className="font-semibold text-base">
                      Be the Person.You Are on Vacation
                    </h1>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <h1 className="font-medium text-xs text-[#9a9797]">By</h1>
                    <img
                      className="h-5 w-5 object-center object-cover rounded-full"
                      src="https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                      alt="Profile"
                    />

                    <h1 className="font-semibold text-xs">Abhishek Temgire</h1>
                  </div>
                </div>

            
        

        

          
              </div>
            </div>*/}

            {/* topics 
            <div className="bg-white pt-4 border-t pb-5 w-full h-auto  flex flex-col px-1">
              <div className="flex containers  px-4 flex-row">
                <div className="h-6 w-6 justify-center items-center flex ">
                  <TbArrowBadgeRightFilled className="h-5 w-5" />
                </div>
                <h1 className="font-semibold ps-2">Topics for you</h1>
              </div>
              <div className="w-[100%] gap-2 flex mt-6 mx-2 flex-wrap">
                <button className="py-1 text-sm rounded-full font-medium  border px-5 whitespace-nowrap   text-[#0f0f0f]">
                  Technology
                </button>
                <button className="py-1 text-sm rounded-full font-medium  border px-5 whitespace-nowrap   text-[#0f0f0f]">
                  Finance
                </button>
                <button className="py-1 text-sm rounded-full font-medium  border px-5 whitespace-nowrap   text-[#0f0f0f]">
                  Education
                </button>
                <button className="py-1 text-sm rounded-full font-medium  border px-5 whitespace-nowrap   text-[#0f0f0f]">
                  Marketing
                </button>
                <button className="py-1 text-sm rounded-full font-medium  border px-5 whitespace-nowrap   text-[#0f0f0f]">
                  Health
                </button>
                <button className="py-1 text-sm rounded-full font-medium  border px-5 whitespace-nowrap   text-[#0f0f0f]">
                  Gaming
                </button>
                <button className="py-1 text-sm rounded-full font-medium  border px-5 whitespace-nowrap   text-[#0f0f0f]">
                  Cryptocurrency
                </button>
                <button className="py-1 text-sm rounded-full font-medium  border px-5 whitespace-nowrap   text-[#0f0f0f]">
                  Fitness
                </button>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    </main>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
