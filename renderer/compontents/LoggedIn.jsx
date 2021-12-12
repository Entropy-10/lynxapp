import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react-is';

export default function LoggedIn(props) {
  return (
    <div>
      <Menu as="div" className="flex items-center">
        {({ open }) => (
          <Fragment>
            <img className="rounded-md h-10 w-10 ml-2 overflow-hidden object-cover" src={props.image} alt="profileImg"/>
            <Menu.Button className="inline-flex justify-center ml-1">
              <span className="mx-2">{props.username}</span>
              <svg className={`h-5 w-5 transition ease-linear duration-100 ${open ? "transform rotate-180" : "transform rotate-0"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Menu.Button>

            <Transition
              className="absolute ml-2 mb-32"
              show={open}
              enter="transform transition ease-in duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transform transition ease-out duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">

              <Menu.Items className="bg-lynx-bg-dark shadow-lg flex-col rounded p-2 text-sm w-36" static>
                <Menu.Item>
                  {({active}) => (
                    <button className={`pl-2 pr-16 py-1 rounded block ${active ? "bg-lynx-bg-mid-dark" : "text-lynx-text-light"}`} onClick={() => props.changeSelectedPage('settings')}>Settings</button>
                  )}
                </Menu.Item>
                
                <Menu.Item>
                  {({active}) => (
                    <button className={`pl-2 pr-20 py-1 rounded block ${active ? "bg-lynx-bg-mid-dark text-red-500" : "text-red-500"}`} onClick={() => props.signOut()}>Logout</button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Fragment>
        )}
      </Menu>
    </div>
  )
}