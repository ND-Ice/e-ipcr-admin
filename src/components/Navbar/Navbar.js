import React, { useState } from "react";
import styled from "styled-components";
import { AvatarMenu, BrandName, IconButton } from "..";
import { Sidebar, SidebarItem } from "../Sidebar";
import { FiFolder, FiMenu, FiUsers } from "react-icons/fi";
import { useHistory, useLocation } from "react-router";

const sidebarItems = [
  { id: 1, path: "/dashboard", title: "FACULTIES", icon: FiUsers },
  { id: 2, path: "/dashboard/users", title: "OFFICERS", icon: FiUsers },
  {
    id: 3,
    path: "/dashboard/evaluations",
    title: "EVALUATIONS",
    icon: FiFolder,
  },
];

export default function Navbar({ user }) {
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleSidebarToggle = () => setIsSidebarToggle(!isSidebarToggle);

  return (
    <NavContainer>
      <BrandName />
      <StatusContainer>
        <AvatarMenu user={user} />
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
            isActive={location.pathname === sidebarInfo.path}
            onNavigate={() => {
              history.push(sidebarInfo.path);
              return handleSidebarToggle();
            }}
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
  z-index: 10;
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
