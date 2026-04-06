// src/pages/ArticleListPage.jsx
import ArticleList from "../components/ArticleList";
import articles from "../assets/articles";
import Button from "../components/Button";

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* HERO */}
      <section className="border-y-2 border-zinc-900 bg-[#f3ede6] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
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

          <div className="overflow-hidden rounded-3xl order-1 lg:order-2">
            <img
              src="https://www.bakingbusiness.com/ext/resources/2022/11/11/1111-LastCrumb.webp?height=667&t=1697569640&width=1080"
              alt="Featured Cookie"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="border-y-2 border-zinc-900 bg-[#070546] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f3ede6]">
            Featured Cookies
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#f3ede6]">
            Our Tasty Selection
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;
