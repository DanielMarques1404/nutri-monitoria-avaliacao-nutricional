import { Professor, Student } from "../utils/data";
import { PersonCard } from "./layout/PersonCard";

export const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-evenly gap-2 text-gray-600 body-font border-t-2 border-dark-green py-2 mx-2">
      <PersonCard person={Student} />
      <PersonCard person={Professor} />
    </footer>
  );
};
