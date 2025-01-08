import Input from './ui/Input'
import Button from './ui/Button'
import { useState, FormEvent } from 'react'
import { AuthSchema } from '../lib/schemas'
import { ZodError } from 'zod'
import axios from 'axios'
import Alert from './ui/Alert'
import { useSetRecoilState } from 'recoil'
import { isLoggedIn } from './recoil/atoms'
import FormContainer from './ui/FormContainer'

interface FormErrors {
  username?: string
  password?: string
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authLoading, setauthLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showAlert, setShowAlert] = useState(false)
  const setisLoggedIn = useSetRecoilState(isLoggedIn)
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})

    try {
      const validatedData = AuthSchema.parse({ username, password })

      setauthLoading(true)
      const response = await axios.post(
        `${BASE_URL}/user/login`, 
        validatedData
      )
      if (response.status === 200) {
        setShowAlert(true)
        setTimeout(() => {
          setisLoggedIn(true) 
          localStorage.setItem('token', response.data.token) 
          setShowAlert(false)
        }, 1000)
      }
      setUsername('')
      setPassword('')
    } catch (error) {
      if (error instanceof ZodError) {
        const formErrors: FormErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formErrors[err.path[0] as keyof FormErrors] = err.message
          }
        })
        setErrors(formErrors)
      } else if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.message || 'An error occurred';
          switch (error.response.status) {
            case 403:
              setErrors({ password: errorMessage });
              break;
            case 411:
              setErrors({ 
                username: errorMessage.includes('username') ? errorMessage : undefined,
                password: errorMessage.includes('password') ? errorMessage : undefined
              });
              break;
            case 404:
              setErrors({ username: errorMessage });
              break;
            case 401:
              setErrors({ password: errorMessage });
              break;
            case 500:
              setErrors({ password: 'Server error. Please try again later.' });
              break;
            default:
              setErrors({ password: errorMessage });
          }
        } else if (error.request) {
          setErrors({ password: 'No response from server. Please check your connection.' });
        } else {
          setErrors({ password: 'Error setting up the request. Please try again.' });
        }
      } else {
        setErrors({ password: 'Login failed. Please try again.' });
      }
    } finally {
      setauthLoading(false)
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
    <div>  
      <FormContainer
      title="Login"
      subtitle="Welcome back! "
      onSubmit={handleSubmit}
      authLoading={authLoading}
      setUsername={setUsername}
      setPassword={setPassword}
    >
      <div>
        <Input
          value={username}
          onChange={handleUsernameChange}
          placeholder='Username...'
          disabled={authLoading}
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
          disabled={authLoading}
          label={'Password'}
          inputId={'password'}
        />
        {errors.password && (
          <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
        )}
      </div>

      <Button type='submit' variant='primary' disabled={authLoading}>
        {authLoading ? 'Logging in...' : 'Login'}
      </Button>
    </FormContainer>
    {showAlert && (
        <Alert text='Login Successful!' />
      )}
    </div>
  );
};

export default Login