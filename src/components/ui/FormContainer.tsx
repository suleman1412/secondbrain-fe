import React, { FormEvent } from 'react';
import Heading from './Heading';
import { EllipsisVertical } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react'
interface FormContainerProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
    authLoading?: boolean;
    className?: string;
}

const FormContainer: React.FC<FormContainerProps & {
  setUsername?: Dispatch<SetStateAction<string>>;
  setPassword?: Dispatch<SetStateAction<string>>;
  variant?: boolean
}> = ({
  title='', 
  subtitle='', 
  children, 
  onSubmit,
  setUsername,
  setPassword,
  variant = true
}) => {
  const handleTestCreds = () => {
    setUsername?.(import.meta.env.VITE_TEST_USERNAME)
    setPassword?.(import.meta.env.VITE_TEST_PASSWORD)
  }
  return (
    <div className='container flex flex-col justify-center items-center mx-auto text-black'>
      <div className='formContainer min-w-[15em] md:min-w-[30em] border-2 border-border p-4 rounded-md flex flex-col gap-2'>    
        <div className='flex w-full justify-between items-center'>
          <Heading variant='primary' size='md'>
            {title}
          </Heading>
          {
            variant &&
              <div className='relative group'>
                <button 
                  className="p-1 text-white hover:bg-cardColor-1 rounded-lg "
                  onClick={handleTestCreds}
                >
                  <EllipsisVertical />
                </button>
                <div className="tooltip">
                  Test Creds
                </div>
              </div>
          }

        </div>
        <Heading variant='secondary' size='xs'>
          {subtitle}
        </Heading>
        <form className='flex flex-col gap-3' onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default FormContainer;