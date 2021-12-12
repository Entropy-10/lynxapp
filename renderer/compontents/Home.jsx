import { useEffect, useState } from 'react';
import moment from 'moment';

export default function Home() {
  const [today, setDate] = useState(new Date());
  const [playersCount, setPlayersCount] = useState([]);
  const [freeplayersCount, setFreeplayersCount] = useState([]);
  const [teamsCount, setTeamsCount] = useState([]);
  const [masterSchedule, setMasterSchedule] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/players')
    .then(response => response.json()).catch((err) => console.log(err))
    .then(data => setPlayersCount(data.length)).catch((err) => console.log(err));

    fetch('http://localhost:4000/freeplayers')
    .then(response => response.json()).catch((err) => console.log(err))
    .then(data => setFreeplayersCount(data.length)).catch((err) => console.log(err));
  }, [])
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])

  return (
    <div className="grid grid-cols-3 mt-28">
      <div className="w-56 h-56 flex items-center justify-center rounded-3xl bg-lynx-bg-light">
        <div>
          <div className="flex justify-center text-5xl font-bold">{moment(today).format('h:mm a')}</div>
          <div className="flex justify-center text-lg">{moment(today).format('MMMM Do')}</div>
        </div>
      </div>

      <div className="w-56 h-56 rounded-3xl flex items-center justify-center bg-lynx-bg-light">
        <div>
          <div className="flex justify-center text-xl">Total Players</div>
          <div className="flex justify-center text-5xl font-bold my-5">{playersCount}</div>
        </div>
      </div>

      <div className="w-56 h-full rounded-3xl row-span-3 bg-lynx-bg-light">
        <div className="flex justify-center text-2xl mt-2 font-bold">Master Schedule</div>
        <div className="mt-3">
          {masterSchedule?.map(event => (
            <div className="flex justify-center">
              <div key={event._id}>{event.event} | {moment(event.date).format('MMM Do, YYYY')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-56 h-56 mt-10 rounded-3xl flex items-center justify-center bg-lynx-bg-light">
        <div>
          <div className="flex justify-center text-xl">Total Freeplayers</div>
          <div className="flex justify-center text-5xl font-bold my-5">{freeplayersCount}</div>
        </div>
      </div>

      <div className="w-56 h-56 mt-10 rounded-3xl flex items-center justify-center bg-lynx-bg-light">
        <div>
          <div className="flex justify-center text-xl">Total Teams</div>
          <div className="flex justify-center text-5xl font-bold my-5">{teamsCount.length}</div>
        </div>
      </div>
    </div>
  )
}