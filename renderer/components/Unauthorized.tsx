export default function Unauthorized (): JSX.Element {
  return (
    <div className='min-h-screen font-main text-lynx-text-light bg-gradient-to-r from-lynx-light to-lynx-mid-dark'>

      <div className='flex justify-center items-center'>
        <div className='mt-14 flex items-center pb-4 pt-24 px-2'>
          <img src='/images/logo.png' alt='logo' className='rounded-full h-12 w-12 mr-2' />
          <span className='pl-1 text-xl font-bold'>Lynx Admin Panel</span>
        </div>
      </div>

      <div className='flex justify-center mt-32'>
        Sorry but you need to be an a authorized user in order to gain access.
      </div>
    </div>
  )
}
