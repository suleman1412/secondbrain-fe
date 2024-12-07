import { AudioLines, Trash, File, Image, SquarePlay } from "lucide-react";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { allContentAtom, filteredContentAtom } from "./recoil/atoms";
import axios from "axios";


interface Tags{
    _id: string;
    title: string;
}

const TypeStyles: { [key: string]: JSX.Element } = {
    'image': <Image />,
    'article': <File />,
    'video': <SquarePlay />,
    'audio': <AudioLines />,
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

const Card: React.FC<ContentType> = ({
    title,
    type,
    tags,
    link,
    createdAt,
    _id = ''
}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const token = localStorage.getItem('token') || ''
    const [contentstore, setContentStore] = useRecoilState(allContentAtom)
    const setDisplayedContent = useSetRecoilState(filteredContentAtom)
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
            <button
            onClick={() => deleteContent(_id)}
            className="absolute top-3 right-4"
            >
                <Trash className="w-5 h-5" />
            </button>
            <div className="flex gap-2 items-center ">
                {TypeStyles[type]}
                <h3 className="text-lg font-semibold">{title}</h3>
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
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-500 underline text-sm mb-2 inline-block"
                >
                    View Content
                </a>
            )}
            
            {createdAt && (
                <p className="text-xs text-gray-500 my-2">
                    <span className="font-bold">
                        Created At:
                    </span> {new Date(createdAt).toLocaleDateString()}
                </p>
            )}
        </div>
    );
};



export default Card;
