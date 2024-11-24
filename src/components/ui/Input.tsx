

const Input = ({ 
    ...props 
}) => {
    return (
        <input
            className='bg-secondary-2 placeholder-border text-white text-[0.8rem] lg:text-[1rem] h-[2.5rem] px-3 w-full'
            {...props}
        />
    );
}

export default Input;