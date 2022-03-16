import { useState, useEffect } from 'react'
import Login from '../components/Login'
import NavButtons from '../components/NavButtons'
import LoggedInUser from '../components/LoggedInUser'
import Home from '../components/Home'
import Allplayers from '../components/Allplayers'
import Soloplayers from '../components/Soloplayers'
import Teams from '../components/Teams'
import Settings from '../components/Settings'

import { useSession, getProviders, signIn, signOut } from 'next-auth/react'

function Admin (): JSX.Element {
  const { data: session } = useSession()
  const [providers, setproviders] = useState(null)
  const [selectedPage, setSelectedPage] = useState('home')

  useEffect(() => {
    async function setTheProviders (): Promise<void> {
      const setupProviders = await getProviders()
      setproviders(setupProviders)
    }
    void setTheProviders()
  }, [])

  function changeSelectedPage (page: string): void {
    setSelectedPage(page)
  }

  if (session !== null && session.user.authorization === true) {
    
    return (
      <div className='columns-2 gap-0 flex max-h-screen text-lynx-text-light font-main'>
        <nav className='bg-gradient-to-r from-lynx-light to-lynx-mid-dark w-72'>
          <div className='mt-10 ml-4'>
            <span className='text-xl font-bold'>Lynx Admin Panel</span>
          </div>

          <NavButtons changeSelectedPage={changeSelectedPage} />

          <LoggedInUser username={session?.user.name} image={session?.user.image} signOut={signOut} changeSelectedPage={changeSelectedPage} />
        </nav>

        <div className='bg-lynx-mid-dark w-full flex-auto min-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-lynx-dark scrollbar-track-lynx-light scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
          {selectedPage === 'home' && <Home />}
          {selectedPage === 'allplayers' && <Allplayers />}
          {selectedPage === 'soloplayers' && <Soloplayers />}
          {selectedPage === 'teams' && <Teams />}
          {selectedPage === 'settings' && <Settings />}
        </div>
      </div>
    )
  } else if (session !== null && session.user !== false) return <div>Unauthorized</div>
  else return <Login signIn={signIn} providers={providers} />
}

export default Admin
