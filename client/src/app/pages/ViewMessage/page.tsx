"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const monthNames = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString("default", { month: "long" })
);

const ViewMessage = () => {
  const [messageCount, setMessageCount] = useState("Once");
  const [sendFrequency, setSendFrequency] = useState("Once");
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const [selectedMonthDays, setSelectedMonthDays] = useState<string[]>([]);
  const [selectedYearlyDates, setSelectedYearlyDates] = useState<string[]>([]);
  const [customDates, setCustomDates] = useState<string[]>([]);
  const [multipleTimes, setMultipleTimes] = useState<string[]>([""]);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("next");

  const handleSubmit = () => {
    setCurrentPage("next");
    router.push("/pages/ScheduleMessages/details");
  };

  const handlePreviousPage = () => {
    if (currentPage === "next") {
      setCurrentPage("prev");
      router.push("/pages/ScheduleMessages");
    }
  };

  const handleToggle = (
    list: string[],
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleCustomDateAdd = (date: string) => {
    if (date && !customDates.includes(date)) {
      setCustomDates((prev) => [...prev, date]);
    }
  };

  const handleCustomDateRemove = (date: string) => {
    setCustomDates((prev) => prev.filter((d) => d !== date));
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...multipleTimes];
    newTimes[index] = value;
    setMultipleTimes(newTimes);
  };

  const addTimeField = () => {
    setMultipleTimes([...multipleTimes, ""]);
  };

  const removeTimeField = (index: number) => {
    const newTimes = multipleTimes.filter((_, i) => i !== index);
    setMultipleTimes(newTimes);
  };

  const today = new Date();

  return (
    <div className="min-h-screen flex flex-col">
          <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Message Details
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Provide details of the message along with your scheduling
                preferences.
              </p>
            </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        
    
          <div className="max-w-5xl w-full m-2 bg-white shadow-md rounded-lg p-6">
          

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-4 rounded-lg">
              <div>
                <Label htmlFor="messageType">Message Type</Label>
                <select
                  id="messageType"
                  className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="SMS">SMS</option>
                  <option value="WHATSAPP">WhatsApp</option>
                </select>
              </div>

              <div>
                <Label htmlFor="recipientNumber">Recipient Number</Label>
                <Input
                  id="recipientNumber"
                  placeholder="Enter recipient number"
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <input
                  type="date"
                  id="startDate"
                  className="mt-1 border rounded-md p-2 w-full"
                />
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <input
                  type="date"
                  id="endDate"
                  className="mt-1 border rounded-md p-2 w-full"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="messageCount">Message Frequency</Label>
                <select
                  id="messageCount"
                  value={messageCount}
                  onChange={(e) => setMessageCount(e.target.value)}
                  className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="Once">Once</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Custom">Custom Dates</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="sendFrequency">Send Frequency per Day</Label>
                <select
                  id="sendFrequency"
                  value={sendFrequency}
                  onChange={(e) => setSendFrequency(e.target.value)}
                  className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="Once">Once</option>
                  <option value="Multiple">Multiple</option>
                </select>
              </div>

              {sendFrequency === "Once" && (
                <div className="md:col-span-2">
                  <Label htmlFor="MessageTime">Message Time</Label>
                  <input
                    type="time"
                    id="MessageTime"
                    className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
              )}

              {sendFrequency === "Multiple" && (
                <div className="md:col-span-2">
                  <Label>Message Times</Label>
                  {multipleTimes.map((time, index) => (
                    <div key={index} className="flex items-center gap-3 mt-2">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) =>
                          handleTimeChange(index, e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeTimeField(index)}
                        className="text-red-600 text-xl"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTimeField}
                    className="text-blue-600 mt-2 underline text-sm"
                  >
                    + Add Time
                  </button>
                </div>
              )}
            </div>

            {/* Weekly */}
            {messageCount === "Weekly" && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Select Weekdays</h2>
                <div className="flex flex-wrap gap-2">
                  {weekdays.map((day) => (
                    <button
                      key={day}
                      onClick={() =>
                        handleToggle(selectedWeekdays, day, setSelectedWeekdays)
                      }
                      className={`px-4 py-2 rounded border transition ${
                        selectedWeekdays.includes(day)
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Monthly */}
            {messageCount === "Monthly" && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                  Select Day(s) of the Month
                </h2>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from(
                    {
                      length: new Date(
                        today.getFullYear(),
                        today.getMonth() + 1,
                        0
                      ).getDate(),
                    },
                    (_, i) => {
                      const day = (i + 1).toString();
                      const currentDay = today.getDate();
                      const currentMonth = today.getMonth();

                      // If start date is selected and falls in the current month, disable past days
                      const isPast =
                        currentMonth === today.getMonth() && currentDay > i + 1;

                      return (
                        <button
                          key={day}
                          onClick={() =>
                            handleToggle(
                              selectedMonthDays,
                              day,
                              setSelectedMonthDays
                            )
                          }
                          disabled={isPast}
                          className={`px-3 py-1 text-sm border rounded ${
                            selectedMonthDays.includes(day)
                              ? "bg-gray-800 text-white"
                              : "bg-white text-gray-800"
                          } ${isPast ? "opacity-40 cursor-not-allowed" : ""}`}
                        >
                          {day}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Yearly */}
            {messageCount === "Yearly" && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">
                  Select Month and Dates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {monthNames.map((month, monthIndex) => (
                    <div key={month} className="border rounded p-4">
                      <h3 className="font-semibold mb-2">{month}</h3>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 31 }, (_, i) => {
                          const label = `${month}-${i + 1}`;
                          const isPast =
                            new Date(
                              `${month} ${i + 1}, ${today.getFullYear()}`
                            ) < today;

                          return (
                            <button
                              key={label}
                              onClick={() =>
                                handleToggle(
                                  selectedYearlyDates,
                                  label,
                                  setSelectedYearlyDates
                                )
                              }
                              disabled={isPast}
                              className={`text-xs px-2 py-1 border rounded ${
                                selectedYearlyDates.includes(label)
                                  ? "bg-gray-800 text-white"
                                  : "bg-white text-gray-800"
                              } ${
                                isPast ? "opacity-40 cursor-not-allowed" : ""
                              }`}
                            >
                              {i + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Dates */}
            {messageCount === "Custom" && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                  Select Custom Dates
                </h2>
                <input
                  type="date"
                  onChange={(e) => handleCustomDateAdd(e.target.value)}
                  className="border p-2 rounded w-full sm:w-auto"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {customDates.map((date) => (
                    <span
                      key={date}
                      className="bg-gray-200 px-3 py-1 rounded-full flex items-center"
                    >
                      {date}
                      <button
                        onClick={() => handleCustomDateRemove(date)}
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === "prev"}
                className={`px-6 py-2 rounded ${
                  currentPage === "prev"
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Previous Page
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
              >
                Submit
              </button>
            </div>
          </div>
       
      </div>
    </div>
  );
};

export default ViewMessage;

