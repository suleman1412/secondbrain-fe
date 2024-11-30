import { useSetRecoilState } from "recoil";
import axios from "axios";
import { allContentAtom, filteredContentAtom } from "../recoil/atoms";

export const useFetchContent = () => {
  const setContentStore = useSetRecoilState(allContentAtom);
  const setDisplayedContent = useSetRecoilState(filteredContentAtom);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token") || "";

  const fetchContent = async () => {
    if (!BASE_URL) {
      console.error("Base URL is not configured");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/content/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedContent = response.data.allContent || [];
      setContentStore(fetchedContent);
      setDisplayedContent(fetchedContent);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  };

  return fetchContent;
};