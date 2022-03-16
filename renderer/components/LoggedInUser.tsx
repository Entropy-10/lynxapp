import React from 'react'
import { IoChevronDownOutline } from 'react-icons/io5'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react-is'

export default function LoggedInUser (props): JSX.Element {
  return (
    <div className='w-56 ml-2 fixed bottom-3'>
      <Menu as='div' className='relative inline-block text-left'>
        {({ open }) => (
          <Fragment>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='ml-2.5 w-46 bg-lynx-dark rounded-md'>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-lynx-mid-dark' : ''} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => props.changeSelectedPage('settings')}
                      >
                        <span>Settings</span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`text-red-500 ${active ? 'bg-lynx-mid-dark' : ''} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => props.signOut()}
                      >
                        <span>Logout</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>

            <div>
              <Menu.Button className='inline-flex justify-center items-center ml-1 mt-2'>
                <img className='rounded-md h-10 w-10 ml-2' src={props.image} alt='profileImg' />
                <span className='mx-2'>{props.username}</span>
                <IoChevronDownOutline className={`transition ease-linear duration-100 ${open ? 'transform rotate-180' : 'transform rotate-0'}`} />
              </Menu.Button>
            </div>
          </Fragment>
        )}
      </Menu>
    </div>
  )
}
