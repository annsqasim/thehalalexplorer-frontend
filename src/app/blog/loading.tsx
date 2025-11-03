export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 w-full bg-muted" />
            <div className="p-4">
              <div className="h-6 w-2/3 bg-muted mb-3" />
              <div className="h-4 w-full bg-muted mb-2" />
              <div className="h-4 w-5/6 bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


