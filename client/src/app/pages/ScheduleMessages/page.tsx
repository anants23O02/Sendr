"use client";

import MessageEditor from "@/components/Editor.tsx/MessageEditor";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ScheduleMessages = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("prev");

  const handleNextPage = () => {
    setCurrentPage("next");
    router.push("/pages/ScheduleMessages/details");
  };

  const handlePreviousPage = () => {
    if (currentPage === "next") {
      setCurrentPage("prev");
      router.push("/pages/ScheduleMessages");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-row gap-2">
        <Sidebar />
        <div className="flex-1 p-4 mx-">
          <MessageEditor />
          <div className="mt-4 flex justify-between mx-20">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === "prev"}
              className={`px-4 py-2 rounded ${
                currentPage === "prev"
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#e2e2e2] hover:text-black hover:bg-[#e2e2e2] text-white"
              }`}
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-[#2e2e2e] text-white rounded hover:bg-[#e2e2e2] hover:text-black transition duration-300 ease-in-out"
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMessages;
