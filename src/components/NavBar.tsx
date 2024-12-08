import { Brain } from "lucide-react";
import Button from "./ui/Button";
import { Dispatch, SetStateAction } from 'react'

export const NavBar = ({ setCurrent }: { setCurrent: Dispatch<SetStateAction<string>> }) => {

    return (
        <div className="flex justify-between items-center text-text">
            <div className="brand flex gap-2 items-center">
                <Brain 
                    className="w-6 h-6 md:w-10 md:h-10 cursor-pointer" 
                    onClick={() => setCurrent("")}
                />
                <h1
                    className="font-font1 font-semibold text-weigh text-[1.5rem] md:text-[2.5rem] tracking-tight cursor-pointer"
                    onClick={() => setCurrent("")}
                >
                    BigBrain
                </h1>
            </div>

            <div className="flex gap-4 text-[0.75rem] md:text-[1rem] font-medium">
                <Button 
                    variant="secondary" 
                    onClick={() => {
                        setCurrent("login")
                    }}
                >
                    Login
                </Button>
                <Button 
                    variant="primary" 
                    onClick={() => setCurrent("register")}
                >
                    Register
                </Button>
            </div>
        </div>
    );
};
