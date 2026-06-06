import Sidebar from "../../../components/admin/Sidebar";
import BookingTable from "../../../components/admin/BookingTable";

export default function BookingsPage() {

 return(

  <div className="flex">

   <Sidebar />

   <main className="ml-72 p-10 w-full">

    <h1 className="text-4xl font-bold">

     Booking Requests

    </h1>

    <BookingTable />

   </main>

  </div>

 );

}