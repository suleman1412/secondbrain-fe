import { AudioLines, Trash, File, Image, SquarePlay, FilePenLine  } from "lucide-react";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { allContentAtom, filteredContentAtom } from "./recoil/atoms";
import axios from "axios";
import ContentForm from "./ContentForm";
import { useFetchContent } from "./hooks/useFetchContent";


interface Tags{
    _id: string;
    title: string;
}

const TypeStyles: { [key: string]: JSX.Element } = {
    'image': <Image className="w-6 h-6 md:w-8 md:h-8"/>,
    'article': <File className="w-6 h-6 md:w-8 md:h-8"/>,
    'video': <SquarePlay className="w-6 h-6 md:w-8 md:h-8"/>,
    'audio': <AudioLines className="w-6 h-6 md:w-8 md:h-8"/>,
};

export interface ContentType {
    title: string;
    type: string;
    tags: Tags[];
    link: string;
    createdAt?: string;
    _id?: string;
    updatedAt?: string;
}

export interface CardType extends ContentType {
    sideOpen?: boolean
    variant?: boolean
}
const Card: React.FC<CardType> = ({
    title,
    type,
    tags,
    link,
    createdAt,
    _id = '',
    sideOpen,
    variant=false
}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const token = localStorage.getItem('token') || ''
    const [contentstore, setContentStore] = useRecoilState(allContentAtom)
    const setDisplayedContent = useSetRecoilState(filteredContentAtom)
    const fetchContent = useFetchContent();

    const [updateModal, setUpdateModal] = useState(false)
    const deleteContent = async(_id: string) => {
        try {
            await axios.delete(`
                ${BASE_URL}/content/`,{
                    data: {contentId: _id},
                    headers: {Authorization: `Bearer ${token}`}
                } 
            );
            const filteredContent = contentstore.filter(content => content._id !== _id)
            setContentStore(filteredContent)
            setDisplayedContent(filteredContent)
        } catch (error) {
            console.error("Failed to delete content", error);
        }
    }
    return (
        <div className="bg-cardColor-1  border-2 border-border rounded-lg px-4 py-2 shadow-md relative">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    {TypeStyles[type]}
                    <span className=" font-font1 text-[1rem] md:text[1.1rem] lg:text-[1.2rem] font-semibold tracking-normal break-words w-full line-clamp-2">{title}</span>
                </div>
                {
                    !variant && 
                    <div className="flex gap-2">
                        <button onClick={() => setUpdateModal(true)} disabled={sideOpen}>
                            <FilePenLine className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <button onClick={() => deleteContent(_id)} disabled={sideOpen}>
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
                                key={tag._id}
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
                <p className="text-xs text-cardColor-3 my-2">
                    <span className="font-font1 font-semibold text-[0.7rem] md:text[0.75rem] lg:text-[0.85rem] tracking-normal">
                        Created At:
                        <span className="ml-1 font-light tracking-wider ">
                            {new Date(createdAt).toLocaleDateString()}
                        </span>
                    </span> 
                </p>
            )}

            {updateModal && 
            <ContentForm 
                onClose={() => setUpdateModal(false)} 
                mainTitle="Update Content" 
                initialData={{ title, type, tags, link, _id }}
                onSubmit={
                    async(updatedContent) => {
                    const updatedContentStore = contentstore.map(content =>
                    content._id === updatedContent._id ? updatedContent : content
                    );
                    setContentStore(updatedContentStore);
                    setDisplayedContent(updatedContentStore);
                    fetchContent()
                }}
            />
            }
        </div>
    );
};



export default Card;
