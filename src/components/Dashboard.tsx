import { useRecoilValue } from "recoil";
import { isLoggedIn } from "./recoil/atoms";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./ui/Sidebar";
import Card, { ContentType } from "./Card";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { PlusIcon, Share2Icon } from "lucide-react";

const Dashboard = () => {
    const userLogin = useRecoilValue(isLoggedIn);
    const [content, setContent] = useState<ContentType[]>([]);
    const token = localStorage.getItem('token') || '';
    const [sideOpen, setSideOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [shareLink, setShareLink] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!(userLogin && token)) {
                console.log("User has not logged in or token does not exist");
                return;
            }

            console.log("Logged in and token exists (not verified yet)");
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/v1/content/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.allContent);
                setContent(response.data.allContent || []);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userLogin, token]);

    const handleSidebar = () => {
        setSideOpen((prev) => !prev);
    };

    const handleShareLink = async() => {
        try {
            const response = await axios.post('http://localhost:3000/v1/brain/share', 
                { share: true },
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
            const hashedString = response.data.link;
            console.log('Hashed String:', hashedString);
            setShareLink(`http://localhost:3000/v1/brain/${hashedString}`); 
        } catch (err) {
            console.error("Failed to fetch data:", err);
        } finally {
            setIsLoading(false);
        }
    }
    const handleAddContent = async() => {
        alert("Todo")
    }
    return (
        <div className="flex">
            <Sidebar isOpen={sideOpen} toggleSidebar={handleSidebar} />
            <div className="content px-6 py-5 flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <Heading variant="primary">All Notes</Heading>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="secondary" className="flex gap-1 items-center" onClick={handleShareLink}>
                                <Share2Icon className="w-4 h-4"/>
                                Share List
                            </Button>
                            <Button variant="primary" className="flex gap-1 items-center" onClick={handleAddContent}>
                                <PlusIcon className="w-4 h-4" />
                                Add Content
                            </Button>
                        </div>
                    </div>
                <div
                    className={`cardsContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4`}
                >
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : content.length > 0 ? (
                        content.map((item) => (
                            <Card
                                key={item._id}
                                title={item.title}
                                link={item.link}
                                type={item.type}
                                tags={item.tags}
                            />
                        ))
                    ) : (
                        <p>No content available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
