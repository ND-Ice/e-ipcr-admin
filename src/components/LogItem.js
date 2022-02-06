import React from "react";
import styled from "styled-components";

export default function LogItem({ log }) {
  return (
    <Container>
      <h6 className="m-0">
        {log?.actionCreator} ({log?.actionCreatorPosition})
      </h6>
      <p className="m-0">
        {log?.actionMessage}{" "}
        {log?.actionTarget && <strong>{log?.actionTarget}</strong>}
      </p>
      <p className="m-0 mt-2 text-muted">{log?.actionTime}</p>
    </Container>
  );
}
const Container = styled.div`
  padding: 1rem;
  margin: 5px 0;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 3px;
`;
