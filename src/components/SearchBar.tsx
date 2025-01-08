import { useEffect, useRef, useState } from "react";
import {  Search } from "lucide-react";
import SeachSuggestions from "./ui/SeachSuggestions";
import axios from "axios";
import { ContentType } from "./Card";

interface SearchBarProps{
    contentStore: ContentType[]
}
const SearchBar: React.FC<SearchBarProps> = ({
    contentStore
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchedTerm, setSearchedTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [searchResults, setSearchResults] = useState<{ title: string, link: string}[]>([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token')
    // const contentStore = useRecoilValue(allContentAtom)

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
                const results: (string)[] = await response.data.search
                const orderMap = new Map(results.map((id, index) => [id, index]));
                
                const sortedContent = [...contentStore].sort((a, b) => {
                    const indexA = orderMap.get(a.contentId!) ?? Infinity;
                    const indexB = orderMap.get(b.contentId!) ?? Infinity;
                    return indexA - indexB;
                });
                
                setSearchResults(sortedContent.slice(0,3).map(content => ({
                    link: content.link!,
                    title: content.title!
                })))
                }
        } catch (e) {
            console.error("Error during vector search: ",e)
        } finally{
            setIsLoading(false)
        }
    }

    // Debouncer
    useEffect(() => {
        setSearchResults([])
        const debounceTimeout = setTimeout(() => {
            vectorSearch()
        }, 1000)

        return () => clearTimeout(debounceTimeout)
    }, [searchedTerm])


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedTerm(e.target.value);
        setIsFocused(true)
        if(e.target.value === ''){
            setIsLoading(false)
        }else{
            setIsLoading(true)
        }
    };


    return (
        <div className="flex flex-col  gap-4 z-10">
            {/* <Heading variant="primary" className="text-center">
                <span className="text-[1.2rem] md:text-[4rem]">What would you like to do?</span>
            </Heading> */}
            <div ref={containerRef} className="w-[100%] text-[0.8rem] md:text-[1rem]">
                <div className="flex relative flex-col">
                    <div  className="z-10">
                        <input
                            ref = {inputRef}
                            value={searchedTerm} 
                            onChange={handleInputChange} 
                            className="w-full bg-cardColor-2 py-4 px-6 rounded-full shadow-md pr-14 pl-14"
                            placeholder="Search your memories..."
                            onFocus={() => setIsFocused(true)}
                        />
                        <div>
                            <div className="absolute left-3 top-[50%] -translate-y-[50%] rounded-full bg-white text-black p-1.5">
                                <Search className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <div className="absolute right-3 top-[50%] -translate-y-[50%]  text-gray-600 p-1.5 font-light tracking-normal">
                                Ctrl + K
                            </div>
                        </div>
                    </div>
                    {isFocused &&  <SeachSuggestions isLoading={isLoading} searchResults={searchResults} />}
                    {}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
