export const generateMetadata = ({
  title,
  description,
  url,
  image,
  twitterHandle,
}) => {
  return {
    title,
    description,
    openGraph: {
      url,
      title,
      description,
      images: [image],
    },
    twitter: {
      handle: twitterHandle,
      site: twitterHandle,
      cardType: "summary_large_image",
    },
  };
};
