import React from "react";
import Heading from "./Heading";
import { Brain, PanelLeftClose, PanelLeftOpen, SquarePlay, File,Image, AudioLines, Grid2X2 } from "lucide-react";
import Label from "./Label";
import Button from "./Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allContentAtom, filteredContentAtom, isLoggedIn } from "../recoil/atoms";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const setUserLogin = useSetRecoilState(isLoggedIn) 
    const setDisplayedContent = useSetRecoilState(filteredContentAtom)
    const contentStore = useRecoilValue(allContentAtom)
    
    
    const handleLogout = () => {
        setUserLogin(false)
        localStorage.removeItem('token')
    }

    const handleFilter = (type : string) => {
        if (type === 'all'){
            // setDisplayedContent(contentStore)
            setDisplayedContent(contentStore)
            return;
        }
        
        const filteredContent = contentStore.filter(content => content.type === type);
        setDisplayedContent(filteredContent)
    }
    
    
    return (
        <div 
        className={`
            fixed 
            top-0 
            left-0 
            bottom-0 
            z-50 
            bg-cardColor-1 
            shadow-lg 
            transition-all 
            duration-300 
            ease-in-out 
            ${isOpen ? 'w-64' : 'w-12'}
        `}
    >
        <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {isOpen && (
                    <div className="flex items-center gap-2 text-white">
                        <Brain className="w-6 h-6" />
                        <span>BigBrain</span>
                    </div>
                )}
                
                <button 
                    onClick={toggleSidebar} 
                    className="text-white hover:bg-gray-700 rounded-sm"
                >
                    {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
                </button>
            </div>

            {/* Sidebar Content */}
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
                                className="flex items-center gap-3 w-full p-2 text-white hover:bg-gray-700 rounded-md transition-colors"
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Logout Button */}
            {isOpen && (
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    </div>
        // <div className={`sidebar flex flex-col ${isOpen ? "w-1/3 md:w-1/4 lg:w-1/5" : "w-10"} bg-cardColor-1 min-h-screen h-auto px-3 py-2 transition-all duration-400`}>
        //     <div className="flex items-center justify-between">
        //         <Heading variant="primary" className="flex items-center">
        //         <div className="flex items-center flex-1 gap-2">
        //             {isOpen && 
        //             <span className="flex items-center flex-1 gap-2 text-white ">
        //                 <Brain className="w-4 h-4 md:w-6 md:h-6" />
        //                 BigBrain
        //             </span>}
        //         </div>
        //         </Heading>
        //         <div className="w-4 h-4 md:w-6 md:h-6 cursor-pointer text-white">
        //             {isOpen ? (
        //                 <PanelLeftClose
        //                     onClick={toggleSidebar}
        //                 />
        //             ) : (
        //                 <PanelLeftOpen
        //                     className="mt-2"
        //                     onClick={toggleSidebar}
        //                 />
        //             )}
        //         </div>
        //     </div>
        //     {
        //         isOpen &&
        //         (   <>
        //                 <div className="categories flex-1 mt-8 flex flex-col gap-4 px-2">
        //                     <Label onClick={() => handleFilter('image')}>
        //                         <Image />
        //                         <Heading variant="primary" size="xs">
        //                             Image
        //                         </Heading>
        //                     </Label>
        //                     <Label onClick={() => handleFilter('video')}>
        //                         <SquarePlay />
        //                         <Heading variant="primary" size="xs">
        //                             Video
        //                         </Heading>
        //                     </Label>
        //                     <Label onClick={() => handleFilter('article')}>
        //                         <File />
        //                         <Heading variant="primary" size="xs">
        //                             Article
        //                         </Heading>
        //                     </Label>
        //                     <Label onClick={() => handleFilter('audio')}>
        //                         <AudioLines />
        //                         <Heading variant="primary" size="xs">
        //                             Audio
        //                         </Heading>
        //                     </Label>
        //                     <Label onClick={() => handleFilter('all')}>
        //                         <Grid2X2 />
        //                         <Heading variant="primary" size="xs">
        //                             All
        //                         </Heading>
        //                     </Label>
        //                 </div>
        //                 <div>
        //                 <Button variant='secondary' className="w-full" onClick={handleLogout}>
        //                     Logout
        //                 </Button>
        //                 </div>
        //             </>
        //         )
        //     }
        // </div>
    );
};



export default Sidebar;
