import React from "react";
import aboutimg from "../../assets/images/aboutimg.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* about img */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutimg} alt="" />
          </div>

          {/* about content */}
          <div className="w-ful lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the best handymen</h2>
            <p className="text__para">
              With over two decades of experience under our tool belts, Perera
              Plumbing Services is your trusted partner for all your plumbing
              needs. Founded on the principles of reliability, professionalism,
              and unmatched expertise, we've been serving the Colombo community
              with pride since 2019.
            </p>

            <p className="text__para mt-[30px]">
              Our team of seasoned professionals brings a wealth of knowledge
              and hands-on experience to every project we undertake. Whether
              it's a simple faucet repair or a complex sewer line replacement,
              we have the skills and resources to get the job done right, the
              first time, every time.
            </p>

            <Link to="/">
                <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
