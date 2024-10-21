

const Banner = () => {
  const banners = [
    {
      title: "Expert Car Maintenance Services",
      description:
        "Ensure your vehicle stays in top condition with our expert car maintenance services, designed for all makes and models.",
      next: "#slide2",
      prev: "#slide6",
    },
    {
      title: "Comprehensive Auto Repair Solutions",
      description:
        "Our experienced technicians offer comprehensive auto repair solutions for a wide range of vehicle issues.",
      next: "#slide3",
      prev: "#slide1",
    },
    {
      title: "Quality Parts and Accessories",
      description:
        "We provide high-quality parts and accessories to enhance the performance and longevity of your vehicle.",
      next: "#slide4",
      prev: "#slide2",
    },
    {
      title: "Affordable Car Servicing Packages",
      description:
        "Choose from our affordable car servicing packages tailored to meet your specific vehicle needs.",
      next: "#slide5",
      prev: "#slide3",
    },
    {
      title: "Expert Tire and Brake Services",
      description:
        "Keep your car safe and roadworthy with our expert tire and brake services available at competitive prices.",
      next: "#slide6",
      prev: "#slide4",
    },
    {
      title: "Reliable Diagnostic Services",
      description:
        "Our advanced diagnostic services ensure that any issues with your vehicle are identified and resolved quickly.",
      next: "#slide1",
      prev: "#slide5",
    },
  ];

  
  return (
    <div className="w-full mt-16 rounded-[10px] carousel" data-aos="fade-right">
      {banners.map((banner, index) => (
        <div
          style={{
            backgroundImage: `linear-gradient(45deg,rgba(7,25,82,0.7), rgba(0,0,0,0.3)), url(/assets/images/banner/${
              index + 1
            }.jpg)`,
          }}
          key={index}
          id={`slide${index + 1}`}
          className="relative w-full min-h-[400px] md:min-h-[600px] rounded-[10px] carousel-item bg-no-repeat bg-cover"
        >
          <div className="flex items-center justify-center h-full px-5 md:pl-24">
            <div className="text-center space-y-7 md:text-left">
              <h1 className="text-white text-[32px] md:text-[60px] max-w-[300px] md:max-w-[463px] font-bold leading-[40px] md:leading-[75px]">
                {banner?.title}
              </h1>
              <p className="text-white text-[16px] md:text-[18px] max-w-[300px] md:max-w-[522px] font-normal capitalize">
                {banner?.description}
              </p>
              <div className="flex justify-center space-x-3 md:justify-start">
                <button className="px-5 py-3 text-white transform bg-[#FF3811] border border-[#FF3811] rounded hover:scale-105 focus:outline-none focus:ring-opacity-50">
                  Discover More
                </button>
                <button className="hidden px-5 py-3 text-white transform border border-white rounded hover:scale-105 focus:outline-none focus:ring-opacity-50 sm:block">
                  Latest Project
                </button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between gap-5 mt-10 transform bottom-12 right-12 ">
            <a  
              href={banner?.prev}
              className="px-5 py-3 font-semibold text-white transform border border-white rounded-full hover:scale-105 focus:outline-none focus:ring-opacity-50 hover:bg-[#FF3811] hover:border-[#FF3811]"
            >
              ❮
            </a>
            <a
              href={banner?.next}
              className="px-5 py-3 font-semibold text-white transform border border-white rounded-full hover:scale-105 focus:outline-none focus:ring-opacity-50 hover:bg-[#FF3811] hover:border-[#FF3811]"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
