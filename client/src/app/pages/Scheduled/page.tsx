"use client"
import { useEffect,useState } from "react";
import ScheduledTable from "@/components/MessageTable/table";
export default function Scheduled() {
    const [message, setMessage] = useState([]);
  const[id,setId]=useState(null)
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
        <p>hii</p>
        <ScheduledTable data={message}/>
      </div>
    );
  }
  