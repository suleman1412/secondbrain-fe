import { useRecoilValue } from "recoil"
import Landing from "./components/Landing"
import { isLoggedIn } from "./components/recoil/atoms"
import Dashboard from "./components/Dashboard"

function App() {
  const UserLogin = useRecoilValue(isLoggedIn)
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
        { UserLogin ? <Dashboard/> : <Landing />}
    </div>
  )
}

export default App