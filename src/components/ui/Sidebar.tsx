import React from "react";
import Heading from "./Heading";
import { Brain, PanelLeftClose, PanelLeftOpen, SquarePlay, File,Image, AudioLines   } from "lucide-react";
import Label from "./Label";
import Button from "./Button";
import { useSetRecoilState } from "recoil";
import { isLoggedIn } from "../recoil/atoms";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const setUserLogin = useSetRecoilState(isLoggedIn) 
    const handleLogout = () => {
        setUserLogin(false)
        localStorage.removeItem('token')
    }
    return (
        <div className={`sidebar flex flex-col ${isOpen ? "w-1/3 md:w-1/4 lg:w-1/5" : "w-12"} bg-cardColor-1 min-h-screen h-auto px-3 py-2 transition-all duration-400`}>
            <div className="flex items-center justify-between">
                <Heading variant="primary" className="flex items-center">
                <div className="flex items-center flex-1 gap-2">
                    {isOpen && 
                    <span className="flex items-center flex-1 gap-2 text-white ">
                        <Brain className="w-4 h-4 md:w-6 md:h-6" />
                        BigBrain
                    </span>}
                </div>
                </Heading>
                <div className="w-4 h-4 md:w-6 md:h-6 cursor-pointer text-white">
                    {isOpen ? (
                        <PanelLeftClose
                            onClick={toggleSidebar}
                        />
                    ) : (
                        <PanelLeftOpen
                            className="mt-2"
                            onClick={toggleSidebar}
                        />
                    )}
                </div>
            </div>
            {
                isOpen &&
                (   <>
                        <div className="categories flex-1 mt-8 flex flex-col gap-4 px-2">
                            <Label>
                                <Image />
                                Image
                            </Label>
                            <Label>
                                <SquarePlay />
                                Videos
                            </Label>
                            <Label>
                                <File />
                                Article
                            </Label>
                            <Label>
                                <AudioLines />
                                Audio
                            </Label>
                        </div>
                        <div>
                        <Button variant='secondary' className="w-full" onClick={handleLogout}>
                            Logout
                        </Button>
                        </div>
                    </>
                )
            }
        </div>
    );
};



export default Sidebar;
