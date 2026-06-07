import { IconBrandInstagram, IconMail } from "@tabler/icons-react";
import type { Person } from "../../utils/data";

export const PersonCard = ({ person }: { person: Person }) => {
  return (
    <div className="flex items-center justify-center gap-2 my-2">
      <img
        src={person.foto}
        alt={`foto-${person.name}`}
        className="w-16 h-16 rounded-full object-cover border border-light-green mr-2 p-1"
      />
      <div className="flex flex-col items-start justify-start">
        <span className="text-dark-green font-medium">{person.name}</span>
        {person.instagram && (
          <a href={person.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <span className="text-dark-green text-sm">{person.instagram}</span>
            <IconBrandInstagram />
          </a>
        )}
        {person.email && (
          <a href={`mailto:${person.email}`} className="flex items-center gap-1">
            <span className="text-dark-green text-sm">{person.email}</span>
            <IconMail />
          </a>
        )}
      </div>
    </div>
  );
};
