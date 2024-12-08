import { Dispatch, SetStateAction, useState } from 'react';
import Button from './ui/Button'
import Input from './ui/Input' 
import Heading from './ui/Heading';
import { useSetRecoilState } from 'recoil';
import { heroTitleinput, heroLinkinput } from './recoil/atoms';

const Hero = ({ setCurrent }: { setCurrent: Dispatch<SetStateAction<string>> }) => {
   const setHeroTitle = useSetRecoilState(heroTitleinput);
   const setHeroLink = useSetRecoilState(heroLinkinput);

   const [tempTitle, setTempTitle] = useState<string | null>(null);
   const [tempLink, setTempLink] = useState<string | null>(null);

   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const newValue = event.target.value === '' ? null : event.target.value;
       setTempTitle(newValue);
   }

   const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const newValue = event.target.value === '' ? null : event.target.value;
       setTempLink(newValue);

   }

   const handleGetStarted = () => {
       setHeroTitle(tempTitle);
       setHeroLink(tempLink);
       setCurrent('register')
   }
   return (
       <div className='my-12 mx-auto w-full md:w-[70%] flex flex-col text-center items-center gap-12 overflow-x-hidden'>
            <Heading 
                variant='primary'
                size='lg'    
            >
                Your <span className='font-font2 tracking-tight font-normal'>Digital</span> Mind:
                <br />
                Save, Share, Revisit
            </Heading>
            <div className='flex flex-col gap-4 mx-auto'>
                <Heading 
                    variant='secondary'
                    size='xs'
                    className='mx-auto'
                >
                    Organize your thoughts, one link at a time!
                </Heading>
                <Input 
                    value={tempTitle || ''} 
                    onChange={handleTitleChange} 
                    placeholder='Title...' 
                />
                <Input 
                    value={tempLink || ''} 
                    onChange={handleLinkChange} 
                    placeholder='Link...' 
                />
                <div className='mx-auto'>
                    <Button variant='secondary' onClick={handleGetStarted}>
                        <h1 className='text-[0.8rem] md:text-[1rem] font-medium'>Get Started</h1>
                    </Button>        
                </div>
            </div>
        </div>
    )
}

export default Hero