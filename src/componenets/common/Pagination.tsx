interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-4 flex justify-center ">
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            border
            border-border
            bg-white
            text-text-secondary
            transition
            hover:bg-surface-muted
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          ‹
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1,
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber) }
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-md
              text-sm
              font-medium
              transition

              ${
                pageNumber === page
                  ? "bg-primary-600 text-white"
                  : "border border-border bg-surface text-text-secondary hover:bg-surface-muted"
              }
            `}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            border
            border-border
            bg-surface
            text-text-secondary
            transition
            hover:bg-surface-muted
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          ›
        </button>
      </div>
    </div>
  );
}