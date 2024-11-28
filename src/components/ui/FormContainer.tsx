import React, { FormEvent } from 'react';
import Heading from './Heading';

interface FormContainerProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
    isLoading?: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({
  title, 
  subtitle, 
  children, 
  onSubmit, 
  isLoading = false,
}) => {
  return (
    <div className='container flex flex-col justify-center items-center mx-auto'>
      <div className='formContainer min-w-[15em] md:min-w-[30em] border-2 border-border p-4 rounded-md flex flex-col gap-2'>    
        <Heading variant='primary' size='md'>
          {title}
        </Heading>
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