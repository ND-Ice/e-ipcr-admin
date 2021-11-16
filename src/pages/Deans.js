import React, { useState } from "react";
import styled from "styled-components";
import { UserCard } from "../components/Cards";
import { FiPlus, FiSearch } from "react-icons/fi";
import { CustomModal, IconButton } from "../components";
import { CreateDeanAccount } from "../components/Modals";

const deans = [
  {
    id: 1,
    name: "Joshua Dela Cruz",
    email: "delacruz.joshua.bscs@gmail.com",
    dept: "CAS",
  },
  {
    id: 2,
    name: "Hazel Annuncio",
    email: "annuncio.hazel.cas@gmail.com",
    dept: "CEN",
  },
  {
    id: 3,
    name: "Arlene Evangelista",
    email: "evangelista.arlene.cen@gmail.com",
    image:
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    dept: "CAFA",
  },
  {
    id: 4,
    name: "Jesus Mangubat",
    email: "mangubat.jesus.cas@gmail.com",
    dept: "CBA",
  },
  {
    id: 5,
    name: "Raymond Bolalin",
    email: "bolalin.raymond.cas@gmail.com",
    dept: "CHM",
  },
  {
    id: 6,
    name: "Jefferson Costales",
    email: "costales.jefferson.cas@gmail.com",
    dept: "CIT",
  },
];

export default function Deans({ history }) {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <Appcontainer>
      <AppHeader>
        <h1 className="m-0">Deans List</h1>
        <IconContainer>
          <IconButton
            icon={FiSearch}
            size={40}
            bg="#0064f9"
            iconColor="#ffffff"
            onClick={() => history.push("/dashboard/deans/search")}
          />
          <IconButton
            icon={FiPlus}
            size={40}
            bg="#0064f9"
            iconColor="#ffffff"
            onClick={() => setIsToggle(true)}
          />
        </IconContainer>
      </AppHeader>

      <AppContent>
        {deans?.map((dean) => (
          <UserCard
            user={dean}
            key={dean.id}
            onClick={() => history.push(`/dashboard/deans/${dean.id}`)}
          />
        ))}
      </AppContent>

      <CustomModal
        heading="Create Dean Account"
        show={isToggle}
        onHide={() => setIsToggle(false)}
      >
        <CreateDeanAccount />
      </CustomModal>
    </Appcontainer>
  );
}

const Appcontainer = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 0.5rem;
`;

const AppHeader = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 4px solid ${(props) => props.theme.colors.secondary};
`;

const IconContainer = styled.div`
  > * {
    margin-left: 5px;
  }
`;

const AppContent = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
