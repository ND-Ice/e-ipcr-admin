import React from "react";
import styled from "styled-components";

export default function SidebarItem({ icon: Icon, onNavigate, sidebarInfo }) {
  return (
    <Container onClick={onNavigate}>
      {Icon && <Icon className="sidebar-icon" />}
      <SidebarTitle>{sidebarInfo?.title}</SidebarTitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    background: ${(props) => props.theme.colors.white};
  }
`;

const SidebarTitle = styled.span`
  margin-left: 1rem;
`;
