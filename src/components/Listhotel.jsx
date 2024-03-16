import { useState, useEffect, useRef } from 'react';
import hotelImg1 from '../assets/hotel1.jpg'
import hotelImg2 from '../assets/hotel2.jpg'
import hotelImg3 from '../assets/hotel3.jpg'
import hotelImg4 from '../assets/hotel4.jpg'
import hotelImg5 from '../assets/hotel5.jpg'
import hotelImg6 from '../assets/hotel6.jpg'
import hotelImg7 from '../assets/hotel7.jpg'
import hotelImg8 from '../assets/hotel8.jpg'
import hotelImg9 from '../assets/hotel9.jpg'
import hotelImg10 from '../assets/hotel10.jpg'
import hotelImg11 from '../assets/hotel11.jpg'
import hotelImg12 from '../assets/hotel12.jpg'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';

export default function ListHotel() {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        fullName: '',
        phoneNumber: '',
        email: ''
    });
    const dialogRef = useRef(null);

    const createBooking = "http://localhost:8000/api/v1/user/booking"

    const hotels = [
        { id: 1, name: 'Hotel 1', price: 1500, image: hotelImg1 },
        { id: 2, name: 'Hotel 2', price: 1000, image: hotelImg2 },
        { id: 3, name: 'Hotel 3', price: 1700, image: hotelImg3 },
        { id: 4, name: 'Hotel 4', price: 1600, image: hotelImg4 },
        { id: 5, name: 'Hotel 5', price: 1800, image: hotelImg5 },
        { id: 6, name: 'Hotel 6', price: 2000, image: hotelImg6 },
        { id: 7, name: 'Hotel 7', price: 1900, image: hotelImg7 },
        { id: 8, name: 'Hotel 8', price: 1500, image: hotelImg8 },
        { id: 9, name: 'Hotel 9', price: 2100, image: hotelImg9 },
        { id: 10, name: 'Hotel 10', price: 2500, image: hotelImg10 },
        { id: 11, name: 'Hotel 11', price: 2700, image: hotelImg11 },
        { id: 12, name: 'Hotel 12', price: 1500, image: hotelImg12 },
    ];

    const openCalendar = (hotel) => {
        setSelectedHotel(hotel);
        setIsCalendarOpen(true);
    };

    const closeCalendar = () => {
        setSelectedHotel(null);
        setIsCalendarOpen(false);
    };

    const openForm = () => {
        setIsCalendarOpen(false);
        setIsFormOpen(true);
    }

    const closeForm = () => {
        setSelectedHotel(null);
        setIsCalendarOpen(false);
        setIsFormOpen(false);
    }

    // const handleDateSelect = (date) => {
    //     console.log('Selected date:', date);

    //     closeCalendar();
    // };

    const handleSubmit = async (event) =>  {
        event.preventDefault();

        try {
            const response = await axios.post(createBooking, {
                user_id: localStorage.getItem("id"),
                checkin_date: formData.checkInDate,
                checkout_date: formData.checkOutDate,
                full_name: formData.fullName,
                phone_number: formData.phoneNumber,
                email: formData.email
            });

            console.log(response);

            if (response.data.status === 201) {
                console.log("Create Booking Success");
            } else {
                console.log("Create Booking Failed");
            }
        } catch (error) {
            console.log(error);
        }

        console.log('Form data:', formData);

        setFormData({
            checkInDate: '',
            checkOutDate: '',
            fullName: '',
            phoneNumber: '',
            email: ''
        });

        closeForm()
    };

    const HotelCalendar = ({ hotel }) => {
        const [events, setEvents] = useState([]);
    
        useEffect(() => {
            async function fetchBookings() {
                try {
                    const response = await axios.get("http://localhost:8000/api/v1/user/bookings");
                    console.log(response.data.bookings);
                    const bookings = response.data.bookings.map((booking) => {
                        const startDate = new Date(booking.checkin_date);
                        const endDate = new Date(booking.checkout_date);
                        return {
                            title: booking.status,
                            start: startDate,
                            end: endDate,
                            allDay: true,

                        };
                    });
                    setEvents(bookings);
                } catch (error) {
                    console.log('Error fetching bookings: ',error);
                }
            }
            fetchBookings();
        }, [hotel]);
    
        return (
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                height={500}
                selectable={true}
                navLinks={true}
                select={openForm}
                events={events}
                dateClick={(info) => {
                    const clickedDate = new Date(info.dateStr);
                    const formattedDate = clickedDate.toISOString().split('T')[0];
                    console.log(formattedDate);
                    setFormData({ ...formData, checkInDate: formattedDate });
                }}
            />
        );
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                closeCalendar();
                closeForm();
            }
        }
        if (isCalendarOpen || isFormOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else  {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCalendarOpen, isFormOpen]);

    return (
        <div className="mx-auto px-6 py-8">
            <div className="grid grid-cols-3 gap-8">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="flex flex-col items-center justify-center relative group">
                        <img 
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-auto cursor-pointer rounded-lg transition duration-150 transform group-hover:scale-105"
                            onClick={() => openCalendar(hotel)}
                        />
                        <div className="text-center mt-2">
                            <p>{hotel.name}</p>
                            <p>{hotel.price} THB</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Calendar Dialog */}
            {isCalendarOpen && selectedHotel && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <div ref={dialogRef} className="bg-white p-8 rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{selectedHotel.name}</h2>
                            <button className="bg-red-500 hover:bg-red-700 text-black rounded-full p-2" onClick={closeForm}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="">
                            <HotelCalendar hotel={selectedHotel} />
                        </div>
                    </div>
                </div>
            )}


            {/* Data Entry Form Dialog */}
            {selectedHotel && !isCalendarOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-xl">
                        <div className=" flex justify-between items-center ">
                        <h2 className="text-xl font-bold mb-4">{selectedHotel?.name}</h2>
                            <button className="bg-red-500 hover:bg-red-700 text-black rounded-full p-2" onClick={closeForm}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">
                                Check-in Date:
                                <input type="hidden" name="user_id" value={localStorage.getItem("id")} />
                                <input
                                    key={formData.checkInDate}
                                    type="date"
                                    value={formData.checkInDate}
                                    onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                                    className="border border-gray-300 rounded-md p-2 w-full mt-1"
                                />
                            </label>
                            <label className="block mb-2">
                                Check-out Date:
                                <input
                                key={formData.checkOutDate}
                                    type="date"
                                    value={formData.checkOutDate}
                                    onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                                    className="border border-gray-300 rounded-md p-2 w-full mt-1"
                                />
                            </label>
                            <label className="block mb-2">
                                Full Name:
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="border border-gray-300 rounded-md p-2 w-full mt-1"
                                />
                            </label>
                            <label className="block mb-2">
                                Phone Number:
                                <input
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    className="border border-gray-300 rounded-md p-2 w-full mt-1"
                                />
                            </label>
                            <label className="block mb-2">
                                Email:
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="border border-gray-300 rounded-md p-2 w-full mt-1"
                                />
                            </label>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full">Book Now</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
