import Button from "../../components/Button";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col  bg-[#f3ede6]mt-0 pt-0 ">
      <section className="bg-[#070546] text-[#f3ede6] py-20 px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold">About Us</h1>
      </section>

      <section className="bg-[#f3ede6] px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden">
            <img
              src="https://www.biggerbolderbaking.com/wp-content/uploads/2021/03/Crazy-cookie-dough-thumbnail-scaled.jpg"
              alt="Bakery"
              className="w-full h-[350px] object-cover"
            />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#070546]/70">
              Our Story
            </p>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#070546] mt-3 leading-tight">
              Your Sweet Escape Where Every Bite Feels Like Home
            </h2>

            <p className="mt-4 text-[#070546]/80 text-sm leading-7">
              At Crème & Crumbs Bakehouse, we believe baking is more than just
              food it’s comfort, joy, and memories in every bite. From cookies
              to cakes, everything is made fresh daily with love and
              high-quality ingredients.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <img
                src="https://icecreambakery.in/wp-content/uploads/2024/12/Brownie-Recipe-with-Cocoa-Powder-1200x821.jpg"
                className="rounded-2xl h-48 w-full object-cover"
              />
              <img
                src="https://www.the-girl-who-ate-everything.com/wp-content/uploads/2016/02/red-velvet-brownies-07.jpg"
                className="rounded-2xl h-48 w-full object-cover"
              />
            </div>

            {/* BUTTON */}
            <div className="mt-6">
              <Button to="/">Back Home</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#070546] text-[#f3ede6] px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-2xl font-bold">10k+</h3>
            <p className="text-sm opacity-80">Cookies Baked</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">5k+</h3>
            <p className="text-sm opacity-80">Happy Customers</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">3+</h3>
            <p className="text-sm opacity-80">Years Experience</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">100%</h3>
            <p className="text-sm opacity-80">Fresh Daily</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f3ede6] px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#070546]/70">
            Contact
          </p>
          <h2 className="text-2xl font-semibold text-[#070546] mt-2">
            Get in Touch
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-[#070546] p-5 text-center">
            📍
            <p className="mt-2 text-sm font-bold text-[#070546]">
              Parang, Marikina City
            </p>
          </div>

          <div className="rounded-3xl border-2 border-[#070546] p-5 text-center">
            📞
            <p className="mt-2 text-sm font-bold text-[#070546]">
              +63 912 345 6789
            </p>
          </div>

          <div className="rounded-3xl border-2 border-[#070546] p-5 text-center">
            Crème Crumbs
            <p className="text-sm font-bold text-[#070546]">Facebook</p>
          </div>

          <div className="rounded-3xl border-2 border-[#070546] p-5 text-center">
            @cremecrumbs
            <p className="text-sm font-bold text-[#070546]">Instagram</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
