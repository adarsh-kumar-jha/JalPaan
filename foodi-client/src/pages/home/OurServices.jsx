import React from "react";

const serviceLists = [
    {id:1, title: "Online Ordering", des: "Order Online, Connect to आशीष भैया", img: "/images/home/services/icon1.png"},
    {id:2, title: "Fast delivery", des: "We Deliver Faster Than your Gf's Reply in midnight", img: "/images/home/services/icon2.png"},
    // {id:3, title: "Online Ordering", des: "Explore menu & order with ease using our Online Ordering n", img: "/images/home/services/icon3.png"},
    {id:4, title: "Shaniwaar Ka Vaar", des: "Give the Order in Advance and skip the Rush", img: "/images/home/services/icon4.png"},
]

const OurServices = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Culinary Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px] font-patrick">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>

            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-8 items-center">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                            <img src={service.img} alt="" className=" mx-auto"/>
                            <h5 className="pt-3 font-semibold"> {service.title}</h5>
                            <p className="text-[#554348]">{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
