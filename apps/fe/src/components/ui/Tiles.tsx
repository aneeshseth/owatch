import React from "react";

function Tiles() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-6 md:py-8">
      <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-blue-800 opacity-95 group-hover:opacity-100 transition-opacity" />
        <div className="relative p-6">
          <CloudIcon className="w-12 h-12 text-white mb-4" />
          <h3 className="text-lg font-semibold text-white">
            Video Transcoding
          </h3>
          <p className="text-white/60 mt-2">
            Videos are transcoded on AWS ECS containers as tasks which run on
            demand, and stored into S3 with communication through serverless
            functions in AWS Lambda as triggers.
          </p>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-green-800 opacity-95 group-hover:opacity-100 transition-opacity" />
        <div className="relative p-6">
          <ShieldIcon className="w-12 h-12 text-white mb-4" />
          <h3 className="text-lg font-semibold text-white">Frontend</h3>
          <p className="text-white/60 mt-2">
            The frontend is written in 100% with components in NextJS 13 using
            ShadCN/ui & tailwind CSS.
          </p>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-red-800 opacity-95 group-hover:opacity-100 transition-opacity" />
        <div className="relative p-6">
          <HelpCircleIcon className="w-12 h-12 text-white mb-4" />
          <h3 className="text-lg font-semibold text-white">
            Containerization & Deployment
          </h3>
          <p className="text-white/60 mt-2">
            All the other required backend communication is done using
            Typescript ExpressJS servers and routing, containerized with Docker
            deployed on AWS.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tiles;

function CloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function HelpCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function ShieldIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}
