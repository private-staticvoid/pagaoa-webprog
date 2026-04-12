import Button from "../../components/Button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col bg-[#f3ede6]">
      <section className="border-y-2 border-black bg-[#070546] px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16 -mt-2 mb-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex items-center justify-center">
            <img
              src="https://www.foodandwine.com/thmb/4_UScMzHQCxZzACBITHHmT_EM3U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chocolate-Chunk-Halwah-Cookies-FT-RECIPE0923-1f8df755df6d468da98887aa846a2fe3.jpg"
              alt="Hero Image"
              className="w-full max-w-md rounded-3xl object-coverw-full h-72 object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#fef6e9]/70">
              Bake House
            </p>

            <h1 className="max-w-xl text-3xl font-serif font-bold leading-tight text-[#fef6e9] sm:text-4xl">
              Welcome to Crème & Crumbs
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#fef6e9]/80 sm:text-base">
              Taste the Warmth of Home in every Crème & Crumble.
            </p>

            <div className="mt-6">
              <Button
                to="/about"
                className="bg-[#fef6e9] text-[#070546] hover:bg-[#e8c07d] hover:text-black"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-black bg-[#fef6e9] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 mb-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#070546]/60">
            FAQ
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#070546]">
            Frequent Asked Questions
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              value: "Is it possible to deliver to my location?",
              label:
                "Yes as long as your area is serviceable via lalamove and grab from our place",
            },
            {
              value: "How to order?",
              label:
                "You may place your order via Instagram or Facebook account Crème & Crumbs Bakehouse",
            },
            {
              value: "What payment methods do you accept?",
              label: "We accept Online Payments, PayPal, Maya, and Gcash",
            },
            {
              value: "Where are you located?",
              label: "We are located at Parang Marikina City",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border-2 border-black bg-[#c8c6e5]/30 p-5"
            >
              <p className="text-2xl font-bold text-[#070546]">{item.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#070546]/60">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-black bg-[#070546] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 mb-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#fef6e9]/60">
            Menu
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#fef6e9]">
            Best Sellers of the Month
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: "dubai-chewy-cookie",
              title: "Dubai Chewy Cookie",
              desc: "Only for 170 Pesos per piece",
              img: "https://static01.nyt.com/images/2026/03/17/multimedia/EK-Dubai-Chocolate-Chewy-Cookies-1wfgm/EK-Dubai-Chocolate-Chewy-Cookies-wfgm-threeByTwoLargeAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale",
            },
            {
              name: "cookies-original",
              title: "Cookies Original",
              desc: "Fresh cookies that crumble in your mouth",
              img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
            },
            {
              title: "Cookies Original",
              desc: "Fresh cookies that crumble in your mouth",
              img: "https://lemonsandzest.com/wp-content/uploads/2020/02/Small-Batch-Chocolate-Chip-Cookies-Recipe-3.10.jpg",
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border-2 border-black bg-[#fef6e9] p-4"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem] border-2 border-black">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[#070546]">
                {card.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#070546]/70">
                {card.desc}
              </p>

              <Link to={`/article/${card.name}`}>
                <Button className="mt-4 bg-[#fef6e9] text-[#070546] hover:bg-[#e8c07d] hover:text-black">
                  View More
                </Button>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
