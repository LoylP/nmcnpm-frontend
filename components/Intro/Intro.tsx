import { FaLocationDot } from "react-icons/fa6";
import { SiHotelsdotcom } from "react-icons/si";

const Intro = () => (
  <div className="">
    <h1 id="Intro" className="mt-6 text-cyan-900">
      <a href="#Intro">Introduction</a>
    </h1>
    <div className="flex gap-x-4 mt-6 items-center text-black">
      <div className={`cursor-pointer text-3xl`}>
        <SiHotelsdotcom />
      </div>
      <h1 className={` origin-left font-medium text-xl`}>
        HNP Hotel - Event Center is honored to serve you!
      </h1>
    </div>
    <a
      href="https://www.google.com/maps/place/University+of+Information+Technology+-+VNUHCM/@10.8700089,106.8004738,17z/data=!3m1!4b1!4m6!3m5!1s0x317527587e9ad5bf:0xafa66f9c8be3c91!8m2!3d10.8700089!4d106.8030541!16s%2Fm%2F02qqlmm?entry=ttu"
      target="_blank"
    >
      <div className="flex gap-x-4 mt-6 items-center text-black">
        <div className={`cursor-pointer text-3xl`}>
          <FaLocationDot />
        </div>
        <h1 className={` origin-left font-medium text-xl hover:bg-gray-400`}>
          Han Thuyen Street, Ward 6, Thu Duc District, Ho Chi Minh City, Vietnam
        </h1>
      </div>
    </a>

    <h4 className="origin-left font-medium text-xl mt-6 pb-4 text-black ">
      The intersection of Eastern culture - Saigon. A modern, minimalist space close to nature.
    </h4>
    <div>
      <h5 className="origin-left font-medium pb-4 text-black ">
        ⭐️ Buffet breakfast at the hotel restaurant
      </h5>
      <h5 className="origin-left font-medium pb-4 text-black ">
        ⭐️ Services enjoyed upon check-in
      </h5>
      <h5 className="origin-left font-medium pb-4 text-black ">
        ⭐️ Free use of swimming pool, playground, bar
      </h5>
      <h5 className="origin-left font-medium pb-4 text-black ">
        ⭐️ Early check-in / late check-out, room upgrade depending on hotel availability
      </h5>
      <h5 className="origin-left font-medium pb-4 text-black ">
        ⭐️ Consultation on tours, dining, and entertainment destinations here
      </h5>
    </div>

    <h4 className="border-b border-primary font-medium text-xl text-black mb-6 pb-4">
      Contact Hotline: 09 - for earliest assistance.
    </h4>
  </div>
);

export default Intro;