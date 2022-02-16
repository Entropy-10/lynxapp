import SearchBar from './SearchBar';
import { useState, useEffect} from  'react'
import { IoChevronDownOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import Checkbox from './Checkbox';
import { Disclosure, Transition } from '@headlessui/react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedArrayAZ, setSortedArrayAZ] = useState([]);
  const [sortedArrayZA, setSortedArrayZA] = useState([]);
  const [value, setValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode(!editMode);

  useEffect(() => {
    fetch('https://esttournaments.com/api/teams')
    .then(response => response.json()).catch((err) => console.log(err))
    .then(data => setTeams(data.data)).catch((err) => console.log(err));
  }, [])

  function searchHandler(searchTerm) {
    setSearchTerm(searchTerm);
    if(searchTerm !== '') {
      const newTeamsList = teams.filter(team => {
        const teamSearchArray = Object.values(team).concat(Object.values(team.teamInfo))
        return teamSearchArray.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
      })
      setSearchResults(newTeamsList);
    }
    else setSearchResults(teams);
  }

  function sortAZ() {
    setSortedArrayZA([]);
    setSortedArrayAZ(teams.sort((a, b) => {
      let x = a.osuUsername.toLowerCase();
      let y = b.osuUsername.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    }))
  }

  function sortZA() {
    setSortedArrayAZ([]);
    setSortedArrayZA(teams.sort((a, b) => {
      let x = a.osuUsername.toLowerCase();
      let y = b.osuUsername.toLowerCase();
      if (y < x) {return -1;}
      if (y > x) {return 1;}
      return 0;
    }))
  }

  function getAverageRank(captain, teammates) {
    let rankTotal = captain.rank;
    teammates.forEach(teammate => {
      rankTotal += teammate.rank;
    })
    return Math.round(rankTotal / (teammates.length + 1));
  }

  return (
    <div className="mt-7 ml-3">
      <div className='mb-3'>
        <SearchBar searchTerm={searchTerm} searchHandler={searchHandler} sortAZ={sortAZ} sortZA={sortZA}/>
        <div className="font-bold mt-8">
          <span className="mr-52 pr-1">Teams</span>
          <span className="mr-10">Player Count</span>
          <span className="mr-10">Approved?</span>
          <span className="">UTC</span>
        </div>
      </div>

      {searchTerm.length < 1 ? teams.map(team => (
        <div className='bg-lynx-bg-light rounded-lg w-3/4'>
          <Disclosure>
            <div key={team.osuId} className="p-2 mb-4 flex">
              
                  <img src={team.avatar} alt='player' className='rounded-md h-12 w-12' />
                  
                  <div className="inline-block">
                    <div className="mx-2 flex items-center">
                      {editMode ? 
                        (<input type="text"
                          className='w-20 bg-transparent border-b border-white border-dashed focus:outline-none' 
                          value={value} 
                          onChange={(e) => setValue(e.target.value)} 
                          onBlur={toggleEditMode} />) 
                      : (<span className='pr-2'>{value ? value : team.teamInfo.teamName}</span>)}
                      <button onClick={toggleEditMode}><BiEditAlt className={`text-lynx-text-dark ${editMode ? 'hidden' : ''}`}/></button>
                    </div>

                    <div>
                      <span className="mx-2 text-sm">{team.discordTag}</span>
                      <span className="text-sm">{team.teammates ? `#${getAverageRank(team, team.teammates).toLocaleString()}` : `#${team.rank.toLocaleString()}`}</span>
                    </div>
                  </div>
                  <div className="absolute flex items-center mt-3 ml-48">
                    <span className="ml-20 mr-28 pl-3">{team.teammates.length + 1}</span>
                    <span className="mr-14 px-2"><Checkbox approved={team.approved} /></span>
                    <span className='mr-10'>{team.timezone}</span>
                    <Disclosure.Button>
                    {({ open }) => (
                      <IoChevronDownOutline className={`transition ease-linear duration-100 ${open ? "transform rotate-180" : "transform rotate-0"}`} />
                      )}
                    </Disclosure.Button>
                </div>
            </div>

            <Disclosure.Panel>
              <div className="p-2 flex mb-4">
                <img src={team.avatar} alt='player' className='rounded-md h-12 w-12' />
                
                <div className="inline-block">
                  <div className="mx-2">{team.osuUsername}</div>
                  <div>
                    <span className="mx-2 text-sm">{team.discordTag}</span>
                    <span className="text-sm">#{team.rank.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {team.teammates.map(teammate => (
                <div key={teammate.osuId} className="p-2 flex mb-4">
                  <img src={teammate.avatar} alt='player' className='rounded-md h-12 w-12' />
                  
                  <div className="inline-block">
                    <div className="mx-2">{teammate.osuUsername}</div>
                    <div>
                      <span className="mx-2 text-sm">{teammate.discordTag}</span>
                      <span className="text-sm">#{teammate.rank.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Disclosure.Panel>
          </Disclosure>
        </div>
      ))
      : searchResults.map(team => (
        <div className='bg-lynx-bg-light rounded-lg w-3/4'>
          <Disclosure>
            <div key={team.osuId} className="p-2 mb-4 flex">
              
                  <img src={team.avatar} alt='player' className='rounded-md h-12 w-12' />
                  
                  <div className="inline-block">
                    <div className="mx-2 flex items-center">
                      <span className='pr-2'>{team.teamInfo.teamName}</span>
                      <button><BiEditAlt className='text-lynx-text-dark'/></button>
                    </div>

                    <div>
                      <span className="mx-2 text-sm">{team.discordTag}</span>
                      <span className="text-sm">{team.teammates ? `#${getAverageRank(team, team.teammates).toLocaleString()}` : `#${team.rank.toLocaleString()}`}</span>
                    </div>
                  </div>
                  <div className="absolute flex items-center mt-3 ml-48">
                    <span className="ml-20 mr-28 pl-3">{team.teammates.length + 1}</span>
                    <span className="mr-14 px-2"><Checkbox approved={team.approved} /></span>
                    <span className='mr-10'>{team.timezone}</span>
                    <Disclosure.Button>
                    {({ open }) => (
                      <IoChevronDownOutline className={`transition ease-linear duration-100 ${open ? "transform rotate-180" : "transform rotate-0"}`} />
                      )}
                    </Disclosure.Button>
                </div>
            </div>

            <Disclosure.Panel>
              <div className="p-2 flex mb-4">
                <img src={team.avatar} alt='player' className='rounded-md h-12 w-12' />
                
                <div className="inline-block">
                  <div className="mx-2">{team.osuUsername}</div>
                  <div>
                    <span className="mx-2 text-sm">{team.discordTag}</span>
                    <span className="text-sm">#{team.rank.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {team.teammates.map(teammate => (
                <div key={teammate.osuId} className="p-2 flex mb-4">
                  <img src={teammate.avatar} alt='player' className='rounded-md h-12 w-12' />
                  
                  <div className="inline-block">
                    <div className="mx-2">{teammate.osuUsername}</div>
                    <div>
                      <span className="mx-2 text-sm">{teammate.discordTag}</span>
                      <span className="text-sm">#{teammate.rank.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Disclosure.Panel>
          </Disclosure>
        </div>
      ))
      }
    </div>
  )
}