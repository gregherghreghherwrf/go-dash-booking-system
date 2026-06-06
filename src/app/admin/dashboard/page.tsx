import Sidebar from "../../../components/admin/Sidebar";
import StatsCard from "../../../components/admin/StatsCard";

export default function Dashboard() {
  return (
    <div className="flex">

      <Sidebar />

      <main className="ml-72 p-10 w-full">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <StatsCard
            title="Today's Revenue"
            value="₹18,500"
          />

          <StatsCard
            title="Bookings"
            value="42"
          />

          <StatsCard
            title="Pending"
            value="7"
          />

          <StatsCard
            title="Courts Active"
            value="8"
          />

        </div>

      </main>

    </div>
  );
}