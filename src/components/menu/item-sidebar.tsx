import Link from "next/link";
import { ReactNode, useState } from "react";

interface SubItem {
  icon?: ReactNode;
  text: string;
  href: string;
  active: boolean;
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  href?: string;
  expanded: boolean;
  onClick?: () => void;
  subItems?: SubItem[];
  isSubItem?: boolean;
}

export default function SidebarItem({
  icon,
  text,
  active = false,
  href,
  expanded,
  subItems = [],
  isSubItem = false,
  onClick,
}: SidebarItemProps) {
  const [subExpanded, setSubExpanded] = useState(false);
  const hasSubItems = subItems.length > 0;

  const toggleSubExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSubExpanded(!subExpanded);
  };

  const content = (
    <div
      className={`
        flex items-center py-2.5 px-3 my-1 w-full font-medium rounded cursor-pointer
        transition-all group duration-300 border 
        ${
          active
            ? "bg-retrored border-black shadow-[2px_2px_0px_0px_black] hover:bg-red-500 text-retrowhite"
            : "text-retrobrown border-transparent hover:bg-retrowhite duration-300"
        }
        ${expanded ? "justify-between" : "justify-center"}
        select-none
      `}
      onClick={onClick}
    >
      <div className="flex items-center overflow-hidden">
        <span className="flex items-center">{icon}</span>
        <span
          className={`ml-3 font-medium truncate transition-all duration-300 ${
            expanded ? "w-auto" : "w-0 hidden"
          }`}
        >
          {text}
        </span>
      </div>

      {hasSubItems && expanded && !isSubItem && (
        <button
          aria-label={subExpanded ? "Collapse submenu" : "Expand submenu"}
          onClick={toggleSubExpanded}
          className={`ml-2 flex-shrink-0 flex items-center rounded`}
        >
          <i
            className={`las text-xl transition-transform duration-300 cursor-pointer ${
              subExpanded ? "la-angle-up" : "la-angle-down"
            }`}
          />
        </button>
      )}
    </div>
  );

  return (
    <li>
      {href ? <Link href={href}>{content}</Link> : content}

      {hasSubItems && (
        <ul
          className={`
            bg-retrowhite mt-3 rounded shadow-sm
            ${expanded ? (subExpanded ? "block" : "hidden") : "hidden"}
            ${expanded ? "border-l-5 border-retroyellow ml-4 " : ""}
          `}
        >
          {subItems.map((subItem, idx) => (
            <SidebarItem
              key={idx}
              icon={subItem.icon || null}
              text={subItem.text}
              href={subItem.href}
              active={subItem.active}
              expanded={expanded}
              isSubItem={true}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
