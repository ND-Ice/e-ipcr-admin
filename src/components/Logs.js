import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import logsApi from "../api/logs";

import { LogItem } from ".";

export default function Logs({ open, id }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getEvaluationLogs = async () => {
      try {
        const response = await logsApi.getEvaluationLogs(id);
        setLogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getEvaluationLogs();
  }, []);

  console.log(logs);

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
