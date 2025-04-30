export interface TableProps {
    mid: number;
    message: string;
    contacts: string[];        // array of phone numbers
    schedule: string[];        // adjust to Date[] if these will be ISO strings
    senderId: number;
    statusStatusId: number;  
  }