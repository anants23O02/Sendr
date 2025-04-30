'use client'
import {TableProps} from './tableinterface' 
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


type Props={
    data:TableProps[];
}

const ScheduledTable:React.FC<Props>=({data})=> {
  return (
    <div className="p-4">
      <Table>
        <TableCaption>A list of your recent messages.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Sendr</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice) => (
            <TableRow key={invoice.mid}>
              <TableCell className="font-medium">{invoice.mid}</TableCell>
              <TableCell>{invoice.contacts[0]}</TableCell>
              <TableCell>{invoice.message}</TableCell>
              <TableCell className="text-right">{invoice.statusStatusId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default ScheduledTable;