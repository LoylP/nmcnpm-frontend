import { FaLocationDot } from "react-icons/fa6";
import { SiHotelsdotcom } from "react-icons/si";

const Index = () => (
  <div className="">
    <h1 className="mt-6 text-cyan-900"> Introduce</h1>
    <div className="flex gap-x-4 mt-6 items-center text-black">
      <div className={`cursor-pointer text-3xl`}>
        <SiHotelsdotcom />
      </div>
      <h1 className={` origin-left font-medium text-xl`}>
        HNP Hotel - Trung tâm sự kiện rất hân hạnh được phục vụ Quý Khách!
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
          Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam
        </h1>
      </div>
    </a>

    <h4 className="origin-left font-medium text-xl mt-6 pb-4 text-black ">
      Giao điểm của văn hóa Á Đông - Sài Gòn. Một không gian hiện đại, tối giản
      và gần gũi với thiên nhiên.
    </h4>
    <div>
      <h5 className="origin-left font-medium pb-4 text-black ">
        ⭐️ Bữa sáng buffer tại nhà hàng khách sạn
      </h5>
      <h5 className="origin-left font-medium pb-4 text-black ">
        ⭐️ Các dịch vụ được hưởng khi nhận phòng
      </h5>
      <h5 className="origin-left font-medium pb-4 text-black ">
        ⭐️ Miễn phí sử dụng bể bơi, khu trò chơi, bar
      </h5>
      <h5 className="origin-left font-medium pb-4 text-black ">
        ⭐️ Nhận phòng sớm / trả phòng muộn, nâng hạng phòng tùy thuộc tình
        trạng của khách sạn
      </h5>
      <h5 className="origin-left font-medium pb-4 text-black ">
        ⭐️ Tư vấn các tour du lịch các địa điểm ăn, chơi tại đây
      </h5>
    </div>

    <h4 className="border-b border-primary font-medium text-xl text-black mb-6 pb-4">
      Liên hệ Hotline: 09 - để được hỗ trợ sớm nhất.
    </h4>
  </div>
);

export default Index;
