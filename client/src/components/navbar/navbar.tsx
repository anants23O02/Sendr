import { FC } from "react";
import { Search } from "lucide-react";
import { SearchBarProps } from "./navbarInterface";


const Navbar: FC<SearchBarProps> = ({ placeholder = "Search in Public Relations" }) => {
  return (
    <div className="bg-[#e6eaee] rounded-md p-1">
      <div className="flex items-center bg-[#1b1b1b] rounded-md px-4 py-4">
        <Search className="text-white opacity-70 mr-2 h-4 w-4" />
        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent text-white text-sm placeholder-white placeholder-opacity-70 focus:outline-none w-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
