import SearchBar from './SearchBar';
import { useState, useEffect} from  'react'
import {IoCheckmarkSharp, IoCloseSharp} from 'react-icons/io5';
import Checkbox from './Checkbox';

export default function Freeplayers() {
  const [freeplayers, setFreeplayers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedArrayAZ, setSortedArrayAZ] = useState([]);
  const [sortedArrayZA, setSortedArrayZA] = useState([]);

  useEffect(() => {
    getPlayers()
    async function getPlayers() {
      await fetch('https://esttournaments.com/api/freeplayers')
      .then(response => response.json()).catch((err) => console.log(err))
      .then(data => setFreeplayers(data.data)).catch((err) => console.log(err));
    }
  }, [])

  function searchHandler(searchTerm) {
    setSearchTerm(searchTerm);
    if(searchTerm !== '') {
      const newPlayerList = freeplayers.filter(player => {
        return Object.values(player).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
      })
      setSearchResults(newPlayerList);
    }
    else setSearchResults(freeplayers);
  }

  function sortAZ() {
    setSortedArrayZA([]);
    setSortedArrayAZ(freeplayers.sort((a, b) => {
      let x = a.osuUsername.toLowerCase();
      let y = b.osuUsername.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    }))
  }

  function sortZA() {
    setSortedArrayAZ([]);
    setSortedArrayZA(freeplayers.sort((a, b) => {
      let x = a.osuUsername.toLowerCase();
      let y = b.osuUsername.toLowerCase();
      if (y < x) {return -1;}
      if (y > x) {return 1;}
      return 0;
    }))
  }

  return (
    <div className="mt-7 ml-3">
      <div className="mb-3">
        <SearchBar searchTerm={searchTerm} searchHandler={searchHandler} sortAZ={sortAZ} sortZA={sortZA}/>
        <div className="font-bold mt-8">
          <span className="mr-52 pr-2">Profile</span>
          <span className="mr-10">In Discord?</span>
          <span className="mr-14">Approved?</span>
          <span className="pl-1.5">UTC</span>
        </div>
      </div>

      {searchTerm.length < 1 ? freeplayers.map(player => (
        <div key={player.osuId} className="flex mb-4">
          <img src={player.avatar} alt='player' className='rounded-md h-12 w-12' />
          
          <div className="inline-block">
            <div className="mx-2">{player.osuUsername}</div>
            <div>
              <span className="mx-2 text-sm">{player.discordTag}</span>
              <span className="text-sm">#{player.rank.toLocaleString()}</span>
            </div>
          </div>
          <div className="absolute flex mt-3 ml-48">
            <span className="ml-24 mr-24 pl-1 pr-2">{player.inDiscord ? <IoCheckmarkSharp className='text-green-600' /> : <IoCloseSharp className='text-red-600' />}</span>
            <span className="mr-20 pr-3"><Checkbox approved={player.approved} /></span>
            <span>{player.timezone}</span>
          </div>
        </div>
      ))
    : searchResults.map(player => (
      <div key={player.osuId} className="flex mb-4">
          <img src={player.avatar} alt='player' className='rounded-md h-12 w-12' />
          
          <div className="inline-block">
            <div className="mx-2">{player.osuUsername}</div>
            <div>
              <span className="mx-2 text-sm">{player.discordTag}</span>
              <span className="text-sm">#{player.rank.toLocaleString()}</span>
            </div>
          </div>
          <div className="absolute flex mt-3 ml-48">
            <span className="ml-24 mr-24 pl-1 pr-2">{player.inDiscord ? <IoCheckmarkSharp className='text-green-600' /> : <IoCloseSharp className='text-red-600' />}</span>
            <span className="mr-20 pr-3"><Checkbox approved={player.approved} /></span>
            <span>{player.timezone}</span>
          </div>
        </div>
      ))
    }
    </div>
  )
}