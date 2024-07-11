import React from "react";

const testimonialData = [
  {
    name: "Paramjeet Kaur",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnBDvgpMBcSO30l7rbpgteM9AVEACckD_bKg&s",
    description: "Flattered with availability of well maintained cars",
    aosDelay: "0",
  },
  {
    name: "Sara John",
    image: "https://miro.medium.com/v2/resize:fit:1392/1*VMz6uQLMMBmQs3-mSbir6w.png",
    description: "Booked a XUV with unlimited kms, very happy with Car Rental's service.",
    aosDelay: "300",
  },
  {
    name: "Eily Venn",
    image: "https://i.guim.co.uk/img/media/c061ce5de23828e9820973ae7bfd2c28fef0d16b/168_206_1428_857/master/1428.jpg?width=1200&quality=85&auto=format&fit=max&s=baa40acb54eb181520771793f2c65fd7",
    description: "Booked a car for a family trip which was very comfortable and in great condition.",
    aosDelay: "1000",
  },
];
const Testimonial = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Our Clients Say About Us
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
              
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonialData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src= {skill.image}
                    alt=""
                    className="rounded-full w-36 h-36"
                  />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{skill.description}</p>
                <p className="text-center font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
