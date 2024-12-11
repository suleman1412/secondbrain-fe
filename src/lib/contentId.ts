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
    contentId?: string
}

const enrichContent = (newContent: ContentPayload) => {
    console.log("Before Enriching Data: ", newContent);
    const token = localStorage.getItem('token')
    if(!newContent.contentId){
        newContent.contentId = SHA256(token + newContent.title + Date.now().toString()).toString();
    }
    const enrichedTags: Tags[] = newContent.tags.map((tag, index) => ({
        tagId: SHA256(tag + index + Date.now().toString()).toString(), 
        title: tag,
    }));
    return {
        ...newContent,
        createdAt: new Date().toISOString(), // Add today's date
        contentId: newContent.contentId, //contentId
        tags: enrichedTags
    };
};

export default enrichContent;
