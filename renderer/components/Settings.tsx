import { useState } from 'react'
import { HiOutlineClipboardCopy, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import SelectMenu from '../components/SelectMenu'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Store from 'electron-store'

const playerIntervals = [
  { id: 1, name: '5 minutes' },
  { id: 2, name: '15 minutes' },
  { id: 3, name: '30 minutes' },
  { id: 4, name: '1 hour' }
]

const sheetIntervals = [
  { id: 1, name: '30 minutes' },
  { id: 2, name: '1 hour' },
  { id: 3, name: '6 hours' },
  { id: 4, name: '12 hours' }
]

export default function Settings (): JSX.Element {
  const [selectedPlayerInterval, setPlayerInterval] = useState(playerIntervals[3])
  const [selectedSheetInterval, setSheetInterval] = useState(sheetIntervals[2])
  const [copied, setCopied] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [inputValue, setInputValue] = useState('')
  const [forceRender, setForceRender] = useState(0)
  const copyText = 'entropy@the-real-entropy-discord-bot.iam.gserviceaccount.com'
  const store = new Store()
  const masterSchedule: any = store.get('masterSchedule')

  function handleDeleteButtonClick (index) {
    masterSchedule.splice(index, 1)
    store.set('masterSchedule', masterSchedule)
    setForceRender((v) => v + 1)
  }

  function handleAddButtonClick () {
    console.log(inputValue, startDate)
    console.log(store.get('masterSchedule'))
    const newEvent = { event: inputValue, date: startDate }
    if (!store.get('masterSchedule')) {
      store.set('masterSchedule', [newEvent])
      setInputValue('')
    } else {
      const oldMasterSchedule: any = store.get('masterSchedule')
      store.set('masterSchedule', [...oldMasterSchedule, newEvent])
      setInputValue('')
    }
  }

  return (
    <div className='mt-10 h-1'>
      <div>
        <span className='text-xl'>Player Fetching</span>
        <div className='mt-7 text-md'>
          <span>Player Fetching Interval</span>
          <span className='ml-10'>Force Update</span>
        </div>
        <div className='flex'>
          <SelectMenu selected={selectedPlayerInterval} setSelected={setPlayerInterval} options={playerIntervals} />
          <button className='bg-lynx-very-dark hover:text-lynx-text-dark px-3 ml-16 rounded-lg '>Update Players</button>
        </div>
      </div>

      <div className='w-3/4 h-0.5 bg-white my-10' />

      <div>
        <span className='text-xl'>Google Sheets Details</span>
        <div className='mt-7 text-md'>
          <span>Sheet Id</span>
          <span className='ml-48'>Bot Email</span>
          {copied ? <span className='ml-24 bg-lynx-bg-light rounded-lg px-2'>copied!</span> : null}
        </div>
        <div className='flex'>
          <input className='bg-lynx-very-dark focus:outline-none rounded-lg pl-2' type='text' placeholder='Enter Sheet Id...' />
          <div className='bg-lynx-very-dark rounded-lg px-3 pr-6 py-2 w-56 truncate relative ml-14'>
            <span className='truncate'>entropy@the-real-entropy-discord-bot.iam.gserviceaccount.com</span>
            <CopyToClipboard onCopy={() => setCopied(true)} text={copyText}>
              <button onClick={() => setCopied(true)} className='absolute right-0 mt-0.5 mr-2 hover:text-lynx-text-dark'>
                <HiOutlineClipboardCopy />
              </button>
            </CopyToClipboard>
          </div>
        </div>

        <div className='mt-5'>
          <div className='text-md'>
            <span>Sheet Fetching Interval</span>
            <span className='ml-10'>Force Update</span>
          </div>
          <div className='flex'>
            <SelectMenu selected={selectedSheetInterval} setSelected={setSheetInterval} options={sheetIntervals} />
            <button className='bg-lynx-very-dark hover:text-lynx-text-dark px-3 ml-16 rounded-lg '>Update Sheets</button>
          </div>
        </div>
      </div>

      <div className='w-3/4 h-0.5 bg-white my-10' />

      <div>
        <span className='text-xl'>Master Schedule Editor</span>
        <div className='text-md mt-5'>
          <span>Event Name</span>
          <span className='ml-36'>Date</span>
        </div>
        <div className='flex'>
          <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='bg-lynx-very-dark focus:outline-none rounded-lg pl-2' type='text' placeholder='Enter Name...' />

          <div className='ml-8'>
            <DatePicker className='bg-lynx-very-dark rounded-lg pl-5 w-28 flex' selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>

          <div className='ml-2'>
            <button className='hover:text-lynx-text-dark' onClick={() => handleAddButtonClick()}><HiOutlinePlus /></button>
          </div>
        </div>

        <div className='mt-2'>
          {masterSchedule?.map((event, index) => (
            <div className='flex mt-1' key={index}>
              <div className='w-48 pl-2 truncate rounded-lg bg-lynx-dark text-lynx-text-dark'>{event.event}</div>
              <div className='ml-8 bg-lynx-dark text-lynx-text-dark rounded-lg pl-3 w-28'>{moment(event.date).format('MMM Do, YYYY')}</div>
              <button className='hover:text-lynx-text-dark ml-2' onClick={() => handleDeleteButtonClick(index)}><HiOutlineTrash /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
