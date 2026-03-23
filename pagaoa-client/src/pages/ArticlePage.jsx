import Button from "../components/Button";

const ArticlePage = () => {
  const articles = [
    {
      id: 1,
      title: "Chocolate Chunk Cookies",
      desc: "Deliciously gooey cookies with chunks of rich chocolate in every bite.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdl7LWfZvgkE1CpYzFdRzPC7Qc8-vUN9DgA&s",
    },
    {
      id: 2,
      title: "Peanut Butter Cookies",
      desc: "Soft and nutty cookies packed with creamy peanut butter flavor.",
      img: "https://www.modernhoney.com/wp-content/uploads/2024/09/Bakery-Style-Peanut-Butter-Cookies-15-scaled.jpg",
    },
    {
      id: 3,
      title: "Oatmeal Raisin Cookies",
      desc: "Hearty cookies loaded with oats and sweet raisins for a classic taste.",
      img: "https://hips.hearstapps.com/hmg-prod/images/brown-sugar-oatmeal-cookies-recipe-2-66cf3d6deebbf.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
    },
    {
      id: 4,
      title: "Double Chocolate Cookies",
      desc: "Rich chocolate cookies with chocolate chips baked to perfection.",
      img: "https://www.bunsenburnerbakery.com/wp-content/uploads/2024/12/Double-Chocolate-Chunk-Cookies-square-IMG_6926-720x720.jpg",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      {/* HERO */}
      <section className="border-y-2 border-zinc-900 bg-[#f3ede6] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Hero Text (left) */}
          <div className="order-2 lg:order-1">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#070546]">
              Articles
            </p>

            <h1 className="max-w-xl text-3xl font-bold font-serif leading-tight text-[#070546] sm:text-4xl">
              Our Cookie Flavors
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#070546] sm:text-base">
              Discover our featured cookie flavors! Each recipe is baked fresh
              daily, using high-quality ingredients to bring you the perfect
              balance of taste and texture.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
            </div>
          </div>

          {/* Hero Image (right) */}
          <div className="overflow-hidden rounded-3xl order-1 lg:order-2">
            <img
              src="https://www.bakingbusiness.com/ext/resources/2022/11/11/1111-LastCrumb.webp?height=667&t=1697569640&width=1080"
              alt="Featured Cookie"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="border-y-2 border-zinc-900 bg-[#f3ede6] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#070546]">
            Featured Cookies
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#070546]">
            Our Tasty Selection
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl border-2 border-black bg-[#fef6e9] p-4"
            >
              {/* Article Image */}
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#070546]">
                Article {String(article.id).padStart(2, "0")}
              </p>

              <h3 className="mt-2 text-lg font-semibold text-[#070546]">
                {article.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#070546]/80">
                {article.desc}
              </p>

              <Button className="mt-4 bg-[#070546] text-white hover:bg-[#e8c07d] hover:text-black">
                Read More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
