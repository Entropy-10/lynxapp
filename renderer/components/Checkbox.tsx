import { IoCheckmarkSharp } from 'react-icons/io5'

export default function Checkbox (props): JSX.Element {
  return (
    <div className='flex items-center'>
      <input type='checkbox' id='A3-yes' name='A3-confirmation' value='yes' checked={props.approved} className='opacity-0 absolute h-8 w-8' />
      <div className='bg-lynx-dark rounded w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500'>
        <IoCheckmarkSharp className='text-green-600 hidden pointer-events-none' />
      </div>
    </div>
  )
}
