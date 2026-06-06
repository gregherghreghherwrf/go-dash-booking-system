export default function Pricing() {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-12">
          Pricing
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-zinc-900 p-8 rounded-xl">
            <h3 className="text-3xl text-green-400 font-bold">
              Pickleball
            </h3>

            <p className="text-5xl mt-4">₹600</p>

            <p className="text-gray-400 mt-3">
              Weekday & Weekend
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-xl">
            <h3 className="text-3xl text-green-400 font-bold">
              Box Cricket
            </h3>

            <p className="text-5xl mt-4">₹1300</p>

            <p className="mt-3 text-gray-400">
              Weekday
            </p>

            <p className="mt-3 text-yellow-400">
              Weekend ₹1500
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}