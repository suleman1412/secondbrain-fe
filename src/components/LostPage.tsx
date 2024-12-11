import { useNavigate } from "react-router-dom"
import Heading from "./ui/Heading"

const LostPage = () => {
  const navigate = useNavigate()
  return (
    <div className="h-screen gap-6 flex flex-col justify-center items-center p-6">
        <div>
          <Heading variant="primary" className="text-[2rem]">
              Lost in thought?
          </Heading>
          <Heading variant="secondary" size="xs" className="text-center">
              Looks like this page is too! 
              <br />
              Let's get you back on 
              <span 
                className="ml-1 cursor-pointer relative font-bold text-[#cdcdcd] hover:text-[#fcfcfc]"
                onClick={() => navigate('/')}
              >
                track
              </span>
          </Heading>
        </div>
        <img src="/lost.svg" className="w-full md:w-[450px] lg:w-[500px] p-10" alt="Lost" />
    </div>
  )
}

export default LostPage
