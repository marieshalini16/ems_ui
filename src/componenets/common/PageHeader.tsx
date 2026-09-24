import Button from "../ui/Button";

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function PageHeader({
  title,
  actionLabel,
  onAction,
}: PageHeaderProps) {
  
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">
          {title}
        </h1>
      </div>

      {actionLabel && (
        <Button
          fullWidth={false}
          type="button"
          onClick={onAction}
        >
          <span className="mr-1.5 text-base">+</span>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}