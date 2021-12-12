import React from 'react';
import { CgSpinner } from 'react-icons/cg';

export default function Login(props) {
  const [loader, setLoader] = React.useState(false)

  function renderLoader() {
    setLoader(true);
  }

  return (
    <div className="min-h-screen font-main text-lynx-text-light bg-gradient-to-r from-lynx-bg-light to-lynx-bg-dark">
      
      <div className="flex justify-center items-center">
        <div className="mt-14 flex items-center pb-4 pt-24 px-2">
          <img src='images/logo.png' alt="logo"
            className="rounded-full h-12 w-12 flex items-center justify-center overflow-hidden object-cover align-bottom mr-2" />
          <span className="pl-1 text-xl text-lynx-main font-bold">Lynx Admin Panel</span>
        </div>
      </div>

      <div className="flex justify-center mt-32">
        <button onClick={() => {props.signIn(props.providers.osu.id); renderLoader()}} className="bg-osu-btn flex text-white rounded-md py-4 px-8 transform duration-100 hover:scale-105">
          <span>Login With Osu!</span>
          {loader ? <CgSpinner className="mt-0.5 ml-2 animate-spin" /> : null}
        </button>
      </div>
    </div>
  )
}