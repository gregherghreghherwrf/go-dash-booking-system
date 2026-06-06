import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center text-center bg-black">
      <div>
        <h1 className="text-7xl font-extrabold">
          Play.
          <span className="text-green-400"> Compete.</span>
          Win.
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          Ahmedabad's Premium Pickleball & Box Cricket Destination
        </p>

        <Link
          href="/booking"
          className="mt-8 inline-block bg-green-500 text-black px-8 py-4 rounded-xl font-bold"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}