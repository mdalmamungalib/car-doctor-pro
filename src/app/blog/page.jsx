import HeadImage from "components/HomePage/HeadImage";
import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-dynamic";


export async function generateMetadata() {
  return {
    title: "Blog",
    description: "Discover expert tips, guides, and articles on car repair and maintenance from the professionals at Car Doctor. Stay informed to enhance your vehicle's performance.",
    keywords: [
      "car repair tips",
      "car maintenance guides",
      "auto service articles",
      "professional mechanics advice",
      "vehicle care",
      "automotive industry trends"
    ],
    icons: {
      icon: "/favicon.ico", 
    },
    openGraph: {
      title: "Blog - Car Doctor | Expert Insights on Car Repair and Maintenance",
      description: "Stay updated with the latest tips and insights on car repair and maintenance from Car Doctor. Improve your vehicle's performance with our expert advice.",
      images: [
        {
          url: "https://yourwebsite.com/images/blog-header.jpg", 
          width: 1200,
          height: 630,
          alt: "Car Doctor Blog Header Image",
        },
      ],
      url: "https://yourwebsite.com/blog", 
      type: "website",
      site_name: "Car Doctor",
    },
  };
}


// Dummy Blog Data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt:
      "Explore the latest trends shaping the future of web development...",
    author: "John Doe",
    date: "September 1, 2024",
    image:
      "https://images.pexels.com/photos/28542307/pexels-photo-28542307/free-photo-of-car-side-mirror-reflecting-sunrise-on-country-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "future-of-web-development",
  },
  {
    id: 2,
    title: "How to Design a Great User Experience",
    excerpt:
      "Learn how to craft amazing user experiences that engage and delight...",
    author: "Jane Smith",
    date: "August 28, 2024",
    image:
      "https://images.pexels.com/photos/379419/pexels-photo-379419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "design-great-ux",
  },
  {
    id: 3,
    title: "Best Practices for Responsive Web Design",
    excerpt:
      "Understand the key elements of creating responsive, user-friendly websites...",
    author: "Samuel Green",
    date: "August 20, 2024",
    image:
      "https://images.pexels.com/photos/23475/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "responsive-web-design",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen text-gray-800 blog-page-container mb-[130px]">
      {/* Hero Section */}
      <HeadImage title={"Blog"} subtitle={"Our Blog Area"} />

      {/* Blog List Section */}
      <section className="px-8 py-16 blog-list-section lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-4xl font-bold text-center text-[#FF3811]">
            Latest Posts
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="overflow-hidden bg-white rounded-lg shadow-lg blog-post"
              >
                <div className="relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="object-cover w-full"
                  />
                  <div className="absolute bottom-0 left-0 p-4 text-white rounded-tr-lg bg-[#FF3811]">
                    <p className="text-sm">{post.date}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-4 text-2xl font-bold">
                    {post.title}
                  </h3>
                  <p className="mb-6 text-gray-600">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      By {post.author}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      legacyBehavior
                    >
                      <a className="font-semibold text-[#FF3811] hover:underline">
                        Read More
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination (Optional) */}
      <section className="flex items-center justify-center py-8 pagination-section">
        <button className="px-4 py-2 text-gray-700 bg-gray-300 rounded-l-full hover:bg-[#FF3811] hover:text-white">
          Previous
        </button>
        <span className="px-6 py-2 mx-2 bg-gray-100">1</span>
        <button className="px-4 py-2 text-gray-700 bg-gray-300 rounded-r-full hover:bg-[#FF3811] hover:text-white">
          Next
        </button>
      </section>
    </div>
  );
};

export default BlogPage;
