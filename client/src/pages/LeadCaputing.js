import React from "react";

const LeadCaputing = () => {
  return (
    <div className="flex justify-center items-center mt-[10px] h-[700px] w-screen items-center overflow-hidden px-2">
      <div className="h-[100%]">
        <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
          <div className="bg-blue-800 px-10 py-10 text-center text-white">
            <p className="font-serif text-2xl font-semibold tracking-wider">
              Lead Capturing App
            </p>
            <p className="text-center text-blue-100">
              Please provide your contact details
            </p>
          </div>

          <div className="space-y-4 px-8 py-10">
            <label className="block" htmlFor="name">
              <p className="text-gray-600">Name</p>
              <input
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                placeholder="Enter your name"
              />
            </label>
            <label className="block" htmlFor="name">
              <p className="text-gray-600">Email Address</p>
              <input
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                type="email"
                placeholder="Enter your email"
              />
            </label>
            <label className="block" htmlFor="name">
              <p className="text-gray-600">Phone number</p>
              <input
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                placeholder="Enter your Phone number"
              />
            </label>
            <button className="mt-4 rounded-full bg-blue-800 px-10 py-2 font-semibold text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaputing;
