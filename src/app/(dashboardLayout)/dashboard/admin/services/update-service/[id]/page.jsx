import React from "react";
import UpdateService from "./UpdateService";

export async function generateMetadata() {
  return {
    title: `Update Service`,
  };
}

const page = ({params}) => {
  return <UpdateService id={params?.id}/>;
};

export default page;
