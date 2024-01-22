"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BottomBar from "../components/BottomBar";
import { SnackbarProvider } from "notistack";
import PrivateRoute from "../context/PrivateRoute";
import PrivateRoutes from "../middleware/privateRoutes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { isAuthenticated } from "../middleware/auths";
import { SearchProvider } from "../context/SearchContext";
import Drawer from "../components/Drawer";
import dynamic from "next/dynamic";




 function Layout({ children }) {

  const router = useRouter();


  if (!isAuthenticated() && router.pathname !== '/login') {

    router.push('/auth/login');
  }

  const [isDrawerOpen,setDrawerOpen]=useState(false);

  const openDrawer=() =>{
    setDrawerOpen(true);
  };

  const closeDrawer=()=>{
    setDrawerOpen(false);
  };

  const customNotifications = [
    {
      id: 1,
      title: "Abhishek Thakur",
      action: "like", // Change action
      target: "blog", // Change target
      timestamp: "July 10, 2023",
      profileimg:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    },
    {
      id: 2,
      title: "Abhishek Temgire",
      action: "comment", // Change actiona
      target: "blog", // Change target
      timestamp: "July 22, 2023",
      profileimg:
        "https://images.unsplash.com/photo-1617565817140-53081ee8f047?ixlib=rb-4.0.3&ixid=M3xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1988&q=80",
    },
    {
      id: 3,
      title: "Adarsh Prakash",
      action: "follow", // Change action
      target: "profile", // Change target
      timestamp: "Aug 1, 2023",
      profileimg:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    },

    {
      id: 4,
      title: "John Doe",
      action: "like", // Change action
      target: "blog", // Change target
      timestamp: "Aug 2, 2023",
      profileimg:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    },

  ];


  return (

    <div className="w-[100%] h-screen">
      <SearchProvider>
      <Sidebar openDrawer={openDrawer} >
          <Header>
            <BottomBar>
              <main>{children}</main>
            </BottomBar>
          </Header>
        </Sidebar>
        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} notifications={customNotifications} />
      </SearchProvider>
    </div>

  );
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
