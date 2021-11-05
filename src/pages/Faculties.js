import React from "react";
import styled from "styled-components";

export default function Faculties() {
  return <Appcontainer>this is faculties page</Appcontainer>;
}

const Appcontainer = styled.div`
  padding: 1rem;
  border-radius: 0%.5rem;
  background: ${(props) => props.theme.colors.secondary};
`;
