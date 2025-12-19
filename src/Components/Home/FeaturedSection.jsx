import React from "react";

import featurelogo from "../../assets/banner1.png"; 
// import Aos from "aos";

const features = [
  { title: "Easy Donor Registration", desc: "Register easily and become a lifesaver." },
  { title: "Search Blood Donors", desc: "Find donors quickly by blood group." },
  { title: "Emergency Requests", desc: "Instant blood request during emergencies." },
  { title: "Trusted Community", desc: "Verified donors and secure platform." },
];

const FeaturedSection = () => {
  

  return (
    <section className="my-16 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
        Why Choose Our Platform?
      </h2>
      <p className="text-center text-gray-600 mb-8">
        We connect blood donors with people in need
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
           
            className="p-6 bg-pink-100 shadow-md rounded-xl text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-center mb-4">
              <img
                src={featurelogo}
                alt={item.title}
                className="h-12 w-12 rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
