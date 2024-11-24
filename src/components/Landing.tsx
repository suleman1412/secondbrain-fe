import Footer from './Footer'
import Hero from './Hero'
import { NavBar } from './NavBar'

const Landing = () => {
    
    return(
        <div className='flex flex-col min-h-screen'>
            <NavBar />
            <div className='flex-1 '>
                <Hero />
            </div>
            <Footer />
        </div>
    )
}



export default Landing