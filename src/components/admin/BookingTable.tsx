"use client";

const bookings = [

{
 id:1,
 user:"Rahul",
 facility:"Court 1",
 slot:"7 PM",
 status:"pending"
},

{
 id:2,
 user:"Harsh",
 facility:"Turf 2",
 slot:"8 PM",
 status:"pending"
}

];

export default function BookingTable() {

 return(

  <table className="w-full mt-10">

   <thead>

    <tr>

     <th>User</th>
     <th>Facility</th>
     <th>Slot</th>
     <th>Status</th>
     <th>Action</th>

    </tr>

   </thead>

   <tbody>

    {bookings.map((booking)=>(

     <tr
      key={booking.id}
      className="border-b border-zinc-800"
     >

      <td>{booking.user}</td>

      <td>{booking.facility}</td>

      <td>{booking.slot}</td>

      <td>{booking.status}</td>

      <td>

       <button
        className="bg-green-500 px-4 py-2 rounded"
       >
        Approve
       </button>

       <button
        className="bg-red-500 px-4 py-2 rounded ml-2"
       >
        Reject
       </button>

      </td>

     </tr>

    ))}

   </tbody>

  </table>

 );

}