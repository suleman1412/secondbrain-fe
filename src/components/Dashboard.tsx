import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedIn, shareLink } from "./recoil/atoms";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./ui/Sidebar";
import Card, { ContentType } from "./Card";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { PlusIcon, Share2Icon } from "lucide-react";
import ContentForm from "./ContentForm";
import ShareModal from "./ShareModal";

const Dashboard = () => {
  const userLogin = useRecoilValue(isLoggedIn);
  const setShareLink = useSetRecoilState(shareLink)
  const [content, setContent] = useState<ContentType[]>([]);
  const token = localStorage.getItem("token") || "";
  const [sideOpen, setSideOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  const [modalStatus, setModalStatus] = useState(false);
  const [shareModal, setShareModal] = useState(false)
  const fetchData = async () => {
    if (!userLogin || !token) {
      console.log("User is not logged in or token is missing");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get("https://secondbrain-gpst.onrender.com/v1/content/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContent(response.data.allContent || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userLogin, token]);



  const handleContentSubmit = async (newContent: ContentType) => {
    setContent((prevContent) => [...prevContent, newContent]);
    setModalStatus(false);
    await fetchData()
};

  const toggleSidebar = () => setSideOpen((prev) => !prev);

  const handleShareLink = async () => {
    setIsLoading(true);
    setShareModal(true)
    try {
      const response = await axios.post(
        "https://secondbrain-gpst.onrender.com/v1/brain/share",
        { share: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const hashedString = response.data.link;
      setShareLink(`https://secondbrain-gpst.onrender.com/v1/brain/${hashedString}`);
    } catch (error) {
      console.error("Failed to generate share link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar isOpen={sideOpen} toggleSidebar={toggleSidebar} />
      <div className="content px-6 py-5 flex-1">
        <div className="flex justify-between items-center">
          <Heading variant="primary" size="md">What I'm Learning</Heading>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              className="flex gap-1 items-center"
              onClick={handleShareLink}
            >
              <Share2Icon className="w-4 h-4" />
              Share List
            </Button>
            <Button
              variant="primary"
              className="flex gap-1 items-center"
              onClick={() => setModalStatus(true)}
            >
              <PlusIcon className="w-4 h-4" />
              Add Content
            </Button>
          </div>
        </div>
        <div
          className="cardsContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4"
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : content.length > 0 ? (
            content.map((item) => (
              <Card key={item._id} {...item} />
            ))
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
      {modalStatus && (
        <ContentForm onClose={() => setModalStatus(false)} onSubmit={handleContentSubmit} />
      )}
      {shareModal && (
        <ShareModal onClick={() => setShareModal(false)}/>
      )}
    </div>
  );
};

export default Dashboard;
