import React from "react";
import Heading from "./Heading";
import { Brain, PanelLeftClose, PanelLeftOpen, SquarePlay, File,Image, AudioLines, Grid2X2 } from "lucide-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allContentAtom, filteredContentAtom, isLoggedIn } from "../recoil/atoms";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const setUserLogin = useSetRecoilState(isLoggedIn) 
    const setDisplayedContent = useSetRecoilState(filteredContentAtom)
    const contentStore = useRecoilValue(allContentAtom)
    const isMobile = useMediaQuery()
    
    
    const handleLogout = () => {
        setUserLogin(false)
        localStorage.removeItem('token')
    }

    const handleFilter = (type : string) => {
        if (type === 'all'){
            setDisplayedContent(contentStore)
        } else{
            const filteredContent = contentStore.filter(content => content.type === type);
            setDisplayedContent(filteredContent)
        }
        toggleSidebar()
        

    }
    return (
        <div 
        className={`fixed top-0 left-0 bottom-0 z-50 bg-cardColor-2 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'w-40 md:w-60 ' : 'w-10'}`}
    >
        <div className="flex flex-col h-full">
            <div className={`flex items-center justify-between px-2 py-4 ${isOpen && 'border-b-4 border-cardColor-1 '}`}>
                <div className="h-[30px] w-full flex items-center justify-between">
                    {isOpen && 
                        <Heading variant="primary" size="sm" className="flex gap-2 items-center">
                            <Brain />
                            BigBrain
                        </Heading>
                    }
                    <button onClick={toggleSidebar}>
                        {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
                    </button>
                </div>
                
                
            </div>

            {isOpen && (
                <div className="flex-1 px-4 py-6">
                    <div className="space-y-4">
                        {[
                            { icon: <Image />, label: 'Image', filter: 'image' },
                            { icon: <SquarePlay />, label: 'Video', filter: 'video' },
                            { icon: <File />, label: 'Article', filter: 'article' },
                            { icon: <AudioLines />, label: 'Audio', filter: 'audio' },
                            { icon: <Grid2X2 />, label: 'All', filter: 'all' }
                        ].map((item) => (
                            <button
                                key={item.filter}
                                onClick={() => handleFilter(item.filter)}
                                className="flex items-center gap-3 w-full p-2 text-white hover:bg-cardColor-1 rounded-md transition-colors"
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {isOpen && (
                <div className="p-4 border-t-4 border-cardColor-1">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white font-font1 font-semibold tracking-wider py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    </div>
    );
};



export default Sidebar;
