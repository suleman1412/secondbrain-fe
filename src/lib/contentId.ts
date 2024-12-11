import { SHA256 } from 'crypto-js'

export interface Tags{
    tagId: string,
    title: string
}
export interface ContentPayload{ 
    link: string;
    type: string;
    title: string;
    tags: string[];
}

const enrichContent = (newContent: ContentPayload) => {
    console.log("Before Enriching Data: ", newContent);
    const token = localStorage.getItem('token')
    const hashId = SHA256(token + newContent.title + Date.now().toString()).toString();
    const enrichedTags: Tags[] = newContent.tags.map((tag, index) => ({
        tagId: SHA256(tag + index + Date.now().toString()).toString(), 
        title: tag,
    }));
    return {
        ...newContent,
        createdAt: new Date().toISOString(), // Add today's date
        contentId: hashId, //contentId
        tags: enrichedTags
    };
};

export default enrichContent;
