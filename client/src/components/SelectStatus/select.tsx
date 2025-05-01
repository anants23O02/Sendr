import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import React from "react";
  import { IoFilter } from "react-icons/io5";
  const SelectStatus: React.FC = () => {
    return (
      <Select>
        <SelectTrigger className="w-[120px] flex items-center gap-1">
          <IoFilter style={{color:"gray", fontSize:"9px"}}/> {/* smaller size */}
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Sent">Sent</SelectItem>
          <SelectItem value="Queued">Queued</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Failed">Failed</SelectItem>
        </SelectContent>
      </Select>
    );
  };
  
  export default SelectStatus;
  