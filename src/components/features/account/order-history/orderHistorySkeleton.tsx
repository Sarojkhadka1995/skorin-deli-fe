import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function OrderHistorySkeleton() {
  return (
    <>
      {[1, 2, 3].map((index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[80px]" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[70px] ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
