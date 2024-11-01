import Service from "./Service";


export async function generateMetadata() {
  return {
    title: "Services",
  };
}

const page = () => {
  <Service />;
};

export default page;
