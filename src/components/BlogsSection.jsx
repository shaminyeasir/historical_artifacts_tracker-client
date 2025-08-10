import React from "react";

const BlogsSection = () => {
  // Static sample blog data
  const blogs = [
    {
      id: 1,
      title: "The Mystery Behind Ancient Artifacts",
      excerpt:
        "Discover how historians decode the secrets hidden within ancient relics and what they tell us about our past.",
      author: "Md. Shamin Yeasir",
      publishedAt: "August 5, 2025",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      url: "/blogs/mystery-behind-ancient-artifacts",
    },
    {
      id: 2,
      title: "Top 10 Artifacts That Changed History",
      excerpt:
        "A countdown of the most influential artifacts that shaped human civilization across centuries.",
      author: "Jane Doe",
      publishedAt: "July 20, 2025",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
      url: "/blogs/top-10-artifacts",
    },
    {
      id: 3,
      title: "How To Preserve Historical Relics",
      excerpt:
        "Learn about the modern techniques and challenges in preserving priceless artifacts for future generations.",
      author: "John Smith",
      publishedAt: "June 15, 2025",
      image:
        "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=600&q=80",
      url: "/blogs/preserve-historical-relics",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10 px-4 sm:px-8 md:px-16 lg:px-[160px]">
          Latest Blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 md:px-16 lg:px-[160px]">
          {blogs.map((blog) => (
            <a
              key={blog.id}
              href={blog.url}
              className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{blog.excerpt}</p>
                <div className="text-gray-500 text-xs flex justify-between">
                  <span>By {blog.author}</span>
                  <span>{blog.publishedAt}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
