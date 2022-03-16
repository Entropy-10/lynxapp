import { useEffect, useState } from 'react'
import moment from 'moment'
import Store from 'electron-store'
import * as apiHooks from '../hooks/apiHooks'
import { CgSpinner } from 'react-icons/cg'

export default function Home (): JSX.Element {
  const [today, setDate] = useState(new Date())
  const store = new Store()
  const masterSchedule: any = store.get('masterSchedule')
  const { players, playersLoading } = apiHooks.useAllPlayers()
  const { soloplayers, soloplayersLoading } = apiHooks.useSoloplayers()
  const { teams, teamsLoading } = apiHooks.useTeams()

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 60 * 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])


  if(!players) return <CgSpinner className='ml-2 animate-spin' />
  return (
    <div className='grid grid-cols-3 mt-20'>
      <div className='w-56 h-56 flex items-center justify-center rounded-3xl bg-lynx-light'>
        <div>
          <div className='flex justify-center text-5xl font-bold'>{moment(today).format('h:mm a')}</div>
          <div className='flex justify-center text-lg'>{moment(today).format('MMMM Do')}</div>
        </div>
      </div>

      <div className='w-56 h-56 rounded-3xl flex items-center justify-center bg-lynx-light'>
        <div>
          <div className='flex justify-center text-xl'>Total Players</div>
          <div className='flex justify-center text-5xl font-bold my-5'>{playersLoading === true ? <CgSpinner className='ml-2 animate-spin' /> : players?.data.length}</div>
        </div>
      </div>

      <div className='w-56 h-full rounded-3xl row-span-3 bg-lynx-light'>
        <div className='flex justify-center text-2xl mt-2 font-bold'>Master Schedule</div>
        <div className='mt-3'>
          {masterSchedule?.map((event: {_id: number, event: string, date: Date}, index: number) => (
            <div key={event._id} className='flex justify-center'>
              <div>{event.event} | {moment(event.date).format('MMM Do, YYYY')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='w-56 h-56 mt-10 rounded-3xl flex items-center justify-center bg-lynx-light'>
        <div>
          <div className='flex justify-center text-xl'>Total Solo Players</div>
          <div className='flex justify-center text-5xl font-bold my-5'>{soloplayersLoading ? <CgSpinner className='ml-2 animate-spin' /> : soloplayers?.data.length}</div>
        </div>
      </div>

      <div className='w-56 h-56 mt-10 rounded-3xl flex items-center justify-center bg-lynx-light'>
        <div>
          <div className='flex justify-center text-xl'>Total Teams</div>
          <div className='flex justify-center text-5xl font-bold my-5'>{teamsLoading === true ? <CgSpinner className='ml-2 animate-spin' /> : teams?.data.length}</div>
        </div>
      </div>
    </div>
  )
}
