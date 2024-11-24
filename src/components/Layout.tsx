import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import { RecoilRoot } from 'recoil';

const Layout = () => {
    return (
        <div className='p-2 mx-auto max-w-7xl flex flex-col min-h-screen'>
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path='/' element = {<Landing />} />
                        <Route path='/login' element = {<Login />} />
                        <Route path='/register' element = {<Register />} />
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
        </div>
    );
}

export default Layout;