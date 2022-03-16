import { HiOutlineHome, HiOutlineUser, HiOutlineUsers, HiOutlineUserGroup, HiOutlineClipboardCheck, HiOutlineClock } from 'react-icons/hi'

export default function NavButtons (props): JSX.Element {
  return (
    <div className='space-y-6 ml-4 mt-10 font-semibold text-lg'>
      <button className='flex duration-75 hover:text-lynx-text-dark' onClick={() => props.changeSelectedPage('home')}>
        <HiOutlineHome className='h-6 w-6' />
        <span className='pl-3'>Home</span>
      </button>

      <button className='flex duration-75 hover:text-lynx-text-dark' onClick={() => props.changeSelectedPage('allplayers')}>
        <HiOutlineUserGroup className='h-6 w-6' />
        <span className='pl-3'>All Players</span>
      </button>

      <button className='flex duration-75 hover:text-lynx-text-dark' onClick={() => props.changeSelectedPage('teams')}>
        <HiOutlineUsers className='h-6 w-6' />
        <span className='pl-3'>Teams</span>
      </button>

      <button className='flex duration-75 hover:text-lynx-text-dark' onClick={() => props.changeSelectedPage('soloplayers')}>
        <HiOutlineUser className='h-6 w-6' />
        <span className='pl-3'>Solo Players</span>
      </button>

      <button className='flex duration-75 hover:text-lynx-text-dark' onClick={() => props.changeSelectedPage('scheduling')}>
        <HiOutlineClock className='h-6 w-6' />
        <span className='pl-3'>Scheduling</span>
      </button>

      <button className='flex duration-75 hover:text-lynx-text-dark' onClick={() => props.changeSelectedPage('screening')}>
        <HiOutlineClipboardCheck className='h-6 w-6' />
        <span className='pl-3'>Screening</span>
      </button>
    </div>
  )
}
