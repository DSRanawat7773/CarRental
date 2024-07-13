import React from "react";
import whiteCar from "../../assets/white-car.png";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";
import kwid from "../../assets/kwid.png"
import baleno from "../../assets/baleno.png"
import Dzire from "../../assets/Dzire.png"

const MainCarList = [
  {
    name: "Range Rover",
    price: 100,
    image: whiteCar,
    aosDelay: "0",
  },
  {
    name: "Scorpio s11",
    price: 140,
    image: car2,
    aosDelay: "300",
  },
  {
    name: "Scorpio old",
    price: 100,
    image: car3,
    aosDelay: "600",
  },
  {
    name: "Baleno",
    price: 100,
    image: baleno,
    aosDelay: "800",
  },
  {
    name: "Kwid",
    price: 100,
    image: kwid,
    aosDelay: "800",
  },
  {
    name: "Dzire",
    price: 100,
    image: Dzire,
    aosDelay: "800",
  },
  {
    name: "Scorpio old",
    price: 100,
    image: car3,
    aosDelay: "800",
  },
  

];


const CarList = () => {
  return (
    <div className="pb-24" id="Maincars">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Cars Available
        </h1>
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {MainCarList.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px]">
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>Rs.{data.price}/Hr</p>
                    <a href="#">Details</a>
                  </div>
                </div>
                <p className="text-xl font-semibold absolute top-0 left-3">
                  12Km
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* End of car listing */}
      </div>
    </div>
  );
};

export default CarList;
