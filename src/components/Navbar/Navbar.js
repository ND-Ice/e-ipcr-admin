import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, BrandName, IconButton } from "..";
import { Notifications } from "../Notifications";
import { Sidebar, SidebarItem } from "../Sidebar";
import {
  FiCalendar,
  FiClock,
  FiFolder,
  FiHome,
  FiMenu,
  FiUsers,
} from "react-icons/fi";

const sidebarItems = [
  { id: 1, path: "/", title: "Home", icon: FiHome },
  { id: 2, path: "/faculties", title: "Faculties", icon: FiUsers },
  { id: 3, path: "/deans", title: "Deans", icon: FiUsers },
  { id: 4, path: "/evaluations", title: "Evaluations", icon: FiFolder },
  {
    id: 5,
    path: "/ongoing-evaluations",
    title: "Ongoing Evaluations",
    icon: FiClock,
  },
  {
    id: 6,
    path: "/past-evaluations",
    title: "Past Evaluations",
    icon: FiCalendar,
  },
];

export default function Navbar() {
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);

  const handleSidebarToggle = () => setIsSidebarToggle(!isSidebarToggle);

  return (
    <NavContainer>
      <BrandName />
      <StatusContainer>
        <Avatar
          user={{
            dept: "CAS",
            image:
              "https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png",
          }}
        />
        <IconButton
          className="menu-icon"
          size={40}
          icon={FiMenu}
          iconColor="black"
          onClick={handleSidebarToggle}
        />
      </StatusContainer>

      <Sidebar isToggle={isSidebarToggle} onSidebarToggle={handleSidebarToggle}>
        {sidebarItems?.map((sidebarInfo) => (
          <SidebarItem
            sidebarInfo={sidebarInfo}
            key={sidebarInfo.id}
            icon={sidebarInfo?.icon}
            onNavigate={handleSidebarToggle}
          />
        ))}
      </Sidebar>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.secondary};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    padding: 1rem 5rem;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin: 0 0.2rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    .menu-icon {
      display: none;
    }
  }
`;
