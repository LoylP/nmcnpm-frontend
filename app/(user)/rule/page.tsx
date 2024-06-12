import React from "react";
import Image from "next/image";
import Menu from "../../../components/Nav/Menu";
import Header from "../../../components/Nav/Header";
import LobbyImage from "../../../public/statics/images/lobby.jpg"; 

const rulesData = [
  "Regular check-in time: 2:00 pm",
  "Regular check-out time: 12:00 pm",
  "Reservations for hours of your choice will incur an additional fee",
  "No smoking allowed in rooms",
  "No pets allowed",
  "No more than 4 people can stay in 1 room",
  "No outside food or drink allowed in the restaurant area",
  "Causing damage to hotel property will require compensation according to regulations",
];

const webBookingRules = [
  "Only registered users can make bookings.",
  "Each user can book a maximum of 3 rooms per reservation.",
  "Booking modifications or cancellations must be made at least 24 hours prior to check-in time.",
  "Payment must be made in full at the time of booking.",
];

const RulesPage = () => {
  const services = [
    { name: "Home", url: "/" },
    { name: "Booking", url: "/booking" },
    { name: "Services", url: "/service" },
    { name: "Explore", url: "/explore" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-800">
      <Menu />
      <main className="flex-1">
        <div className="sticky top-0 bg-black opacity-80 text-white z-50">
          <Header services={services} isUser={true} />
        </div>
        <div className="p-8">
          <div className="mb-8 relative h-96">
            <Image src={LobbyImage} alt="Lobby" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
          <h1 className="text-3xl font-bold text-yellow-500 mb-8">Hotel Rules</h1>
          <h2 className="text-xl font-bold mb-4 text-green-500">General rules:</h2>
          <ul className="list-disc list-inside text-white">
            {rulesData.map((rule, index) => (
              <li key={index} className="mb-4">{rule}</li>
            ))}
          </ul>
          <h2 className="text-xl font-bold text-green-500 mt-8 mb-4">Web Booking Rules:</h2>
          <ul className="list-disc list-inside text-white">
            {webBookingRules.map((rule, index) => (
              <li key={index} className="mb-4">{rule}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default RulesPage;
