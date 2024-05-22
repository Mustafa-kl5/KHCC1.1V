import React from "react";

export const ScrollableContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full overflow-y-auto flex flex-col gap-3 pe-3 ">
      {children}
    </div>
  );
};
