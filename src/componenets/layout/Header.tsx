import { ChevronDown, UserCircle } from "lucide-react";

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
    
  return (
    <header className="flex h-header items-center justify-end border-b border-border bg-surface px-6">
      <button
        type="button"
        className="flex items-center gap-2 rounded-md px-2 py-1.5 transition duration-fast hover:bg-surface-soft"
      >
        <UserCircle
          size={30}
          className="text-navy-400"
        />

        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-text-primary">
            {userName}
          </p>
        </div>

        <ChevronDown
          size={15}
          className="text-text-muted"
        />
      </button>
    </header>
  );
}