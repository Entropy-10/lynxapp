import SearchBar from './SearchBar';
import { useState, useEffect} from  'react'

export default function Freeplayers() {
  const [freeplayers, setFreeplayers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/freeplayers')
    .then(response => response.json()).catch((err) => console.log(err))
    .then(data => setFreeplayers(data)).catch((err) => console.log(err));
  }, [])

  function searchHandler(searchTerm) {
    setSearchTerm(searchTerm);
    if(searchTerm !== '') {
      const newPlayerList = freeplayers.filter(player => {
        console.log(Object.values(player).join(' ').toLowerCase());
        return Object.values(player).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
      })
      setSearchResults(newPlayerList);
    }
    else setSearchResults(freeplayers);
  }

  return (
    <div>
      <div>
        <SearchBar searchTerm={searchTerm} searchHandler={searchHandler}/>
        <div className="text-lynx-main font-bold">
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
          <div className="absolute mt-3 ml-48">
            <span className="ml-24 mr-24">{player.inDiscord ? 'Yes' : 'No'}</span>
            <span className="mr-24">{player.approved ? 'Yes' : 'No'}</span>
            <span>{player.timezone}</span>
          </div>
        </div>
      ))
    : searchResults.map(player => (
      <div key={player.osuId} className="flex mb-4">
        <button onClick={() => getPlayerData(player.osuId)}>
          <img src={player.avatar} alt='player' className='rounded-md h-12 w-12' />
        </button>
        
        <div className="inline-block">
          <span className="mx-2">{player.osuUsername}</span>
          <div>
            <span className="mx-2 text-sm">{player.discordTag}</span>
            <span className="text-sm">#{player.rank.toLocaleString()}</span>
          </div>
        </div>

        <div className="absolute mt-3 ml-48">
          <span className="ml-24 mr-24">{player.inDiscord ? 'Yes' : 'No'}</span>
          <span className="mr-24">{player.approved ? 'Yes' : 'No'}</span>
          <span>{player.timezone}</span>
        </div>
      </div>
      ))
    }
    </div>
  )
}