import React from "react";

const Card = ({ title, subtitle }: any) => (
  <div className=" font-serif  w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="sm:flex sm:items-center px-6 py-4">
      <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
        <p className="text-xl leading-tight">{title}</p>
        <p className="text-sm leading-tight text-grey-dark">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default Card;
