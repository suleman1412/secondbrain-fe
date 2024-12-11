import {  useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./ui/Sidebar";
import { useFetchContent } from "./hooks/useFetchContent";
import Content from "./Content";
import { allContentAtom, filteredContentAtom, isLoggedIn, shareLink } from "./recoil/atoms";

const Dashboard = () => {
  const token = localStorage.getItem("token") || "";
  const [userLogin, setUserLogin] = useRecoilState(isLoggedIn);
  const setShareLink = useSetRecoilState(shareLink)
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const setDisplayedContent = useSetRecoilState(filteredContentAtom)
  const contentstore = useRecoilValue(allContentAtom)
  const fetchContent = useFetchContent();

  const [sideOpen, setSideOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [shareModal, setShareModal] = useState(false)
  
  useEffect(() => {
    if(userLogin && token){
        fetchContent()
    } 
  }, [userLogin]);

  const onLogout = () => {
    setUserLogin(false)
    localStorage.removeItem('token')
  }

  const handleShareLink = async () => {
    setIsLoading(true);
    setShareModal(true)
    try {
      const response = await axios.post(
        `${BASE_URL}/brain/share`,
        { share: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const hashedString = response.data.link;
      setShareLink(`${import.meta.env.VITE_FRONTEND_URL}/shared/${hashedString}`);
    } catch (error) {
      console.error("Failed to generate share link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sidebar 
        isOpen={sideOpen} 
        toggleSidebar={() => setSideOpen((prev) => !prev)} 
        contentStore={contentstore}
        setDisplayedContent={setDisplayedContent}
        showLogout={true}
        onLogout={onLogout}
      />
      <div className="flex flex-col min-h-screen mx-auto max-w-7xl">
        <Content 
          handleShareLink={handleShareLink} 
          modalStatus={modalStatus}
          setModalStatus={setModalStatus} 
          shareModal={shareModal}
          setShareModal={setShareModal}
          isLoading={isLoading}
          sideOpen={sideOpen}
        />
      </div>
    </>
  );
};

export default Dashboard;
