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