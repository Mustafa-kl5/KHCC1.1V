import React from "react";

export const Cell = ({
  value,
  onCellPick,
  chosenCells,
  removeCell,
  unavailableCells,
}: {
  value: string;
  onCellPick: (value: string) => void;
  chosenCells: string[];
  removeCell: (value: string) => void;
  unavailableCells: string[];
}) => {
  return (
    <div
      className={`p-1 min-w-10 flex justify-center items-center border border-solid border-gray-300
        ${
          value.length === 1 ||
          value === "10" ||
          value === "11" ||
          value === "12" ||
          value === "13" ||
          value == ""
            ? "bg-slate-100"
            : " cursor-pointer"
        } ${chosenCells.includes(value) ? "bg-slate-600" : undefined} ${
        unavailableCells.includes(value)
          ? "bg-red-600 pointer-events-none"
          : undefined
      }`}
      onClick={() => {
        if (
          value.length === 1 ||
          value === "10" ||
          value === "11" ||
          value === "12" ||
          value === "13" ||
          chosenCells.includes(value) ||
          value == "" ||
          unavailableCells.includes(value)
        ) {
          return;
        }
        onCellPick(value);
      }}
      onDoubleClick={() => {
        if (chosenCells.includes(value)) {
          removeCell(value);
        }
      }}
    >
      <span className="font-bold">{value}</span>
    </div>
  );
};
