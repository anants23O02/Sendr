'use client';
import { TableProps } from './tableinterface';
import React from "react";
import { FaEye } from "react-icons/fa";
import { useRouter } from 'next/navigation'; 

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  data: TableProps[];
};

const ScheduledTable: React.FC<Props> = ({ data }) => {
  const router = useRouter(); 

  const handleClick = () => {
    router.push('/pages/ViewMessage'); 
  };

  return (
    <div className="p-4">
      <div className="overflow-auto rounded-2xl shadow-md border border-gray-200">
        <Table className="min-w-full text-sm text-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <TableHead className="p-4 w-[120px]">Message ID</TableHead>
              <TableHead className="p-4">Contact</TableHead>
              <TableHead className="p-4">Message</TableHead>
              <TableHead className="p-4 text-right">Status</TableHead>
              <TableHead className="p-4">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.mid}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <TableCell className="p-2 font-semibold">{row.mid}</TableCell>
                <TableCell className="p-2">{row.contacts[0]}</TableCell>
                <TableCell className="p-2">{row.message}</TableCell>
                <TableCell className="p-2 text-right font-medium">
                  {row.statusStatusId}
                </TableCell>
                <TableCell className="p-2">
                  <FaEye
                    style={{ color: "#3D90D7", cursor: "pointer" }}
                    onClick={handleClick}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ScheduledTable;
