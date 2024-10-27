import HeadImage from "components/HomePage/HeadImage";
import Image from "next/image";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  return {
    title: "About Us",
    description: "We are a team of passionate, dedicated, and committed professionals who strive to provide the best possible service to our customers.",
    keywords: ["car repair", "car service", "auto workshop", "professional mechanics"],
    icons: {
      icon: "/favicon.ico", // Path to favicon in the public directory
    },
    openGraph: {
      title: "About Us - Car Doctor",
      description: "We are a team of passionate, dedicated, and committed professionals who strive to provide the best possible service to our customers.",
      images: [
        {
          url: "/favicon.ico",
          width: 1200,
          height: 630,
          alt: "Car Doctor Logo",
        },
      ],
    },
  };
}



const About = () => {
  
  return (
    <div className="min-h-screen text-gray-800 about-page-container bg-gray-50 mb-[130px]">
      {/* Hero Section */}
      <HeadImage title={"About"} subtitle={"Our About Area"} />

      {/* Our Story Section */}
      <section className="px-8 py-16 bg-white our-story-section lg:px-20">
        <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-2">
          <div className="relative">
            <Image
              src="https://images.pexels.com/photos/5835328/pexels-photo-5835328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Our Story"
              width={600}
              height={400}
              className="object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-0 left-0 p-6 text-white rounded-tr-lg shadow-lg bg-[#FF3811]">
              <h3 className="text-2xl font-semibold">Our Story</h3>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-4xl font-bold text-[#FF3811]">
              Our Journey
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              We started with a vision to bring the best services to
              our customers. Over the years, we have grown into a
              team of passionate individuals committed to delivering
              excellence in everything we do.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Our focus has always been to provide innovative
              solutions while maintaining a strong connection with
              our values and the community we serve. Join us as we
              continue our journey towards success and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="px-8 py-16 bg-gray-100 rounded-[10px] mission-section lg:px-20">
        <div className="mx-auto text-center max-w-7xl rounded-[10px]">
          <h2 className="mb-8 text-4xl font-bold text-[#FF3811]">
            Our Mission
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Our mission is to provide top-quality services that
            exceed expectations and to build long-lasting
            relationships with our clients. We aim to lead the
            industry through innovation, dedication, and commitment
            to excellence.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="px-8 py-16 bg-white meet-the-team-section lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-4xl font-bold text-center text-[#FF3811]">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center team-member"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="object-cover mx-auto mb-4 rounded-full shadow-lg w-[300px] h-[300px]"
                />

                <h3 className="text-2xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-lg text-gray-600">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-8 py-12 text-center text-white bg-[#FF3811] call-to-action-section">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-6 text-3xl font-bold">
            Join Our Journey
          </h2>
          <p className="mb-8 text-lg leading-relaxed">
            We're always looking for passionate and talented
            individuals to join our team. If you're ready to make a
            difference, explore our career opportunities.
          </p>
          <a
            href="/careers"
            className="px-6 py-3 font-semibold transition bg-white rounded-full text-[#FF3811] hover:bg-gray-100"
          >
            Explore Careers
          </a>
        </div>
      </section>
    </div>
  );
};

// Dummy Team Members Data
const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image:
      "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Jane Smith",
    role: "Chief Marketing Officer",
    image:
      "https://images.pexels.com/photos/3855772/pexels-photo-3855772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Samuel Green",
    role: "Head of Development",
    image:
      "https://images.pexels.com/photos/787476/pexels-photo-787476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default About;
