import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
const TopDonors = () => {
    return (
        <div className="mb-10 px-5">
            <Swiper
        slidesPerView={2}
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 9,
            },
          }}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className='text-center'>
                <img className="md:h-[250px] h-[200px] w-[200px] md:w-[250px]  rounded-full border-2 mx-auto" src="https://i.ibb.co/wSDR1xF/ad.jpg" alt="img" />
                <h2 className="text-lg md:text-2xl mt-3 font-bold">Adrian</h2>
                <p className="font-semibold text-xl"><i>@adrian</i></p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='text-center'>
                <img className="md:h-[250px] h-[200px] w-[200px] md:w-[250px]  rounded-full border-2 mx-auto" src="https://i.ibb.co/QYq2S2s/m2.jpg" alt="img" />
                <h2  className="text-lg md:text-2xl mt-3 font-bold">David</h2>
                <p className="font-semibold text-xl"><i>@david</i></p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='text-center'>
                <img className="md:h-[250px] h-[200px] w-[200px] md:w-[250px]  rounded-full border-2 mx-auto" src="https://i.ibb.co/Drv2ZBz/m3.jpg" alt="img" />
                <h2  className="text-lg md:text-2xl mt-3 font-bold">harry</h2>
                <p className="font-semibold text-xl"><i>@harry</i></p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='text-center'>
                <img className="md:h-[250px] h-[200px] w-[200px] md:w-[250px]  rounded-full border-2 mx-auto" src="https://i.ibb.co/rwQWKhC/m4.jpg" alt="img" />
                <h2  className="text-lg md:text-2xl mt-3 font-bold">zayn</h2>
                <p className="font-semibold text-xl"><i>@zayn</i></p>
            </div>
        </SwiperSlide>
      </Swiper>
        </div>
    );
};

export default TopDonors;