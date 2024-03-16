import { useState, useRef, Fragment } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { CalendarTodayTwoTone, HotelTwoTone } from "@mui/icons-material";

// import "antd/dist/antd.css"; 
import { Calendar } from 'antd';
import { ExclamationTriangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";




function Background() {

    const [searchText, setSearchText] = useState('');
    const options = ['BKK the best No1.', 'KK never let your failed', 'UD city night'];
    const [selectedDate, setSelectedDate] = useState(null);

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    function classNames1(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    
    function DropdownHotel() {

        return (
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white max-h-48 h-20 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <div className="flex flex-col items-start justify-start">
                            <div className="mb-">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
                                    Hotel
                                </label>
                            </div>
                            <div className="flex items-start">
                                <HotelTwoTone
                                    className="mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <div className="pt-1">
                                    <label className="block text-gray-700 text-sm font-bold" htmlFor="search">
                                        {searchText || 'Select a hotel'}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Menu.Button>
                </div>
    
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {options.map((option, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames1(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            onClick={() => setSearchText(option)}
                                        >
                                            {option}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                            {options.length === 0 && (
                                <div className="px-4 py-2 text-sm text-gray-700">No matching hotels found.</div>
                            )}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        );
    }
        
    // dayjs.extend(advancedFormat);
    const ShowCalendar = ({ onDateClick }) => {
    
        return (
            <div className="flex justify-center items-center h-full">
                <div className="p-4 bg-white rounded-lg shadow-lg">
                    <div className="py-1">
                    <Calendar onChange={onDateClick} />
                    </div>
                </div>
            </div>
          );
    };
    
    function DropdownBook() {

        const handleDateClick = (value) => {
            setSelectedDate(value);
            setOpen(true);
        };
    
        return (
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white max-h-48 h-20 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <div className="flex flex-col items-start justify-start">
                            <div className="mb-">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
                                    Book
                                </label>
                            </div>
                            <div className="flex items-start">
                                <CalendarTodayTwoTone
                                    className="mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <div className="pt-1">
                                    <label className="block text-gray-700 text-sm font-bold" htmlFor="search">
                                        {selectedDate ? selectedDate.toISOString().split('T')[0] : 'Select a book date'}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Menu.Button>
                </div>
    
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <ShowCalendar onDateClick={handleDateClick}/>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        );
    }


    return (
        <div
            className="relative  box-border h-96 bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url('src/assets/bgPage1.jpg')`,
                filter: "blur(0px)",
            }}
        >

            <div className="max-w-screen-lg mx-auto bg-white rounded-md shadow-md p-6">
                <div className="flex items-center mb-4">
                    <div className="p-3 ">

                        <DropdownHotel />
                    </div>

                    {/* <div className="p-3">
                        <DropdownBook />
                    </div>

                    <div className="flex-none pt-0">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Book
                        </button>
                    </div> */}
                </div>
            </div>



        </div>
    );
}

export default Background;
