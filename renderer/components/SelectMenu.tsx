import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsCheck } from 'react-icons/bs'
import { HiOutlineSelector } from 'react-icons/hi'

export default function SelectMenu (props): JSX.Element {
  return (
    <div>
      <div className='w-32 text-main'>
        <Listbox value={props.selected} onChange={props.setSelected}>
          <div className='relative'>
            <Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-lynx-very-dark rounded-lg cursor-pointer focus:outline-none '>
              <span className='block'>{props.selected.name}</span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <HiOutlineSelector className='h-5 w-5' />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave='transform transition ease-out duration-75'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >

              <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto bg-lynx-very-dark rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {props.options.map((interval, intervalId) => (
                  <Listbox.Option
                    key={intervalId}
                    className={({ active }) => `${active ? 'bg-lynx-dark' : 'text-lynx-text-light'} cursor-default select-none relative py-2 pl-10 pr-4`}
                    value={interval}
                  >

                    {({ selected, active }) => (
                      <div>
                        <span className={`${selected ? 'font-semibold' : 'font-normal'} block`}>
                          {interval.name}
                        </span>
                        {selected
                          ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                              <BsCheck className='w-5 h-5' aria-hidden='true' />
                            </span>)
                          : null}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  )
}
