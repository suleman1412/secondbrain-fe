import { AudioLines, File, Film, Image } from "lucide-react";
import React from "react";

interface Tags{
    _id: string;
    title: string;
}

const TypeStyles: { [key: string]: JSX.Element } = {
    'image': <Image />,
    'article': <File />,
    'video': <Film />,
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
}) => {
    return (
        <div className="bg-gradient-to-b from-cardColor-1 to-cardColor-2 border-2 border-border rounded-lg px-4 py-2 shadow-md">
            <div className="flex gap-2 items-center">
                {TypeStyles[type]}
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
            </div>
            <div className="mb-2">
                <ul className="flex flex-wrap gap-2 mt-1">
                    {tags && tags.length > 0 ? (
                        tags.map((tag) => (
                            <li
                                key={tag._id}
                                className="bg-slate-900 text-xs px-2 py-1 rounded"
                            >
                                # {tag.title}
                            </li>
                        ))
                    ) : (
                        <span>No tags available</span>
                    )}
                </ul>
            </div>
            
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black underline text-sm mb-2 inline-block"
                >
                    View Content
                </a>
            )}
            
            {/* Created At */}
            {createdAt && (
                <p className="text-xs text-cardColor-1 my-2">
                    <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
                </p>
            )}
        </div>
    );
};



export default Card;
