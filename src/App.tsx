import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilValue } from "recoil"
import Landing from "./components/Landing"
import Dashboard from "./components/Dashboard"
import LostPage from './components/LostPage'
import SharedContent from "./components/SharedContent"
import { isLoggedIn } from "./components/recoil/atoms"

function App() {
  const UserLogin = useRecoilValue(isLoggedIn)
  const token = localStorage.getItem('token')
  
  return (
    <Router>
      <div className="min-h-screen w-full overflow-x-hidden">
        <Routes>
          <Route 
            path="/" 
            element={ UserLogin || token ? <Navigate to='/dashboard' /> : <Landing />} 
          />
          
          <Route 
            path="/dashboard" 
            element={UserLogin || token ? <Dashboard /> : <Navigate to="/" replace />} 
          />
          
          <Route 
            path="/shared/:sharelink" 
            element={<SharedContent />} 
          />
          <Route
            path='/*'
            element={<LostPage />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App