import React from "react";
import heroimg from "../assets/images/heroimg.jpg";
import heroimg1 from "../assets/images/heroimg1.jpg";
import heroimg2 from "../assets/images/heroimg2.jpg";
import feature from "../assets/images/feature.jpg";
import featureimg from "../assets/images/feature-img.jpg";
import icon1 from "../assets/images/icon1.png";
import icon2 from "../assets/images/icon2.png";
import icon3 from "../assets/images/icon3.png";
import avataricon from "../assets/images/avatar-icon.png";
import { FcAlarmClock } from "react-icons/fc";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
import FaqList from "../components/Faq/FaqList";
import Testimonials from "../components/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      {/* hero section */}

      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* hero content */}
            <div>
              <div className="lg:w-[570px]">
                <h1
                  className="text-[36px] leading-[46px] text-headingColor font-[700] md:text-[60px]
               md:leading-[70px]"
                >
                  Count on us for all your handyman services.
                </h1>
                <p className="text__para">
                  Whether it's a quick repair or a comprehensive home
                  improvement project, we take pride in our workmanship and
                  strive to exceed your expectations. Partner with us for
                  reliable service and superior results that stand the test of
                  time.
                </p>

                <button className="btn">Request a booking</button>
              </div>

              {/* hero counter */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2
                    className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[500]
                 text-headingColor"
                  >
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text_para">Years of Experience</p>
                </div>

                <div>
                  <h2
                    className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[500]
                 text-headingColor"
                  >
                    20+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                  <p className="text_para">Area Coverage</p>
                </div>

                <div>
                  <h2
                    className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[500]
                 text-headingColor"
                  >
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-blue-300 rounded-full block mt-[-14px]"></span>
                  <p className="text_para">Customer Satisfaction</p>
                </div>
              </div>
            </div>

            {/* hero content */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img className="w-full" src={heroimg} alt="" />
              </div>
              <div className="mt-[30px]">
                <img src={heroimg1} alt="" className="w-full mb-[30px]" />
                <img src={heroimg2} alt="" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* hero section end */}

      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Providing the best handyman services
            </h2>
            <p className="text__para text-center">
              We're always ready to swoop in and save the day with our
              expertise, reliability, and friendly service.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]
          mt-[30px] lg:mt-[55px]"
          >
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon1} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Service Provider
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  No more lengthy searches or phone calls; everything you need
                  is right at your fingertips. Sit back, relax, and let the All
                  In One take care of the rest
                </p>

                <Link
                  to="/serviceproviders"
                  className="w-[44px] h-[44px] rounded-full border border-solid  border-[#181A1E] mt-[30px]
                mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon2} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Service delivered direct to you
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Experience hassle-free service brought straight to your
                  doorstep. Convenience at its finest, with no need to leave
                  your home.
                </p>

                <Link
                  to="/serviceproviders"
                  className="w-[44px] h-[44px] rounded-full border border-solid  border-[#181A1E] mt-[30px]
                mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon3} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Reserve Now
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Secure your spot with just a click. Reserve your service
                  instantly, no delay guaranteed. Experience convenience
                  redefined, right at your fingertips.
                </p>

                <Link
                  to="/serviceproviders"
                  className="w-[44px] h-[44px] rounded-full border border-solid  border-[#181A1E] mt-[30px]
                mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />

      {/* services section start */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Services</h2>
            <p className="text__para text-center">
              Trust us to handle your home maintenance needs, so you can enjoy
              peace of mind knowing your property is in expert hands.
            </p>
          </div>

          <ServiceList />
        </div>
      </section>
      {/* services section end */}

      {/* feature section start*/}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            {/* feature content */}
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Schedule your service experience <br /> anytime.
              </h2>

              <ul className="pl-4">
                <li className="text__para">
                  1. Search for a service provider within your area and contact
                  them.
                </li>
                <li className="text__para">
                  2. Schedule the appointment directly.
                </li>
                <li className="text__para">
                  3. View service providers who are accepting new work, use the
                  online scheduling tool to select an reservation time.
                </li>
              </ul>
              <Link to="/">
                <button className="btn">Learn More</button>
              </Link>
            </div>

            {/* feature img */}
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={feature} className="w-3/4" alt="" />

              <div
                className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px]
              md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p
                      className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor
                font-[600]"
                    >
                      Tue, 24
                    </p>
                    <p
                      className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor
                font-[400]"
                    >
                      10:00 AM
                    </p>
                  </div>
                  <span>
                    <FcAlarmClock />
                  </span>
                </div>

                <div
                  className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px]
                text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-blue-300 font-[500] mt-2 lg:mt-4
                rounded-full"
                >
                  Reservation
                </div>

                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avataricon} alt="" />
                  <h4
                    className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] 
                  font-[700] text-headingColor"
                  >
                    Dhammika Perera
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* feature section end */}

      {/* faq section */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={featureimg} alt="" />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="heading">
                Frequently asked questions by our customers
              </h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* faq section end */}

      {/* testimonial */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our customers say</h2>
            <p>
              Trust us to handle your home maintenance needs, so you can enjoy
              peace of mind knowing your property is in expert hands.
            </p>
          </div>

          <Testimonials/>
        </div>
      </section>
      {/* testimonial end */}
    </>
  );
};

export default Home;
