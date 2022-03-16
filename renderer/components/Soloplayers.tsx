import { useState } from 'react'
import * as apiHooks from '../hooks/apiHooks'
import SearchBar from './SearchBar'
import Checkbox from './Checkbox'
import { IoCheckmarkSharp, IoCloseSharp } from 'react-icons/io5'
import { CgSpinner } from 'react-icons/cg'

export default function Soloplayers (): JSX.Element {
  const { soloplayers, soloplayersLoading } = apiHooks.useSoloplayers()
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortedArrayAZ, setSortedArrayAZ] = useState([])
  const [sortedArrayZA, setSortedArrayZA] = useState([])
  const playerList = searchTerm.length < 1 ? soloplayers.data : searchResults

  function searchHandler (searchTerm): void {
    setSearchTerm(searchTerm)
    if (searchTerm !== '') {
      const newPlayerList = soloplayers.data.filter(player => {
        return Object.values(player).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
      })
      setSearchResults(newPlayerList)
    } else setSearchResults(soloplayers.data)
  }

  function sortAZ (): void {
    setSortedArrayZA([])
    setSortedArrayAZ(soloplayers.data.sort((a, b) => {
      const x = a.osuUsername.toLowerCase()
      const y = b.osuUsername.toLowerCase()
      if (x < y) { return -1 }
      if (x > y) { return 1 }
      return 0
    }))
  }

  function sortZA (): void {
    setSortedArrayAZ([])
    setSortedArrayZA(soloplayers.data.sort((a, b) => {
      const x = a.osuUsername.toLowerCase()
      const y = b.osuUsername.toLowerCase()
      if (y < x) { return -1 }
      if (y > x) { return 1 }
      return 0
    }))
  }

  return (
    <div className='ml-3 h-full'>
      <div className='pt-7 mb-3'>
        <SearchBar searchTerm={searchTerm} searchHandler={searchHandler} sortAZ={sortAZ} sortZA={sortZA} />
        <div className='font-bold mt-8'>
          <span className='mr-52 pr-5'>Profile</span>
          <span className='mr-10'>On Team?</span>
          <span className='mr-12'>In Discord?</span>
          <span className='mr-14'>Approved?</span>
          <span className='pl-0.5'>UTC</span>
        </div>
      </div>

      {soloplayersLoading
        ? <CgSpinner className='ml-2 animate-spin' />
        : <>{playerList.map(player => (
          <div key={player.osuId} className='flex relative mb-4 pl-2 py-2 bg-lynx-light rounded-lg w-11/12'>
            <img src={player.avatar} alt='player' className='rounded-md h-12 w-12' />

            <div className='inline-block'>
              <span className='mx-2'>{player.osuUsername}</span>
              <div>
                <span className='mx-2 text-sm'>{player.discordTag}</span>
                <span className='text-sm'>#{player.rank.toLocaleString()}</span>
              </div>
            </div>
            <div className='absolute flex items-center mt-3 ml-48'>
              <span className='ml-24 mr-24 px-1'>{player.onTeam === true ? <IoCheckmarkSharp className='text-green-600' /> : <IoCloseSharp className='text-red-600' />}</span>
              <span className='mr-24 pr-3'>{player.inDiscord === true ? <IoCheckmarkSharp className='text-green-600' /> : <IoCloseSharp className='text-red-600' />}</span>
              <span className='mr-20 pr-2'><Checkbox approved={player.approved} /></span>
              <span>{player.timezone}</span>
            </div>
          </div>
        ))}
        </>}
    </div>
  )
}
