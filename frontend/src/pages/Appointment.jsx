import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendURL, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

    // const getAvailableSlots = async () => {
    //   if (!docInfo) return;
    //   setDocSlots([]);
    //   let today = new Date();

    //   for (let i = 0; i < 7; i++) { 
    //     let currentDate = new Date(today);
    //     currentDate.setDate(today.getDate() + i);

    //     let endTime = new Date();
    //     endTime.setDate(today.getDate() + i);
    //     endTime.setHours(21, 0, 0, 0);

    //     if (today.getDate() === currentDate.getDate()) {
    //       currentDate.setHours(
    //         currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
    //       );
    //       currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    //     } else {
    //       currentDate.setHours(10);
    //       currentDate.setMinutes(0);
    //     }

    //     let timeslots = [];
    //     while (currentDate < endTime) {
    //       let formattedTime = currentDate.toLocaleTimeString([], {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //       });
    //       let day = currentDate.getDate();
    //       let month = currentDate.getMonth() + 1;
    //       let year = currentDate.getFullYear();

    //       const slotDate = day + "_" + month + "_" + year;
    //       const slotTime = formattedTime;

    //       // ✅ Skip slot if it’s already booked
    //       const isSlotBooked =
    //         docInfo.slots_Booked &&
    //         docInfo.slots_Booked[slotDate] &&
    //         docInfo.slots_Booked[slotDate].includes(slotTime);

    //       if (!isSlotBooked) {
    //         timeslots.push({
    //           datetime: new Date(currentDate),
    //           time: formattedTime,
    //         });
    //       }

    //       currentDate.setMinutes(currentDate.getMinutes() + 30);
    //     }
    //     setDocSlots((prev) => [...prev, timeslots]);
    //   }
    // };
const getAvailableSlots = async () => {
  if (!docInfo) return;
  setDocSlots([]);
  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    let endTime = new Date();
    endTime.setDate(today.getDate() + i);
    endTime.setHours(21, 0, 0, 0);

    if (today.getDate() === currentDate.getDate()) {
      currentDate.setHours(
        currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
      );
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    let timeslots = [];
    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

      const slotDate = `${day}_${month}_${year}`;
      const slotTime = formattedTime;

      // ✅ Skip slot if it's already booked
      const isSlotBooked =
        docInfo.slots_booked &&               // 👈 changed to match DB field name
        docInfo.slots_booked[slotDate] &&
        docInfo.slots_booked[slotDate].includes(slotTime);

      if (!isSlotBooked) {
        timeslots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
      }

      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    // ✅ Only push non-empty days
    if (timeslots.length > 0) {
      setDocSlots((prev) => [...prev, timeslots]);
    }
  }
};

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to Book Appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;
      const { data } = await axios.post(
        backendURL + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Doctor Info Section */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Left: Doctor Image */}
          <div className="sm:w-1/4">
            <img
              className="bg-indigo-500 max-w-max-full rounded-lg object-cover "
              src={docInfo.image}
              alt="doctor"
            />
          </div>

          {/* Right: Doctor Details and Slots */}
          <div className="sm:w-4/6 flex flex-col gap-6">
            {/* Doctor Details */}
            <div className="border border-gray-400 rounded-lg p-7.5 bg-white">
              <p className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
                {docInfo.name}
                <img className="w-5 h-5" src={assets.verified_icon} />
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <span className="px-2 py-0.5 border text-xs rounded-full">
                  {docInfo.experience}
                </span>
              </div>
              <div className="mt-4">
                <p className="flex items-center gap-1 text-sm font-medium text-gray-800">
                  About <img src={assets.info_icon} />
                </p>
                <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
              </div>
              <p className="text-gray-600 font-medium mt-4">
                Appointment fee:{" "}
                <span className="text-gray-800">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>

            {/* Booking Slots */}
            <div>
              <p className="font-medium text-gray-700 mb-4">Booking slots</p>

              {/* Days */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {docSlots.length > 0 &&
                  docSlots.map((item, index) => (
                    <div
                      onClick={() => setSlotIndex(index)}
                      className={`text-center px-4 py-7 min-w-16 rounded-full cursor-pointer
                    ${
                      slotIndex === index
                        ? "bg-indigo-500 text-white"
                        : "border border-gray-300 text-gray-700"
                    }`}
                      key={index}
                    >
                      <p className="text-sm font-medium">
                        {item[0] &&
                          daysOfWeek[item[0].datetime.getDay()]}
                      </p>
                      <p className="text-sm">
                        {item[0] && item[0].datetime.getDate()}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Time Slots (horizontal scroll with scrollbar) */}
              <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                {docSlots.length > 0 &&
                  docSlots[slotIndex]?.map((item, index) => (
                    <p
                      className={`text-sm font-light px-4 py-2 rounded-full border cursor-pointer transition whitespace-nowrap
                    ${
                      slotTime === item.time
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "text-gray-700 border-gray-300 hover:bg-blue-100"
                    }`}
                      key={index}
                      onClick={() => setSlotTime(item.time)}
                    >
                      {item.time.toLowerCase()}
                    </p>
                  ))}

                {docSlots[slotIndex]?.length === 0 && (
                  <p className="text-red-500 text-sm">
                    No available slots today.
                  </p>
                )}
              </div>

              <button
                onClick={bookAppointment}
                className="bg-indigo-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer"
              >
                Book An Appointment
              </button>
            </div>
            {/* listing related doctors */}
            <RelatedDoctors
              docId={docId}
              speciality={docInfo.speciality}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
