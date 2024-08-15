// import React from 'react'


import { Button } from "@/components/ui/button"
import icon1 from '@images/icon1.png';
import icon2 from '@images/icon2.png';
import icon3 from '@images/icon3.png';
import coverBG from '@images/cover-bg-img.jpg';

function HomePage() {
  return (
    <>
      <section className="hero__section relative overflow-hidden">
        <img src={coverBG} alt="cover image"  className="absolute top-0 left-0 w-fullz-[10]"/>
        <div className="container mx-auto flex flex-row min-h-[90vh] items-center relative z-20">
          <div className="left-col w-full md:w-1/2">
            <h1 className="mb-4 ">Count on us for all your <span className="text-primary">Handyman</span> Services.</h1>
            <p className="mb-4 text-[18px]">
              Whether it&apos;s a quick repair or a comprehensive home
              improvement project, we take pride in our workmanship and
              strive to exceed your expectations. Partner with us for
              reliable service and superior results that stand the test of
              time.
            </p>
            <div className="flex flex-row gap-2">
            <Button variant="default" size="lg" className="min-w-[200px]">Browse Services</Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">Learn More</Button>
            </div>

          </div>

          <div className="left-col w-full md:w-1/2">
          </div>
        </div>
      </section>

      <section>
        <div className="container flex flex-col py-10">

          <div className="title-wrapper text-center max-w-[550px] mx-auto">
            <h2>Providing the best handyman services</h2>
            <div>
              <p>We&apos;re always ready to swoop in and save the day with our expertise, reliability, and friendly service.
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-center flex-nowrap gap-2">

            <div className="step-item text-center px-6 py-10">
              <div className="border border-[#c9c9c9] rounded-full w-[80px] h-[80px] p-6 mx-auto mb-4">
                <img src={icon1} alt="" className="w-[50px]" />
              </div>

              <h4 className="mb-2 text-primary">Find a Service Provider</h4>
              <div>No more lengthy searches or phone calls; everything you need is right at your fingertips. Sit back, relax, and let the All In One take care of the rest</div>
            </div>

            <div className="step-item text-center px-6 py-10">
              <div className="border border-[#c9c9c9] rounded-full w-[80px] h-[80px] p-6 mx-auto mb-4">
                <img src={icon3} alt="" className="w-[50px]" />
              </div>

              <h4 className="mb-2 text-primary">Make a Reservation</h4>
              <div>Secure your spot with just a click. Reserve your service instantly, no delay guaranteed. Experience convenience redefined, right at your fingertips.</div>
            </div>

            <div className="step-item text-center px-6 py-10">
              <div className="border border-[#c9c9c9] rounded-full w-[80px] h-[80px] p-6 mx-auto mb-4">
                <img src={icon2} alt="" className="w-[50px]" />
              </div>

              <h4 className="mb-2 text-primary">Service delivered direct to you</h4>
              <div>Experience hassle-free service brought straight to your doorstep. Convenience at its finest, with no need to leave your home.</div>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className=" min-h-[40vh] text-center bg-[#f5f5f5] grid place-items-center">
          <p>service cateories section</p>
        </div>
      </section>

      <section>
        <div className=" min-h-[40vh] text-center bg-[#f0f0f0] grid place-items-center">
          <p>FAQs section</p>
        </div>
      </section>

      <section>
        <div className=" min-h-[40vh] text-center bg-[#f5f5f5] grid place-items-center">
          <p>Testimonials section</p>
        </div>
      </section>
    </>
  )
}

export default HomePage