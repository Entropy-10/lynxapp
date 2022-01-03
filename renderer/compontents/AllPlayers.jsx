import SearchBar from './SearchBar';
import { useState, useEffect} from  'react'
import {IoCheckmarkSharp, IoCloseSharp} from 'react-icons/io5'
import Checkbox from './Checkbox';

export default function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedArrayAZ, setSortedArrayAZ] = useState([]);
  const [sortedArrayZA, setSortedArrayZA] = useState([]);

  useEffect(() => {
    fetch('https://esttournaments.com/api/players')
    .then(response => response.json()).catch((err) => console.log(err))
    .then(data => setPlayers(data.data)).catch((err) => console.log(err));
  }, [])

  function searchHandler(searchTerm) {
    setSearchTerm(searchTerm);
    if(searchTerm !== '') {
      const newPlayerList = players.filter(player => {
        return Object.values(player).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
      })
      setSearchResults(newPlayerList);
    }
    else setSearchResults(players);
  }

  function sortAZ() {
    setSortedArrayZA([]);
    setSortedArrayAZ(players.sort((a, b) => {
      let x = a.osuUsername.toLowerCase();
      let y = b.osuUsername.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    }))
  }

  function sortZA() {
    setSortedArrayAZ([]);
    setSortedArrayZA(players.sort((a, b) => {
      let x = a.osuUsername.toLowerCase();
      let y = b.osuUsername.toLowerCase();
      if (y < x) {return -1;}
      if (y > x) {return 1;}
      return 0;
    }))
  }

  return (
    <div className="mt-7 ml-3">
      <div className='mb-3'>
        <SearchBar searchTerm={searchTerm} searchHandler={searchHandler} sortAZ={sortAZ} sortZA={sortZA}/>
        <div className="font-bold mt-8">
          <span className="mr-52 pr-2">Profile</span>
          <span className="mr-10">On Team?</span>
          <span className="mr-12">In Discord?</span>
          <span className="mr-14">Approved?</span>
          <span className="pl-1.5">UTC</span>
        </div>
      </div>

      {searchTerm.length < 1 ? players.map(player => (
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
            <span className="ml-24 mr-24 px-1">{player.onTeam ? <IoCheckmarkSharp className='text-green-600' /> : <IoCloseSharp className='text-red-600' />}</span>
            <span className="mr-24 pr-3">{player.inDiscord ? <IoCheckmarkSharp className='text-green-600' /> : <IoCloseSharp className='text-red-600' />}</span>
            <span className="mr-20 pr-2"><Checkbox approved={player.approved} /></span>
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
            <span className="ml-24 mr-24 px-1">{player.onTeam ? <IoCheckmarkSharp className='text-green-600' /> : <IoCloseSharp className='text-red-600' />}</span>
            <span className="mr-24 pr-3">{player.inDiscord ? <IoCheckmarkSharp className='text-green-600' /> : <IoCloseSharp className='text-red-600' />}</span>
            <span className="mr-20 pr-2"><Checkbox approved={player.approved} /></span>
            <span>{player.timezone}</span>
          </div>
        </div>
      ))
    }
    </div>
  )
}