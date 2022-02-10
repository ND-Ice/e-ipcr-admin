import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { RotateLoader } from "react-spinners";

import logsApi from "../api/logs";
import { LogItem } from ".";

export default function Logs({ open, id }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getEvaluationLogs = async () => {
      try {
        setLoading(true);
        const response = await logsApi.getEvaluationLogs(id);
        setLoading(false);
        return setLogs(response.data);
      } catch (error) {
        setLoading(false);
        return setErrorMessage(error);
      }
    };

    getEvaluationLogs();
  }, []);

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="fw-bold m-0">EVALUATION LOGS</h6>
        <IconContainer onClick={() => open(false)}>
          <FiX />
        </IconContainer>
      </div>

      {!loading ? (
        <div>
          {logs
            ?.sort((a, b) => b?.date - a?.date)
            ?.map((log) => (
              <LogItem key={log?.id} log={log} />
            ))}
        </div>
      ) : (
        <Loader>
          <RotateLoader loading={true} color="#0064f9" />
        </Loader>
      )}
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

const Loader = styled.div`
  padding: 1rem;
  height: 500px;
  display: grid;
  place-items: center;
`;
