import { ColumnDef } from "@tanstack/react-table";

export interface User {
  name: string;
  role: string;
  avatar?: string | null;
}

export interface Notification {
  id: number;
  title: string;
  time: string;
  unread: boolean;
}

export interface HeaderProps {
  user?: User;
  notifications?: number;
  onSearch?: (query: string) => void;
  className?: string;
}


export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}