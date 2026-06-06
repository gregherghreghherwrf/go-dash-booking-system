import Sidebar from "../../../components/admin/Sidebar";

export default function FacilitiesPage() {

 const facilities = [

 "Court 1",
 "Court 2",
 "Court 3",
 "Court 4",
 "Court 5",
 "Court 6",
 "Turf 1",
 "Turf 2"

 ];

 return(

  <div className="flex">

   <Sidebar />

   <main className="ml-72 p-10 w-full">

    <h1 className="text-4xl font-bold">

     Facilities

    </h1>

    <div className="grid grid-cols-4 gap-4 mt-10">

     {facilities.map((item)=>(

      <div
       key={item}
       className="bg-zinc-900 p-5 rounded"
      >

       {item}

      </div>

     ))}

    </div>

   </main>

  </div>

 );

}