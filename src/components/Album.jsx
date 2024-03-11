import { useEffect, useState, useRef, Fragment } from 'react';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon, ExclamationTriangleIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition } from '@headlessui/react'
import { Add, AddAlarm, AddBox, AddCard } from '@mui/icons-material';



const authenURL = "http://localhost:8000/api/v1/user/users";
const registerURL = "http://localhost:8000/api/v1/user/register";

const perPage = 5;

function Album() {

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repassword, setRepassword] = useState('');

  let flagReset = null

  useEffect(() => {

    try {
      const token = localStorage.getItem("token");
      axios.get(authenURL, {
        headers: {
          "authorization": `Bearer ${token}`
        }

      })
        .then((response) => {
          console.log(response);

          if (response.data.status === 200) {
            console.log("Authentication Success");
            setUsers(response.data.users)
          } else {
            console.log("Authentication Failed");
            window.location.href = "/login"
          }
        })

    } catch (error) {
      console.log(error);
    }

  }, [])

  const totalPages = Math.ceil(users.length / perPage)
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  const isValidEmail = (value) => {
    // ตรวจสอบรูปแบบของ Email ในที่นี้ให้ง่ายๆ โดยใช้ Regular Expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async () => {
    // event.preventDefault();

    const registerForm = { email, password };

    if (registerForm.email === "" || !isValidEmail(registerForm.email)) {
      setEmailError('Email is required');
      return;
    }
    setEmailError('');

    if (registerForm.password === "" || registerForm.password !== repassword) {
      setPasswordError('Password is required');
      console.log("Password not match");
      return;
    }
    setPasswordError('');

    try {
      const response = await axios.post(registerURL, {
        email: registerForm.email,
        password: registerForm.password
      });

      console.log(response);

      if (response.data.status === 201) {
        console.log("Register Success");
        localStorage.setItem("token", response.data.token);
        flagReset = true
        setOpen(false)
      } else {
        flagReset = false
        console.log("Register Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const AddPopup = () => {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-tl-2xl rounded-br-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-96 sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <UserCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                          Add User
                        </Dialog.Title>

                        <form onSubmit={() => {handleSubmit()}}>
                          <div className="mt-3">
                            <div>
                              <label className="text-sm text-gray-500 ">
                                Email
                              </label> <br />
                              <input
                                type="email"
                                className="mt-1 px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring focus:border-blue-100"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                            </div>

                            <div>
                              <label htmlFor="newEmail" className="text-sm text-gray-500">
                                Password
                              </label> <br />
                              <input
                                type="password"
                                className="mt-1 px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring focus:border-blue-100"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                            </div>

                            <div>
                              <label htmlFor="newEmail" className="text-sm text-gray-500">
                                Re-Password
                              </label> <br />
                              <input
                                type="password"
                                className="mt-1 px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring focus:border-blue-100"
                                placeholder="Enter Re-Password"
                                value={repassword}
                                onChange={(e) => setRepassword(e.target.value)}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-10">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        handleSubmit()
                        setEmail('');
                        setPassword('');
                        setRepassword('');
                        if (flagReset === true) {
                          setOpen(false)
                        }
                      }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  const Pagination = () => {
    return (
      <thead>
        <tr className="border-b  hover:bg-gray-100 ">
          <th className="px-4 py-2  text-xs font-medium tracking-wider leading-8 " colSpan="4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                <p >
                  Showing {startIndex + 1} to {Math.min(endIndex, users.length)} of {users.length} results
                </p>
              </div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a
                  // href=""
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                {Array.from(Array(totalPages).keys()).map((index) => (
                  <a
                    key={index + 1}
                    // href=""
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === index + 1 ? 'bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                  >
                    {index + 1}
                  </a>
                ))}
                <a
                  // href=""
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </th>
        </tr>
      </thead>
    )
  }

  const renderTable = (
    <div className='bg-blend-normal' style={{ backgroundImage: `url('src/assets/food1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', filter: 'blur(0px)'}}>
      
    <div className="flex justify-center pt-20">
    <div className="w-full lg:w-2/3 xl:w-1/2">
      <div className="flex items-center justify-between">
        <div className="pl-6">
          <h1 className="text-lg font-semibold">
            Users List
          </h1>
        </div>
        <div className="pr-6">
          {AddPopup()}
          <button className="uppercase text-black hover:text-black bg-green-500" onClick={() => {
            setOpen(true)
          }}>
            Add
          </button>
        </div>
      </div>
      <table className="table w-full text-left shadow-lg rounded-lg mx-auto bg-white opacity-90">
        <thead>
          <tr className="border-b  hover:bg-gray-100 ">
            <th className="px-4 py-2  text-xs font-medium text-left uppercase tracking-wider leading-8">
              ID
            </th>
            <th className="px-4 py-2 text-xs font-medium text-left uppercase tracking-wider leading-8">
              Email
            </th>
            <th className="px-4 py-2 text-xs font-medium text-left uppercase tracking-wider leading-8">
              Last modified
            </th>
            <th className="px-4 py-2 text-xs font-medium text-left uppercase tracking-wider leading-8 flex justify-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && (
            currentUsers.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-4 text-sm leading-5 font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-4 py-4 text-sm leading-5 font-medium text-gray-900">
                  {item.email}
                </td>
                <td className="px-4 py-4 text-sm leading-5 font-medium text-gray-900">
                  {item.timestamp}
                </td>
                <td className="px-4 py-4 text-sm leading-5 font-medium text-gray-900 flex justify-center ">
                  <div className="space-x-8">
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700 focus:outline-none px-0"
                    >
                      <span className="text-xl">✒️</span>
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 focus:outline-none px-0"
                    >
                      <span className="text-xl">️🗑️</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
        {Pagination()}
      </table>
    </div>
  </div>
  </div>
  )

  return (
    <>{renderTable}</>
  );
  }


export default Album