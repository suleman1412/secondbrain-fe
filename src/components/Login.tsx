import Input from './ui/Input'
import Button from './ui/Button'
import { useState, FormEvent } from 'react'
import { AuthSchema } from '../lib/schemas'
import { ZodError } from 'zod'
import axios from 'axios'
import Heading from './ui/Heading'
import Alert from './ui/Alert'
import { useSetRecoilState } from 'recoil'
import { currTab, isLoggedIn } from './recoil/atoms'

interface FormErrors {
  username?: string
  password?: string
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showAlert, setShowAlert] = useState(false)
  const setCurrTab = useSetRecoilState(currTab);
  const setisLoggedIn = useSetRecoilState(isLoggedIn)



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})

    try {
      const validatedData = AuthSchema.parse({ username, password })

      setIsLoading(true)
      const response = await axios.post(
        'http://localhost:3000/v1/user/login',
        validatedData
      )
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        setShowAlert(true)
        setisLoggedIn(true)
        setTimeout(() => {
          setCurrTab('dashboard')
          setShowAlert(false)
        }, 3000)
      }
      setUsername('')
      setPassword('')
    } catch (error) {
        console.log(error)
        if (error instanceof ZodError) {
          const formErrors: FormErrors = {}
          error.errors.forEach((err) => {
            if (err.path[0]) {
              formErrors[err.path[0] as keyof FormErrors] = err.message
            }
          })
          setErrors(formErrors)
        }else{
          setErrors({ password: 'Something went wrong. Please try again later' })
        }
    }  finally {
      setIsLoading(false)
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: undefined }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }))
    }
  }

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className='min-w-72 w-[30em] border-2 border-border p-6 rounded-lg flex flex-col gap-4'>
        <Heading variant='primary' size='md'>
          Login
        </Heading>
        <Heading variant='secondary' size='xs'>
          Enter username and password
        </Heading>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Input
              value={username}
              onChange={handleUsernameChange}
              placeholder='Username...'
              disabled={isLoading}
              label={'Username'}
              inputId={'username'}
            />
            {errors.username && (
              <p className='text-red-500 text-sm mt-1'>{errors.username}</p>
            )}
          </div>

          <div>
            <Input
              value={password}
              onChange={handlePasswordChange}
              type='password'
              placeholder='Password...'
              disabled={isLoading}
              label={'Password'}
              inputId={'password'}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          <Button type='submit' variant='primary' disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
      <Heading variant='secondary' size='xs' className='flex justify-center'>
        New User? Register <span onClick={() => setCurrTab('register')} className='hover:text-text underline ml-1 cursor-pointer'>here.</span>
      </Heading>
      <div className='text-center flex justify-center mt-20'>
        {showAlert && <Alert text='Login Successful!' />}
      </div>
    </div>
  )
}

export default Login