import Link from "next/link";
import React from "react";

const Title = ({
  title,
  subtitle,
  viewAll,
  viewAllLink,
}: {
  title: string;
  subtitle?: string;
  viewAll?: string;
  viewAllLink?: string;
}) => {
  return (
    <div className="flex justify-between items-center gap-2 py-6">
      <div className=" flex flex-col gap-2">
        <h2 className="text-2xl font-medium">{title}</h2>
        {subtitle && <p className="text-base font-light">{subtitle}</p>}
      </div>
      {viewAllLink && (
        <Link className="underline underline-offset-4" href={viewAllLink}>
          {viewAll ? viewAll : "View All"}
        </Link>
      )}
    </div>
  );
};

export default Title;
