export default function Facilities() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold mb-12 text-center">
          Facilities
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-green-400">
              Pickleball
            </h3>

            <p className="mt-4">
              6 Professional Courts
            </p>

            <ul className="mt-4 space-y-2">
              <li>✓ Flood Lights</li>
              <li>✓ Tournament Ready</li>
              <li>✓ Coaching Available</li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-green-400">
              Box Cricket
            </h3>

            <p className="mt-4">
              2 Premium Turfs
            </p>

            <ul className="mt-4 space-y-2">
              <li>✓ Artificial Turf</li>
              <li>✓ Practice Nets</li>
              <li>✓ Match Ready</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}