"use client";

import { useState } from "react";
import SidebarItem from "@/components/menu/item-sidebar";
import { usePathname } from "next/navigation";
import AppMenu from "@/components/ui/appmenu";

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [showAppMenu, setShowAppMenu] = useState(false);
  const path = usePathname();

  return (
    <>
      <aside
        className={`h-screen sticky top-0 max-w-64 transition-all z-40 ${
          expanded ? "w-64" : "w-20"
        }`}
      >
        <nav className="h-full flex flex-col bg-white border-r-2">
          <div className="p-4 pb-2 flex justify-between items-center">
            <h1
              className={`overflow-hidden text-2xl text-retrored transition-all font-semibold ${
                expanded ? "w-64" : "w-0"
              }`}
            >
              +edu
            </h1>

            <button
              onClick={() => setExpanded(!expanded)}
              className="px-2.5 py-2 rounded bg-retrored border shadow-[1.5px_1.5px_0px_0px_black] cursor-pointer"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              <i
                className={`las text-white text-2xl ${
                  expanded ? "la-arrow-left" : "la-arrow-right"
                }`}
              ></i>
            </button>
          </div>

          <ul className={`flex-1 py-4 flex flex-col gap-1 ${expanded ? 'px-3' : 'px-3.5'}`}>
            <SidebarItem
              icon={<i className="las la-table text-2xl" />}
              text="Aplicativos"
              onClick={() => setShowAppMenu(true)}
              active={showAppMenu}
              expanded={expanded}
            />
            <SidebarItem
              icon={<i className="las la-home text-2xl" />}
              text="Entrada"
              href="/home"
              active={path === "/home"}
              expanded={expanded}
            />
            <SidebarItem
              icon={<i className="las la-graduation-cap text-2xl" />}
              text="Enem"
              href="/enem"
              active={path === "/enem"}
              expanded={expanded}
              subItems={[
                {
                  text: "Manual",
                  href: "/enem/manual",
                  active: path === "/enem/manual",
                },
                {
                  text: "Aprovado",
                  href: "/enem/approved",
                  active: path === "/enem/approved",
                },
                {
                  icon: <i className="las la-library text-xl" />,
                  text: "Biblioteca",
                  href: "/enem/library",
                  active: path === "/enem/library",
                },
              ]}
            />
            <SidebarItem
              icon={<i className="las la-users-cog text-2xl" />}
              text="Configurações"
              href="/config"
              active={path === "/config"}
              expanded={expanded}
            />
          </ul>
        </nav>
      </aside>

      {showAppMenu && <AppMenu onClose={() => setShowAppMenu(false)} />}
    </>
  );
}
