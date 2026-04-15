import { Professor, Student } from "../utils/data";

export const Footer = () => {
  return (
    <footer className="text-gray-600 body-font border-t border-dark-green py-2">
      <div className="container px-3 mx-auto flex items-center justify-around sm:flex-row flex-col">
        <div className="flex items-center sm:mt-0 justify-start">
          <span className="text-sm text-start text-gray-500 sm:py-2 ">
            <span className="font-bold tracking-wider text-dark-green">{`${Student.prefix} `}</span>
            <span className="text-medium-green">{Student.name}</span>
          </span>
          <a
            className="mx-3 sm:ml-3 text-gray-500"
            target="_blank"
            href={Student.instagram}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
        </div>

        <div className="flex items-center sm:mt-0 justify-center sm:justify-start">
          <div className="flex flex-col">
            <div className="flex items-center sm:mt-0 justify-center sm:justify-start">
              <span className="text-sm text-start text-gray-500 sm:py-2 ">
                <span className="font-bold tracking-wider text-dark-green">{`${Professor.prefix} `}</span>
                <span className="text-medium-green">{Professor.name}</span>
              </span>
              <a
                className="ml-3 text-gray-500"
                target="_blank"
                href={Professor.instagram}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </div>
            <div className="flex">
              <a
              className="text-sm text-gray-500"
              target="_blank"
              href={`mailto:${Professor.email}`}
            >
              {Professor.email}
            </a>
            <a
              className="ml-3 text-gray-500"
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${Professor.email}`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <path d="M3 7l9 6 9-6"></path>
              </svg>
            </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
