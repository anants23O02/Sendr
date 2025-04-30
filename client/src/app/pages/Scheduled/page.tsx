"use client"
import { useEffect,useState } from "react";
import ScheduledTable from "@/components/MessageTable/table";
import SelectStatus from "@/components/SelectStatus/select";
import { Search } from "lucide-react";
import { IoIosAdd } from "react-icons/io";
export default function Scheduled() {
    const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/message/messages')
      .then(response => response.json())
      .then((data) => {setMessage(data)
        console.log("data",data);
      })
      .catch(error => {
        console.log('Error', error);
       
      });
  }, []);
    return (
      <div>
       <div className="flex w-full justify-between items-stretch p-4">
       <p className="underline">Messages</p>
       <div className="flex bg-[#2e2e2e] text-white shadow-grey-50 rounded-md  p-2 text-xs">
       

        New Message</div>
       </div>
        <div className="  shadow-black rounded-md mt-4  w-full h-24 p-4">
         <div className="flex">
         <div className="p-4">
          <SelectStatus/>
          </div>
          
      <div className="flex items-center bg-white rounded-md px-4 py-2 w-1/2 sm:w-1/3 focus:outline-grey">
        <Search className="text-black opacity-70 mr-2 h-4 w-4 " />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-black text-sm placeholder-black placeholder-opacity-70 focus:outline-none w-full"
        />
      </div>
         </div>
        <div className="bg-white">
        <ScheduledTable data={message}/>
        </div>
       
        </div>
      </div>
    );
  }
  