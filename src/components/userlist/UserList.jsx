import React, { useEffect } from 'react'
import { getUserListAsync, getUsers, getStatus, deleteUser } from './userListFunc'
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../utils/spinner'
import Heading from '../Heading';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers)
  const status = useSelector(getStatus)

  useEffect(() => {
    dispatch(getUserListAsync())
  }, [])

  return (
    <div className='p-16 h-screen'>
      {/* sample of a component that has been memoized to prevent re-render when the user list change due to deleting of a user */}
      <Heading classes="text-4xl font-bold" HeadingTag="h1" text="Users" />
      <div className='relative h-full'>
      {
        status === 'pending' ? (
          <div role="status" className='absolute inset-y-2/4 inset-x-2/4'>
              <Spinner />
              <span className="sr-only">Loading...</span>
          </div>
        ) : status === 'rejected' ? (<div className='absolute inset-y-2/4 flex flex-row items-center justify-center w-full'><p className='font-bold p-4 rounded-md shadow-2xl text-red-600'>There seems to be a problem. Please Try Again.</p></div>) : status === 'fulfilled' ? (
          <>
          <h2 className='sr-only'>List</h2>
          <ul className='grid grid-cols-12 gap-4 mt-8'>
            {
              users && users.length > 0 && users !== undefined ? (
                users.map((user, i) => {
                  return (
                    <li key={i} className='col-span-3 shadow-md hover:shadow-lg ease-out duration-300 p-4 rounded-md'>
                      <h3 className='text-2xl font-bold'>{user.name}</h3>
                      <div className='mt-6 flex flex-row justify-between'>
                        <div>
                          <p className='text-sm font-bold'>Email: <a className='font-normal hover:!underline hover:!decoration-current ease-out duration-500' style={{textDecorationColor: 'rgba(0,0,0,0)'}} href={`mailto:${user.email}`}>{user.email}</a></p>
                          <p className='text-sm font-bold'>Phone: <a className='font-normal hover:!underline hover:!decoration-current ease-out duration-500' style={{textDecorationColor: 'rgba(0,0,0,0)'}} href={`tel:+${user.phone}`}>{user.phone}</a></p>
                        </div>
                        <button className='border-none rounded-md bg-red-700 text-white hover:bg-red-600 ease-out duration-300 uppercase font-bold px-3 py-1.5' onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
                      </div>
                    </li>
                  )
                })
              ) : ''
            }
          </ul>
          </>
        ) : (
          <div role="status" className='absolute inset-y-2/4 inset-x-2/4'>
              <Spinner />
              <span className="sr-only">Loading...</span>
          </div>
        )
      }
    </div>
    </div>
  )
}

export default UserList