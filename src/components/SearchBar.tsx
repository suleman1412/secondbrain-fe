import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import Heading from "./ui/Heading";
import SeachSuggestions from "./ui/SeachSuggestions";
import axios from "axios";
import { useRecoilState } from "recoil";
import { filteredContentAtom } from "./recoil/atoms";

const SearchBar = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchedTerm, setSearchedTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token')
    const [displayedContent, setDisplayedContent] = useRecoilState(filteredContentAtom)
    // To handle outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // To handle keyboard shotcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsFocused(true);
                inputRef.current?.focus() 
            }

            if (e.key === "Escape") {
                e.preventDefault();
                setIsFocused(false);
                setSearchedTerm("");
                inputRef.current?.blur() 
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const vectorSearch = async () => {
        try{
            if(searchedTerm.trim()){
                const response = await axios.post(
                    `${BASE_URL}/content/search`,
                    { search: searchedTerm },
                    {headers: { Authorization: `Bearer ${token}` } }
                );
                const results: (string | number)[] = await response.data.search
                console.log(results)
                const updatedContent = displayedContent.filter(content =>
                    results.includes(content.contentId) 
                );
    
                setDisplayedContent(updatedContent);

            }
        } catch (e) {
            console.error("Error during vector search: ",e)
        } 
    }

    // Debouncer
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            vectorSearch()
        }, 1000)

        return () => clearTimeout(debounceTimeout)
    }, [searchedTerm])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFocused(false)
        if(e.target.value === ''){
            setIsFocused(true)
        }
        setSearchedTerm(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searched for:", searchedTerm);
    };

    return (
        <div className="flex flex-col justify-center h-[80vh] items-center gap-4">
            <Heading variant="primary" className="text-center">
                <span className="text-[1.2rem] md:text-[4rem]">What would you like to do?</span>
            </Heading>
            <div ref={containerRef} className="w-[85%] text-[0.8rem] md:text-[1rem]">
                <div className="flex relative flex-col">
                    <form onSubmit={handleSubmit} className="z-10">
                        <input
                            ref = {inputRef}
                            value={searchedTerm} 
                            onChange={handleInputChange} 
                            className="w-full bg-cardColor-2 py-4 px-6 rounded-full shadow-md pr-14"
                            placeholder="Search your memories..."
                            onFocus={() => setIsFocused(true)}
                        />
                        <button type="submit">
                            <div className="absolute right-3 top-[50%] -translate-y-[50%] rounded-full bg-white text-black p-1.5">
                                <Search className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                        </button>
                    </form>
                    {isFocused && <SeachSuggestions />}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
