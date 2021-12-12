import { useState, useEffect } from 'react';
import Head from 'next/head';
import NavButtons from '../compontents/NavButtons';
import LoggedIn  from '../compontents/LoggedIn';
import Home from '../compontents/Home';
import AllPlayers from '../compontents/AllPlayers';
import Freeplayers from '../compontents/Freeplayers';
import Teams from '../compontents/Teams';
import Scheduling from '../compontents/Scheduling';
import Screening from '../compontents/Screening';
import Login from '../compontents/Login';
import Unauthorized from '../compontents/Unauthorized';
import Settings from '../compontents/Settings';

import { useSession, getProviders, signIn, signOut } from 'next-auth/react';

function Admin() {
  const { data: session } = useSession()
  const [providers, setproviders] = useState(null);
  const [selectedPage, setSelectedPage] = useState('home');

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    }
    setTheProviders();
  }, [])

  function changeSelectedPage(page) {
    setSelectedPage(page)
  }

  if (session && session.user.email === 'authorized') {
    return (
      <div className="">
        <Head>
          <title>Lynx Admin Panel</title>
        </Head>
        <div className="min-h-screen flex font-main text-lynx-text-light">
          <nav className="bg-gradient-to-r from-lynx-bg-light to-lynx-bg-dark text-lynx-text-light w-72">

            <div className="mt-10 ml-4">
              <span className="text-xl font-bold">Lynx Admin Panel</span>
            </div>

            <NavButtons changeSelectedPage={changeSelectedPage}/>

            <div className="absolute flex items-center bottom-0 ml-4 mb-5">
              <LoggedIn username={session.user.name} image={session.user.image} signOut={signOut} changeSelectedPage={changeSelectedPage} />
            </div>
          </nav>

          <div className="flex-1 bg-lynx-bg-dark">
            {selectedPage === "home" && <Home />}
            {selectedPage === "allplayers" && <AllPlayers />}
            {selectedPage === "teams" && <Teams />}
            {selectedPage === "freeplayers" && <Freeplayers />}
            {selectedPage === "scheduling" && <Scheduling />}
            {selectedPage === "screening" && <Screening />}
            {selectedPage === "settings" && <Settings />}
          </div>
        </div>
      </div>
    )
  }
  else if(session && session.user.email === 'unauthorized') return <Unauthorized />
  else return <Login signIn={signIn} providers={providers}/>
}

export default Admin;