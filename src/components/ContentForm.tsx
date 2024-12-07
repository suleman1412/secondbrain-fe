import React, { useState } from "react";
import axios from "axios";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import { ContentType } from "./Card";


interface ContentFormProps {
  onClose: () => void;
  onSubmit?: (content: ContentType) => void;
  mainTitle?: string
  initialData?: ContentType; 
}

const ContentForm: React.FC<ContentFormProps> = ({ 
  onClose, 
  onSubmit,
  mainTitle = 'Add New Content',
  initialData
 }) => {
  const token = localStorage.getItem("token") || "";

  const [link, setLink] = useState(initialData?.link || '');
  const [type, setType] = useState(initialData?.type ||"");
  const [title, setTitle] = useState(initialData?.title || "");
  const [tags, setTags] = useState(initialData?.tags?.map(tag => tag.title) || []);
  const [newTag, setNewTag] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const contentTypes = ["image", "video", "article", "audio"];

  const isValidUrl = (url: string) =>
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/?.*$/.test(url);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags((prev) => [...prev, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) =>
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!link || !isValidUrl(link)) return alert("Invalid URL.");
    if (!type) return alert("Please select a content type.");
    if (!title) return alert("Please enter a title.");

    try {
      const payload = { link, type, title, tags };
      if (initialData?._id) {
        // Update content
        const response = await axios.put(
          `${BASE_URL}/content/`,
          {
            ...payload,
            contentId: initialData._id
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onSubmit?.(response.data);
      } else {
        // Create new content

        const response = await axios.post(
          `${BASE_URL}/content`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onSubmit?.(response.data);
      }
      onClose();
    } catch (error) {
      console.error("Failed to submit content:", error);
      alert("Submission failed.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl relative w-[500px] text-black font-font1">
        <Button
          variant="primary"
          onClick={onClose}
          className="absolute top-3 right-4"
        >
          ✕
        </Button>
        <Heading variant="primary" size="md" className="mb-6">
          <span className="text-black">
            {mainTitle}
          </span>
        </Heading>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-bold" htmlFor="url">URL</label>
            <input
              type="text"
              value={link}
              id="url"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter content URL"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-bold" htmlFor="type">Content Type</label>
            <select
              value={type}
              id="type"
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Content Type</option>
              {contentTypes.map((contentType) => (
                <option key={contentType} value={contentType}>
                  {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-bold" htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter content title"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-bold" htmlFor="tags">Tags</label>
            <div className="flex">
              <input
                type="text"
                value={newTag}
                id="tags"
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="flex-grow p-2 border rounded-l"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center bg-gray-200 px-2 py-1 rounded">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
          <Button type="submit" variant="secondary" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContentForm;
