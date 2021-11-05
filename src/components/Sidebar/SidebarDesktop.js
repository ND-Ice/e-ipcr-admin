import React from "react";
import styled from "styled-components";
import { FiCalendar, FiClock, FiFolder, FiHome, FiUsers } from "react-icons/fi";

import { SidebarItem } from ".";
import { useHistory } from "react-router";

const sidebarItems = [
  { id: 1, path: "/dashboard", title: "Home", icon: FiHome },
  { id: 2, path: "/dashboard/faculties", title: "Faculties", icon: FiUsers },
  { id: 3, path: "/dashboard/deans", title: "Deans", icon: FiUsers },
  {
    id: 4,
    path: "/dashboard/evaluations",
    title: "Evaluations",
    icon: FiFolder,
  },
  {
    id: 5,
    path: "/dashboard/ongoing-evaluations",
    title: "Ongoing Evaluations",
    icon: FiClock,
  },
  {
    id: 6,
    path: "/dashboard/past-evaluations",
    title: "Past Evaluations",
    icon: FiCalendar,
  },
];

export default function SidebarDesktop() {
  const history = useHistory();

  return (
    <SidebarContainer>
      {sidebarItems?.map((sidebarInfo) => (
        <SidebarItem
          sidebarInfo={sidebarInfo}
          key={sidebarInfo.id}
          icon={sidebarInfo?.icon}
          onNavigate={() => history.push(sidebarInfo.path)}
        />
      ))}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  display: none;
  height: max-content;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    display: block;
  }
`;
