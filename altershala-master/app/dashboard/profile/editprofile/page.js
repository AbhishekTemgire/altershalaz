"use client";
import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@material-tailwind/react";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { imageDb } from "../../../context/firebaseauth";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { Toaster, toast } from "react-hot-toast";
import { useSnackbar } from "notistack";
import { useToasterStore } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const Page = () => {

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This code will only run on the client side
      const savedImage = localStorage.getItem("selectedImage");
      if (savedImage) {
        setImg(new File([new Blob()], savedImage));
      }

      listAll(ref(imageDb, "files"))
        .then((imgs) => {
          const urlPromises = imgs.items.map((val) => getDownloadURL(val));
          return Promise.all(urlPromises);
        })
        .then((urls) => {
          setImgUrl((data) => [...data, ...urls]);
        })
        .catch((error) => {
          toast.error("Error fetching image URL");
        });
    }
  }, []); 



  useEffect(() => {
    if (typeof window !== "undefined") {
    const token = Cookies.get("token");

    if (token) {
      const decodedToken = jwt_decode(token);

      const { username } = decodedToken;

      axios

        .get(`http://localhost:8080/api/user/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        .then((response) => {
          const userData = response.data;

          setFormData({
            firstName: userData.firstName,

            lastName: userData.lastName,

            username: userData.username,

            email: userData.email,

            phonenumber: userData.phonenumber,

            address: userData.address,

            city: userData.city,

            country: userData.country,

            zipcode: userData.zipcode,

            bio: userData.bio,

            profileimg:userData.profileimg,
          });
        })

        .catch((error) => {
          console.error("Error fetching user data:", error);

          toast.error("Error fetching user data...");
        });
    }
  }
  }, []);


  useEffect(() => {
    
    const handleTabReload = (e) => {
      handleClear();
    };

    window.addEventListener("beforeunload", handleTabReload);

    return () => {
      window.removeEventListener("beforeunload", handleTabReload);
    };
  }, []);


  const [selectedImage, setSelectedImage] = useState(null);
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [finalImageUrl, setFinalImageUrl] = useState("");
  const [formData, setFormData] = useState({
   
    firstName: "",

    lastName: "",

    username: "",

    email: "",

    phonenumber:"",

    address: "",

    city: "",

    country: "",

    zipcode: "",

    bio: "",

    password:"",
   
    profileimg:"",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageHover = (event) => {
    setIsHovered(true);
  };

  const handleImageLeave = (event) => {
    setIsHovered(false);
  };


  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = Cookies.get("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      const response = await axios.put(
        `http://localhost:8080/api/updateuser/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        console.log("User details updated successfully:", data);
        toast.success("User Updated successfully...!");
      } else {
        console.error("Error updating user details:", data.error);
        toast.error("Error updating user details...");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred...");
    }
  };

  
  const handleClear = () => {
    setImg(null);
    localStorage.removeItem("selectedImage");
  };


  const handleImageSelection = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImg(selectedImage);
      localStorage.setItem("selectedImage", selectedImage);

      const imgRef = ref(imageDb, `files/${v4()}`);

      const uploadingToastId = toast.loading("Uploading...", {
        duration: 999999,
        spinner: true,
      });

      setIsUploading(true);

      uploadBytes(imgRef, selectedImage)
        .then((value) => {
          getDownloadURL(value.ref).then((url) => {
            setImgUrl((data) => [...data, url]);
            setIsUploading(false);
            toast.dismiss(uploadingToastId);
            toast.success("Image uploaded successfully");
          
            setFinalImageUrl(url);
          
            // Set the profile image URL in formData
            setFormData(prevData => ({ ...prevData, profileimg: url }));
          });
        })
        .catch((error) => {
          setIsUploading(false);

          toast.dismiss(uploadingToastId);
          toast.error("Error uploading image");
        });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#ffff]">
   
      <div className="w-full lg:w-1/3 h-[350px] rounded-3xl shadow-lg border border-gray-300 flex-shrink-0 p-4 ml-4">
        <div
          className="w-24 flex justify-center rounded-full bg-slate-600 text-center h-24 ml-[38%] mt-12 border-4 border-slate-900"
          onClick={handleImageClick}
          onMouseEnter={handleImageHover}
          onMouseLeave={handleImageLeave}
          style={{ cursor: "pointer" }}
        >
          {img || formData.profileimg ? (
            <div className=" w-22 h-22 justify-center items-center p-0 m-0 flex inset-0 bg-black rounded-full">
              <img
                src={img ? URL.createObjectURL(img) : formData.profileimg}
                
                className="w-full h-full justify-center items-center flex  object-cover object-center  rounded-full"
                alt="Uploaded Preview"
               
              />
            </div>
          ):
         (
            <div
              className="w-full flex justify-center items-center h-full rounded-full"
              style={{
                transition: "transform 0.2s ease-in-out",

                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            >
              {isHovered ? (
                <div className="flex flex-col items-center justify-center opacity-75">
                  <div className="p-4 flex flex-col items-center justify-center">
                    <FaCamera
                      size={24}
                      color="white"
                      className="text-white text-xl mb-2"
                    />

                    <p className="text-white text-xs">Update Photo</p>
                  </div>
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 61.8 61.8"
                  id="avatar"
                >
                  <g data-name="Layer 2">
                    <g data-name="—ÎÓÈ 1">
                      <circle
                        cx="30.9"
                        cy="30.9"
                        r="30.9"
                        fill="#e9573e"
                      ></circle>

                      <path
                        fill="#f9dca4"
                        fill-rule="evenodd"
                        d="M23.255 38.68l15.907.149v3.617l7.002 3.339-15.687 14.719-13.461-15.34 6.239-2.656V38.68z"
                      ></path>

                      <path
                        fill="#677079"
                        fill-rule="evenodd"
                        d="M53.478 51.993A30.813 30.813 0 0 1 30.9 61.8a31.226 31.226 0 0 1-3.837-.237A34.071 34.071 0 0 1 15.9 57.919a31.034 31.034 0 0 1-7.856-6.225l1.283-3.1 11.328-5.054c.875 4.536 4.235 11.535 10.176 15.502a24.128 24.128 0 0 0 11.057-15.318l10.063 4.903z"
                      ></path>

                      <path
                        fill-rule="evenodd"
                        d="M39.791 42.745c.728.347 1.973.928 2.094.999-2.03 6.368-15.72 8.7-19.756-.756z"
                        opacity=".11"
                      ></path>

                      <path
                        fill="#ffe8be"
                        fill-rule="evenodd"
                        d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.266 0-21.281-35.266 0-35.266z"
                      ></path>

                      <path
                        fill="#f9dca4"
                        fill-rule="evenodd"
                        d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.974 31.974 0 01-1.472-7.658zM44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 001.471-7.658z"
                      ></path>

                      <path
                        fill="#ad835f"
                        fill-rule="evenodd"
                        d="M23.396 15.437c-.592 2.768-.384 5.52-3.008 6.028-.624.12-1.037.965-1.172 1.71a22.896 22.896 0 00-.38 4.931c.104.569-.396-1.092-.396-1.092l-.085-3.174s-.037-.608-.023-1.535c.03-1.88.244-4.928 1.196-5.86 1.421-1.39 3.868-1.008 3.868-1.008zM39.095 15.437c.592 2.768.385 5.52 3.008 6.028.624.12 1.038.965 1.172 1.71a21.808 21.808 0 01.312 4.947c-.105.57.395-1.092.395-1.092l.166-3.178s.025-.62.01-1.547c-.028-1.88-.242-4.928-1.195-5.86-1.421-1.39-3.868-1.008-3.868-1.008z"
                      ></path>

                      <path
                        fill="#60350a"
                        fill-rule="evenodd"
                        d="M25.364 46.477c-1.51-1.457-2.718-2.587-3.814-3.718-1.405-1.451-1.881-2.922-2.154-5.498a110.846 110.846 0 01-1.043-13.43s1.034 6.333 2.962 9.455c.99 1.603 5.04-2.165 6.655-2.738a2.683 2.683 0 013.24.782 2.636 2.636 0 013.213-.782c1.616.573 5.61 3.792 6.656 2.738 2.515-2.536 3.057-9.446 3.057-9.446a113.885 113.885 0 01-1.129 13.576c-.363 2.746-.547 3.81-1.486 4.884a30.775 30.775 0 01-4.57 4.193c-.828.656-2.267 1.272-5.933 1.25-3.406-.02-4.803-.446-5.654-1.267zM39.604 15.997a2.638 2.638 0 012.76 1.227c1.556 2.613 1.685 2.95 1.685 2.95s-.184-4.674-.295-5.23a.697.697 0 01.973.028c.11.222-.444-4.7-3.335-5.644-1.057-3.002-4.754-5.226-4.754-5.226l-.167 1.668a6.056 6.056 0 00-5.265-4.145c.667.751.507 1.3.507 1.3a8.152 8.152 0 00-3.288-.632c.14.889-.889 1.835-.889 1.835s-.639-.974-3.169-1.307c-.445 1.612-1.28 1.89-2.085 2.641a18.92 18.92 0 00-1.861 2.224s.083-1.557.639-2.002c.209-.138-4.716 1.803-2.252 9.036a1.962 1.962 0 00-1.945 1.462c1.39.389.815 2.49 1.593 3.852.547-1.58.909-4.658 4.328-3.852 2.448.577 4.798 1.814 7.62 1.913 3.987.139 5.501-1.954 9.2-2.098z"
                      ></path>

                      <path
                        fill="#ffe8be"
                        fill-rule="evenodd"
                        d="M32.415 38.594a2.774 2.774 0 0 0 2.214-.588c.72-.83 1.307-2.009.215-2.643a8.583 8.583 0 0 0-3.581-1.472 8.595 8.595 0 0 0-3.604 1.47c-1.34.775-.52 1.815.201 2.645a2.774 2.774 0 0 0 2.214.588c-.811-2.824 3.153-2.824 2.341 0z"
                      ></path>
                    </g>
                  </g>
                </svg>
              )}
            </div>
          ) }
        </div>

        <label
          htmlFor="imageInput"
          className="block text-center mt-4 text-gray-600"
        >
          Select an Image
        </label>

        <input
          type="file"
          id="imageInput"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelection}
        />
      </div>

      <div className="w-full lg:w-2/3 max-media:pb-52 rounded-3xl shadow-lg border border-gray-300 p-4 mt-4 lg:mt-0 ml-4 flex flex-col h-auto">
      <form action="post">
          <div className="flex flex-wrap mx-0 mt-6">
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <TextField
                label={<span style={{ fontWeight: "600" }}>First Name</span>}
                id="outlined-size-normal"
                fullWidth
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-6">
              <TextField
                label={<span style={{ fontWeight: "600" }}>Last Name</span>}
                id="outlined-size-normal"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-6">
              <TextField
                label={<span style={{ fontWeight: "600" }}>Username</span>}
                id="outlined-size-normal"
                name="username"
                value={formData.username}
                fullWidth
                required
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-6">
              <TextField
                label={<span style={{ fontWeight: "600" }}>Email Address</span>}
                id="outlined-size-normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-6">
              <TextField
                label={<span style={{ fontWeight: "600" }}>Phone Number</span>}
                id="outlined-size-normal"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-6">
              <TextField
                label={<span style={{ fontWeight: "600" }}>Address</span>}
                id="outlined-size-normal"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-6">
              <TextField
                label={<span style={{ fontWeight: "600" }}>City</span>}
                id="outlined-size-normal"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-6">
              <TextField
                label={<span style={{ fontWeight: "600" }}>Country</span>}
                id="outlined-size-normal"
                name="country"
                value={formData.country}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-6">
              <TextField
                label={
                  <span style={{ fontWeight: "600" }}>ZipCode / PinCode</span>
                }
                id="outlined-size-normal"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-6">
              <TextField
                label={
                  <span style={{ fontWeight: "600" }}>Change Password</span>
                }
                id="outlined-size-normal"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>

            <div className="w-full px-2 mb-6 ">
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label={<span style={{ fontWeight: "600" }}>Bio</span>}
                multiline
                rows={4}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                sx={{ borderRadius: "15px" }}
              />
            </div>

            <div className="w-full flex justify-end mt-4">
              <Button
                variant="contained"
                onClick={handleSaveChanges}
                className="flex justify-end text-white font-semibold bg-slate-700 hover:bg-gray-600 hover:cursor-pointer"
              >
                Save Changes
              </Button>
            </div>
          </div>
          </form>
      </div>
      
    </div>
  );
};

export default dynamic(() => Promise.resolve(Page), { ssr: false });