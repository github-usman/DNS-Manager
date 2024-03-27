import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
          <div className=" w-full  pt-[100px] ">
            <form >
              <div className="max-w-[1240px] text-center font-bold mx-auto flex flex-col justify-center items-center">
                <input
                  className="px-2 py-4  my-4 w-[95%] max-w-[700px]  rounded"
                  type="text"
                  placeholder="Enter Your Name"
                  
                />
                <input
                  className="px-2 py-4  my-4  w-[95%] max-w-[700px] rounded"
                  type="tel"
                  placeholder="Mobile Number"
                  
                />
                <div className="pt-[100px]">
                  <Link to={'/dashboard'}
                    type="submit"
                    className="bg-black px-10 p-3 text-[#fff] rounded hover:text-[#000] hover:bg-[#fff]"
                  >
                    Next
                  </Link>

                  <h1> I am WORKING ON IT PLEASE PROCEED NEXT USING 'Next' </h1>
                </div>
              </div>
            </form>
          </div>
  )
}

export default LoginPage