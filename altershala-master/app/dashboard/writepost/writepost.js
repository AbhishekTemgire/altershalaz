"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import jwt_decode from "jwt-decode";
import Select from "react-select";
import { imageDb } from "../../context/firebaseauth";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; 
import Cookies from "js-cookie";
import dynamic from "next/dynamic";


const options = [
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Education", label: "Education" },
  { value: "Marketing", label: "Marketing" },
  { value: "Health", label: "Health" },
  { value: "Gaming", label: "Gaming" },
  { value: "Cryptocurrency", label: "Cryptocurrency" },
  { value: "Travel", label: "Travel" },
  { value: "Sports", label: "Sports" },
  { value: "Food", label: "Food" },
];

const DynamicReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
  });
  
  const WritePost_Page = () => {
    const editorRef = useRef(null);
    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [metatitle, setMetattitle] = useState("");
    const [metadescription, setMetadescription] = useState("");
    const [metakeywords, setMetakeywords] = useState("");
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [editorHtml, setEditorHtml] = useState("");
    const [finalImageUrl, setFinalImageUrl] = useState("");

   
  useEffect(() => {
    if (typeof window !== "undefined") {
      handleClear();
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

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const handleKeywordChange = (selectedOptions) => {
    setSelectedKeywords(selectedOptions);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/auth/login");
      }
    }
  }, []);



  const handleSubmit = async () => {
    if (
      !title ||
      !description ||
      !metatitle ||
      !metadescription ||
      !metakeywords ||
      selectedKeywords.length === 0 ||
      !editorHtml ||
      !finalImageUrl
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const keywordsText = selectedKeywords.map((kw) => kw.value).join(", ");

    const token = Cookies.get("token");  
  const decodedToken = jwt_decode(token);
  const { userId, username } = decodedToken;


    const formData = {
      userId: userId,
      username: username,
      title: title,
      category: keywordsText,
      content: editorHtml,
      coverimage: finalImageUrl,
      description: description,
      metakeywords: metakeywords,
      metadescription: metadescription,
      metatitle: metatitle,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/blog-posts",
        formData,
        {
          headers,
        }
      );

      if (response.status === 201) {
        toast.success("Blog post created successfully!");
        router.push("/dashboard");
      } else {
        toast.error("An error occurred while creating the blog post.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the blog post.");
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
          });
        })
        .catch((error) => {
          setIsUploading(false);

          toast.dismiss(uploadingToastId);
          toast.error("Error uploading image");
        });
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      boxShadow: "none",
      height: "45px",
      color: "#edf2f7",
      borderColor: "#e5e7eb",
      borderRadius: "6px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#F0F0F0" : "white",
      color: "#333",
      fontWeight: "600",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#a5f3fc",
      borderRadius: "5px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#4338ca",
      backgroundColor: "##7dd3fc",
      borderRadius: "5px",
      fontWeight: "600",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      color: "#4338ca",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#4338ca",
      },
    }),
  };

  const customComponents = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  };

  return (
    <div className="flex justify-center w-full items-center overflow-y-scroll flex-col h-screen bg-[#ffff]">
      <Toaster />
    
        <div className=" p-5 mb:p-10 text-sm flex-col pb-20 overflow-y-scroll md:flex  md:flex-row  gap-5 flex h-auto w-full">
          <div className="w-full h-fit md:mb-10 pt-2 md:w-3/6 bg-white shadow-lg shadow-[#1e1e1e0b] rounded-xl border">
            <div class="p-3 px-4">
              <h1 className="font-semibold text-[#1e1e1e] text-lg">Details</h1>
              <p className="text-[#707070] pt-1">
                Title, short description, image...
              </p>
            </div>
            <div class="p-3 px-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                class="border rounded-md py-3.5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Post Title"
              />
            </div>

            <div class="p-3 px-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                class="border rounded-md py-3.5 px-3 w-full h-24 resize-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Description"
              ></textarea>
            </div>

            <div class="p-3 px-4">
              <h1 className="font-semibold text-sm">Blog Content</h1>
              <div className="min-h-full mt-4 relative">
                 <DynamicReactQuill
                  className=""
                  ref={editorRef}
                  theme="snow"
                  value={editorHtml}
                  onChange={handleEditorChange}
                  placeholder="Write something awesome..."
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ indent: "-1" }, { indent: "+1" }],
                      [{ align: [] }],
                      ["link"],

                      ["clean"],
                      [{ color: [] }],

                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false], label: "Heading" }],
                      ["direction"],
                      ["code-block"],

                      ["image"],
                      ["video"],
                      ["code"],
                      ["inline-code"],
                      ["list"]["blockquote"],
                    ],
                  }}
                />
              </div>
            </div>

            <div class="p-3  px-4">
              <h1 className="font-semibold">Cover</h1>
              <div className="min-h-[200px] pb-2 mt-4 relative">
                <div class="container mx-auto  border border-dashed rounded-lg bg-gray-100 relative overflow-hidden">
                  <div className="cards flex flex-col w-[100%] h-[200px]  justify-center items-center ">
                    <div className="flex flex-col justify-center items-center gap-4 z-20 bg-transparent inset-0">
                      <div className="flex">
                        <label
                          htmlFor="imageInput"
                          className="border text-[#1e1e1e] border-dashed border-spacing-2 border-zinc-400 h-fit w-fit flex justify-center items-center font-bold py-2 px-4 rounded-lg cursor-pointer focus:outline-none focus:shadow-outline bg-white"
                        >
                          Choose Image
                        </label>
                        <div>
                          <input
                            required
                            type="file"
                            id="imageInput"
                            style={{ display: "none" }}
                            onChange={handleImageSelection}
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </div>

                    {img && (
                      <div className="absolute w-full h-full justify-center items-center p-0 m-0 flex inset-0 bg-black">
                        <img
                          src={URL.createObjectURL(img)}
                          className="w-full justify-center items-center flex h-full object-cover object-center"
                          alt="Uploaded Preview"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mb-40  flex flex-col  md:w-3/6">
            <div className="w-[100%] h-fit pt-2 bg-white shadow-lg shadow-[#1e1e1e0b] rounded-xl border">
              <div class="p-3 px-4">
                <h1 className="font-semibold text-[#1e1e1e] text-lg">
                  Properties
                </h1>
                <p className="text-[#707070] pt-1">
                  Additional functions and attributes...
                </p>
              </div>

              <div class="p-3 px-4">
                <div className="relative text-sm">
                  <Select
                    options={options}
                    isMulti
                    value={selectedKeywords}
                    onChange={handleKeywordChange}
                    isSearchable
                    className="w-full h-[43px] text-[#edf2f7]"
                    styles={customStyles}
                    components={customComponents}
                    placeholder="Blog Category"
                  />
                </div>
              </div>

              <div class="p-3 px-4">
                <input
                  name="metatitle"
                  type="text"
                  value={metatitle}
                  onChange={(e) => setMetattitle(e.target.value)}
                  class="border rounded-md py-3.5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Meta Title"
                />
              </div>

              <div class="p-3 px-4">
                <textarea
                  value={metadescription}
                  onChange={(e) => setMetadescription(e.target.value)}
                  name="metadescription"
                  class="border rounded-md py-3.5 px-3 w-full h-24 resize-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Meta Description"
                ></textarea>
              </div>

              <div class="p-2 pb-4 px-4">
                <input
                  name="metakeywords"
                  value={metakeywords}
                  onChange={(e) => setMetakeywords(e.target.value)}
                  type="text"
                  class="border rounded-md py-3.5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Meta Keywords"
                />
              </div>
            </div>
            <div className="justify-center md:justify-end flex mt-4">
              {" "}
              <button
                className="mt-2 bg-[#0F0F0F] text-base  text-white font-semibold py-3 px-7 rounded-[6px] "
                onClick={handleSubmit}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default WritePost_Page;
