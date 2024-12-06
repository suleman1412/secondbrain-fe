import { useRecoilValue } from 'recoil';
import { currTab } from './recoil/atoms'; 
import Footer from './Footer';
import Hero from './Hero';
import { NavBar } from './NavBar';
import Login from './Login';
import Register from './Register';

const Landing = () => {
    const currentTab = useRecoilValue(currTab);
    const renderContent = () => {
        switch (currentTab) {
            case 'login':
                return <Login />;
            case 'register':
                return <Register />;
            default:
                return <Hero />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen p-2 mx-auto max-w-7xl ">
            <NavBar />
            <div className="flex flex-1 justify-center items-center">
                {renderContent()}
            </div>
            <Footer />
        </div>
    );
};

export default Landing;
