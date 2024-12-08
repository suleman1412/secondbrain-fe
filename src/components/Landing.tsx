import Footer from './Footer';
import Hero from './Hero';
import { NavBar } from './NavBar';
import Login from './Login';
import Register from './Register';
import { useState } from 'react';

const Landing = () => {
    const [current, setCurrent ] = useState('')
    const renderContent = () => {
        switch (current) {
            case 'login':
                return <Login/>;
            case 'register':
                return <Register setCurrent={setCurrent}/>;
            default:
                return <Hero setCurrent={setCurrent}/>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen p-2 mx-auto max-w-7xl ">
            <NavBar setCurrent={setCurrent}/>
            <div className="flex flex-1 justify-center items-center">
                {renderContent()}
            </div>
            <Footer />
        </div>
    );
};

export default Landing;
