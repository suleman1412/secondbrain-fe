import { Brain } from "lucide-react";
import Button from "./ui/Button";
import { useSetRecoilState } from "recoil";
import { currTab } from "./recoil/atoms";

export const NavBar = () => {
    const setCurrTab = useSetRecoilState(currTab);

    return (
        <div className="flex justify-between items-center text-text">
            <div className="brand flex gap-2 items-center">
                <Brain 
                    className="w-6 h-6 md:w-10 md:h-10 cursor-pointer" 
                    onClick={() => setCurrTab("")}
                />
                <h1
                    className="font-font1 font-semibold text-weigh text-[1.5rem] md:text-[2.5rem] tracking-tight cursor-pointer"
                    onClick={() => setCurrTab("")}
                >
                    BigBrain
                </h1>
            </div>

            <div className="flex gap-4 text-[0.6rem] md:text-[0.8rem] font-medium">
                <Button 
                    variant="secondary" 
                    onClick={() => {
                        setCurrTab("login")
                    }}
                >
                    Login
                </Button>
                <Button 
                    variant="primary" 
                    onClick={() => setCurrTab("register")}
                >
                    Register
                </Button>
            </div>
        </div>
    );
};
