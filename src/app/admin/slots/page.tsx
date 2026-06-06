import Sidebar from "../../../components/admin/Sidebar";

export default function SlotPage(){

 return(

  <div className="flex">

   <Sidebar />

   <main className="ml-72 p-10">

    <h1 className="text-4xl font-bold">

     Slot Management

    </h1>

    <div className="mt-10">

     <button
      className="bg-red-500 px-6 py-3 rounded"
     >
      Block Selected Slot
     </button>

    </div>

   </main>

  </div>

 );

}