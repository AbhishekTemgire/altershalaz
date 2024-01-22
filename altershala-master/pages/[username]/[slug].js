"use client";
import dynamic from "next/dynamic";
import Layout from "@/app/components/layout";
import { useRouter } from "next/router";
import { PiHandsClappingThin, PiHandsClappingFill } from "react-icons/pi";
import { CiShare1 } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import Link from "next/link";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdOutlineReportGmailerrorred } from "react-icons/md";
import user from "../../app/assets/user.png";
import axios from "axios";
import ProfileImage from "@/app/context/useProfileImage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BlogPostDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [commentError, setCommentError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [token, setToken] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const router = useRouter();
  const { username, slug } = router.query;

  useEffect(() => {
    let timer;
    if (username && slug) {
      timer = setTimeout(() => {
        fetch(`http://localhost:8080/api/${username}/${slug}`)
          .then((response) => response.json())
          .then(async (data) => {
            if (data.blogPost) {
              data.blogPost.coverimage = await loadImage(
                data.blogPost.coverimage
              );
              setPost(data.blogPost);
            } else {
              setPost(null);
            }

            setIsLoading(false);
          })
          .catch((error) => {
            console.error("h fetching blog post:", error);
            setPost(null);
            setIsLoading(false);
          });
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [username, slug]);

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

  useEffect(() => {
    const userLiked =
      post && post.likes.some((like) => like.user === loggedInUserId);
    setLiked(userLiked);

    fetchInitialLikeCount();
  }, [post, loggedInUserId]);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setToken(savedToken);
      const decodedToken = jwt_decode(savedToken);
      setLoggedInUsername(decodedToken.username);
      setLoggedInUserId(decodedToken.userId);
    }
    fetchComments();
  }, [username, slug]);

  const loadImage = async (url) => {
    const image = new Image();
    image.src = url;
    await new Promise((resolve) => {
      image.onload = resolve;
      image.onerror = resolve;
    });
    return url;
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

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/${username}/${slug}/comments`
      );
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      } else {
        console.error("h fetching comments:", response.statusText);
      }
    } catch (error) {
      console.error("h fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
      setCommentError("Comment is required.");
      return;
    }

    setCommentError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/${username}/${slug}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: newComment,
            userId: loggedInUserId,
            usernames: loggedInUsername,
          }),
        }
      );
      if (response.ok) {
        fetchComments();
        setNewComment("");
      } else {
        console.error("Error submitting comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/${username}/${slug}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );
      if (response.ok) {
        fetchComments();
      } else {
        console.error("Error deleting comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const fetchInitialLikeCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/${username}/${slug}/like-count`
      );
      if (response.status === 200) {
        setLikeCount(response.data.likeCount);
      }
    } catch (error) {
      console.error("Error fetching initial like count:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/${username}/${slug}/like`,
        {
          userId: loggedInUserId,
        }
      );

      if (response.status === 200) {
        setLiked((prevLiked) => !prevLiked);

        setLikeCount(response.data.likeCount);
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  };

  const [trendingPosts, setTrendingPosts] = useState([]);

  const [following, setFollowing] = useState(false);

  const updateFollowingStatus = (username, following) => {
    const followingStatus =
      JSON.parse(localStorage.getItem("followingStatus")) || {};
    followingStatus[username] = following;
    localStorage.setItem("followingStatus", JSON.stringify(followingStatus));
  };

  const toggleFollowStatus = async () => {
    try {
      if (following) {
        await axios.post(
          `http://localhost:8080/api/unfollow/${loggedInUsername}/${username}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFollowing(false);
      } else {
        await axios.post(
          `http://localhost:8080/api/follow/${loggedInUsername}/${username}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFollowing(true);
      }
  
      updateFollowingStatus(username, !following);
    } catch (error) {
      if (error.response && error.response.status === 401) {

       router.push('/auth/login');
      } else {
        console.error("Error:", error);
      }
    }
  };
  
  useEffect(() => {
    const followingStatus =
      JSON.parse(localStorage.getItem("followingStatus")) || {};
    setFollowing(followingStatus[username] || false);

    axios
      .get(
        `http://localhost:8080/api/checkFollowStatus/${loggedInUsername}/${username}`
      )
      .then((response) => {
        setFollowing(response.data.isFollowing);
      })
      .catch((error) => {
        console.error("Error fetching follow status:", error);
      });
  }, [loggedInUsername, username]);

  return (
    <Layout>
      <div className="text-white justify-center items-center flex h-screen w-[100%]">
        <div className="text-[#1e1e1e] items-center flex pt-0 flex-col justify-center h-screen w-[100%]">
          <div className="max-w-[700px] w-[100%] text-[#1e1e1e] gap-5   flex flex-col h-screen ">
            {isLoading ? (
              <div className="justify-center items-center h-screen flex">
                <div className=" flex border px-3 py-1.5 justify-center   items-center rounded-full ">
                  <Spinner className="h-5 w-5 mr-3 animate-spin  text-gray-900/50" />

                  <h1 className="font-medium text-sm"> Loading...</h1>
                </div>
              </div>
            ) : post ? (
              <>
                <h1 className="text-3xl max-w-[600px] font-extrabold">
                  {post.title}
                </h1>
                <div className="justify-between items-start flex">
                  <div className=" flex flex-row items-center gap-2">
                    <ProfileImage
                      username={post.username}
                      className="h-8 w-8 rounded-full object-cover object-center bg-gray-50"
                    />
                    <div className="flex flex-row justify-center items-center">
                      <p className="flex flex-col text-gray-900">
                        <div className="font-medium text-sm">
                          <span className="absolute " />
                          {username}
                        </div>
                        <div className="font-medium flex flex-row w-[100%] text-xs">
                          <p className="font-semibold">Posted: </p>
                          <span className="px-1">
                            {" "}
                            {formatTimeAgo(post.createdDate)}
                          </span>
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <div
                      className={`cursor-pointer text-sm px-4 py-1 rounded-full mt-2 hover:bg-[#1e1e1e] hover:text-[#fff] ${
                        following
                          ? "bg-[#1e1e1e] text-white border "
                          : "bg-transparent text-black border "
                      }`}
                      onClick={toggleFollowStatus}
                    >
                      {following ? "Unfollow" : "Follow"}
                    </div>
                  </div>
                </div>

                <div className="">
                  <img
                    src={
                      post.coverimage ||
                      "https://firebasestorage.googleapis.com/v0/b/babblr-blog.appspot.com/o/user.png?alt=media&token=21a2ba4c-49bf-45ab-a088-e395951f4b0e"
                    }
                    alt=""
                    className=" aspect-[16/9]  transition-transform rounded-sm object-cover object-center bg-gray-50"
                  />
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

                {/* likes and share */}

                <div className="border-t border-b w-[100%]">
                  <div className="h-10 flex flex-row justify-between items-center">
                    <div className="flex">
                      <div className="flex w-24 items-center justify-center">
                        <div
                          className={`rounded-full hover:bg-[#dddddd7e] p-1 cursor-pointer ${
                            liked ? "text-blue-500" : ""
                          }`}
                          onClick={handleLikeClick}
                        >
                          {liked ? (
                            <PiHandsClappingFill className="h-5 w-5" />
                          ) : (
                            <PiHandsClappingThin className="h-5 w-5" />
                          )}
                        </div>
                        <div className="ml-1 text-sm">
                          {likeCount} Like{likeCount !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-full hover:bg-[#dddddd7e] p-1">
                      <CiShare1 className="h-[18px] w-[18px]" />
                    </div>
                  </div>
                </div>

                <div className="font-semibold">Comments</div>
                <div className="comment-container mt-4">
                  <div className="bg-gray-100 p-4 rounded border">
                    <textarea
                      required
                      placeholder="Write your comment here..."
                      className={`w-full text-stone-950 text-sm border rounded p-2 focus:outline-none ${
                        commentError ? "border-red-500" : ""
                      }`}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />

                    {commentError && (
                      <p className="text-red-500 text-xs mt-1">
                        {commentError}
                      </p>
                    )}
                    <button
                      className="bg-[#1e1e1e] text-white text-sm px-4 py-1 rounded-full mt-2 hover:bg-[#1e1e1e]"
                      onClick={handleCommentSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 border-gray-200 pt-5 sm:mx-0 sm:max-w-none  third-min-media:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                  {trendingPosts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/${post.username}/${post.slug}`}
                    >
                      <div
                        style={{ userSelect: "none" }}
                        className="flex-row justify-between mx-auto hover:bg-[#1e1e1e0d] active:bg-[#1e1e1e0d] flex mt- card w-[100%] ps-4 pe-4 h-screen max-w-[400px] border max-h-[130px]"
                      >
                        <div className="info justify-center content-between max-w-[70%] flex flex-col flex-wrap">
                          <div className="relative flex items-center gap-x-2">
                            <ProfileImage
                              username={post.username}
                              className="h-5 w-5 rounded-full object-cover object-center bg-gray-50"
                            />

                            <div className="text-sm leading-6 flex flex-row justify-center items-center">
                              <p className="font-medium text-gray-900">
                                <a>
                                  <span className="absolute inset-0" />
                                  {post.username}
                                </a>
                              </p>
                              <div className="">
                                {/* {post.author.isVerified && (
                                  <HiCheckBadge className="text-[#f09bff] ml-2 h-4 w-4" />
                                )} */}
                              </div>
                            </div>
                          </div>
                          <div className="mt-1">
                            <h1 className="font-semibold text-base">
                              {truncateText(post.title, 6)}
                            </h1>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex flex-row  text-sm gap-3 mt-2">
                              <p className="text-[#0f0f0f] text-xs">
                                {formatTimeAgo(post.createdDate)}
                              </p>
                              <p className="text-[#2c2c2c] flex items-center text-xs ">
                                •
                              </p>
                              <div className="bg-[#f09bff] text-center ps-2 pe-2 text-[#ffff] flex rounded-full py-[1.5px] text-xs items-center justify-center ">
                                <p className="text-center">{post.category}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="img flex items-center justify-end">
                          <img
                            className=" w-[85px] h-[85px]  object-cover object-center rounded-lg"
                            src={post.coverimage}
                            alt=""
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Render existing comments */}

                <div className="mt-4 p-4 bg-[#fff] rounded border">
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      className="flex pt-2 pb-4 justify-between border-b"
                    >
                      <div className="flex">
                        <div className="w-9 h-9 flex overflow-hidden rounded-full">
                          <ProfileImage
                            username={comment.usernames}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-2">
                          <div className="flex items-center gap-2">
                            <h6 className="text-sm font-semibold">
                              {comment.usernames}
                            </h6>
                            <span className="text-gray-500 text-xs">
                              {formatTimeAgo(comment.date)}
                            </span>
                          </div>
                          <p className="text-xs font-medium mt-2 px-4 bg-gray-100 border max-w-2xl w-fit flex-wrap rounded-lg py-[2px]">
                            {comment.content}
                          </p>
                        </div>
                      </div>

                      <Menu
                        as="div"
                        className="relative  inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5  bg-gray-100 px-1 py-1 rounded-full text-sm font-semibold text-gray-900 border hover:bg-gray-50">
                            <BsThreeDotsVertical />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 cursor-pointer z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      " px-4 py-1 flex justify-between items-center"
                                    )}
                                  >
                                    <span>
                                      <MdOutlineReportGmailerrorred className="text-base" />
                                    </span>{" "}
                                    <span className="text-sm">Report</span>
                                  </a>
                                )}
                              </Menu.Item>
                              {loggedInUserId === comment.userId && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      onClick={() =>
                                        handleDeleteComment(comment._id)
                                      }
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        " px-4 py-1 flex justify-between items-center"
                                      )}
                                    >
                                      <span>
                                        <MdDelete className="text-base" />
                                      </span>{" "}
                                      <span className="text-sm">Delete</span>
                                    </a>
                                  )}
                                </Menu.Item>
                              )}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  ))}
                </div>

                <div className="fixed bottom-20   p-10 left-1/2 transform -translate-x-1/2 justify-center items-center flex"></div>

                <div className="w-[100%] ">
                  <div className=" flex p-4 border-t items-center justify-between content-between ">
                    <div class="flex gap-10 text-xs font-normal">
                      <Link href="/">
                        <span className="text-zinc-900 hover:text-blue-700">
                          Help
                        </span>
                      </Link>
                      <Link href="/privacy">
                        <span className="text-zinc-900 hover:text-blue-700">
                          Privacy
                        </span>
                      </Link>

                      <Link href="/terms">
                        <span className="text-zinc-900 hover:text-blue-700">
                          Terms
                        </span>
                      </Link>

                      <Link href="/AboutUs">
                        <span className="text-zinc-900 hover:text-blue-700">
                          About
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="justify-center items-center flex">
                Blog post not found
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(BlogPostDetail), { ssr: false });
