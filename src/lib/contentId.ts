import { v4 as uuidv4 } from 'uuid';

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
    if(!newContent.contentId){
        newContent.contentId = uuidv4()
    }
    const enrichedTags: Tags[] = newContent.tags.map((tag) => ({
        tagId: uuidv4(), 
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
