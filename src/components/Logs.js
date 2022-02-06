import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { LogItem } from ".";

const logs = [
  {
    id: 1,
    actionCreator: "Joshua Dela Cruz",
    actionCreatorPosition: "Intermediate Supervisor",
    actionMessage: "Evaluated and subitted the evaluation of",
    actionTarget: "Ezekiel Dela Cruz",
    actionTime: "1 day hours ago",
  },
  {
    id: 2,
    actionCreator: "Sherwin Beltran",
    actionCreatorPosition: "Regular Faculty",
    actionMessage: "Submitted an evaluation response",
    actionTime: "5 hours ago",
  },
  {
    id: 1,
    actionCreator: "Collins Laguit",
    actionCreatorPosition: "DIRECTOR",
    actionMessage: "Approved and signed the evaluation of",
    actionTarget: "Joshua Dela Cruz",
    actionTime: "2 hours ago",
  },
];

export default function Logs({ open }) {
  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="fw-bold m-0">EVALUATION LOGS</h6>
        <IconContainer onClick={() => open(false)}>
          <FiX />
        </IconContainer>
      </div>

      <div>
        {logs?.map((log) => (
          <LogItem key={log?.id} log={log} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 120ms;
  border-radius: 3px;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
