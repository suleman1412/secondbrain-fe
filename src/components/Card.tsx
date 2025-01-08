import { AudioLines, Trash, File, Image, SquarePlay, FilePenLine  } from "lucide-react";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import ContentForm from "./ContentForm";
import { allContentAtom, filteredContentAtom } from "./recoil/atoms";
import { Tags } from "../lib/contentId";

const TypeStyles: { [key: string]: JSX.Element } = {
    'image': <Image className="w-6 h-6 md:w-8 md:h-8"/>,
    'article': <File className="w-6 h-6 md:w-8 md:h-8"/>,
    'video': <SquarePlay className="w-6 h-6 md:w-8 md:h-8"/>,
    'audio': <AudioLines className="w-6 h-6 md:w-8 md:h-8"/>,
};

export interface ContentType {
    title?: string;
    type?: string;
    tags?: Tags[];
    link?: string;
    createdAt?: string;
    contentId?: string;
}


export interface CardType extends ContentType {
    sideOpen?: boolean
    variant?: boolean,
    updateModal?: boolean,
}
const Card: React.FC<CardType> = ({
    title,
    type,
    tags,
    link,
    createdAt,
    contentId = '',
    sideOpen,
    variant=false,
}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const token = localStorage.getItem('token') || ''
    const [contentstore, setContentStore] = useRecoilState(allContentAtom)
    const setDisplayedContent = useSetRecoilState(filteredContentAtom)
    
    const [updateModal, setUpdateModal] = useState(false)

    const deleteContent = async(contentId: string) => {
        try {
            const filteredContent = contentstore.filter(content => content.contentId !== contentId)
            // Frontend updating quicker than BE accomodate for the lag deleting content.
            setContentStore(filteredContent)
            setDisplayedContent(filteredContent)
            await axios.delete(`
                ${BASE_URL}/content/`,{
                    data: {contentId: contentId},
                    headers: {Authorization: `Bearer ${token}`}
                } 
            );
        } catch (error) {
            console.error("Failed to delete content", error);
            alert('Error deleting the content')
            setContentStore(contentstore)
            setDisplayedContent(contentstore)
        }
    }
    return (
        <div className="bg-cardColor-1  border-2 border-border rounded-lg px-4 py-2 shadow-md relative">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    {TypeStyles[type!]}
                    <span className=" font-font1 text-[1rem] md:text[1.1rem] lg:text-[1.2rem] font-semibold tracking-normal break-words w-full line-clamp-2">{title}</span>
                </div>
                {
                    !variant && 
                    <div className="flex gap-2">
                        <button onClick={() => setUpdateModal?.(true)} disabled={sideOpen}>
                            <FilePenLine className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <button onClick={() => deleteContent(contentId)} disabled={sideOpen}>
                            <Trash className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                }
            </div>
            <div className="mb-2">
                <ul className="flex flex-wrap gap-2 mt-1">
                    {tags && tags.length > 0 && (
                        tags.map((tag) => (
                            <li
                                key={tag.tagId}
                                className="bg-cardColor-2  text-xs px-2 py-1 rounded"
                            >
                                # {tag.title}
                            </li>
                        ))
                    )}
                </ul>
            </div>
            
            {link && (
                <a
                    href={sideOpen ? undefined : link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${sideOpen ? '' : 'hover:text-primary-2 '} mb-2 inline-block font-medium font-font1 text-[0.7rem] md:text[0.75rem] lg:text-[0.85rem] tracking-normal
                    text-cardColor-3`}
                >
                    View Content
                </a>
            )}
            
            {createdAt && (
                <p className="text-xs text-cardColor-2 my-2">
                    <span className="font-font1 font-semibold text-[0.7rem] md:text[0.75rem] lg:text-[0.85rem] tracking-normal">
                        Created At:
                        <span className="ml-1 font-medium tracking-wider ">
                            {new Date(createdAt).toLocaleDateString()}
                        </span>
                    </span> 
                </p>
            )}

            {updateModal && 
            <ContentForm 
                onClose={() => setUpdateModal?.(false)} 
                mainTitle="Update Content" 
                initialData={{ title, type, tags, link, contentId, createdAt }}
                updateModal={updateModal}
            />
            }
        </div>
    );
};



export default Card;
