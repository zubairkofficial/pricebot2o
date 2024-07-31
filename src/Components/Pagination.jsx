// Pagination.js
import React from "react";

const Pagination = ({
  currentPage,
  totalPage,
  onPageChange,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <ul
      className="flex justify-center items-center gap-x-[10px] z-30"
      role="navigation"
      aria-label="Pagination"
    >
      <li
        className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
          currentPage === 0 ? "bg-[#cccccc] pointer-events-none" : "cursor-pointer"
        }`}
        onClick={onPreviousPage}
      >
        <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
      </li>
      {Array.from({ length: totalPage }).map((_, index) => (
        <li
          className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
            currentPage === index ? "text-blue-600 border-sky-500" : "border-[#E4E4EB]"
          }`}
          onClick={() => onPageChange(index)}
          key={index}
        >
          {index + 1}
        </li>
      ))}
      <li
        className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
          currentPage === totalPage - 1 ? "bg-[#cccccc] pointer-events-none" : "cursor-pointer"
        }`}
        onClick={onNextPage}
      >
        <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
      </li>
    </ul>
  );
};

export default Pagination;
