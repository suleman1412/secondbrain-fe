import { useRecoilValue } from "recoil";
import { isLoggedIn } from "./recoil/atoms";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const userLogin = useRecoilValue(isLoggedIn);
    const [content, setContent] = useState([]); 
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const fetchData = async () => {
            if (!(userLogin && token)) {
                console.log("User has not logged in or token does not exist");
                return;
            }

            console.log("Logged in and token exists (not verified yet)");

            try {
                const response = await axios.get('http://localhost:3000/v1/content/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.allContent);
                setContent(response.data.allContent);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to load content. Please try again later.");
            }
        };

        fetchData();
    }, [userLogin, token]);

    return (
        <div className="text-white">
            <h1>Dashboard</h1>
            
        </div>
    );
};

export default Dashboard;
