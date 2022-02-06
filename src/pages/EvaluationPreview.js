import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FiCalendar } from "react-icons/fi";

import { Logs, ResponseCountSummary } from "../components";

import evaluationsApi from "../api/evaluations";
import {
  evaluationsRequested,
  evaluationPreviewed,
  evaluationsRequestFailed,
  getEvaluations,
} from "../store/evaluations";
import { Button, Modal } from "react-bootstrap";

export default function EvaluationPreview({ match }) {
  const dispatch = useDispatch();
  const id = match.params.id;
  const evaluations = useSelector(getEvaluations);
  const evaluation = evaluations.preview;
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    getEvaluationPreview(id);
  }, []);

  const getEvaluationPreview = async (evaluationId) => {
    try {
      dispatch(evaluationsRequested());
      const evaluation = await evaluationsApi.getEvaluationPreview(
        evaluationId
      );
      return dispatch(evaluationPreviewed(evaluation.data));
    } catch (error) {
      return dispatch(evaluationsRequestFailed(error));
    }
  };

  return (
    <>
      <AppContainer>
        <Title>
          Individual Performance Commitment Review (IPCR){" "}
          <strong>
            {evaluation.targetYear}-{evaluation.targetYear - 1}
          </strong>
        </Title>
        <DueDate>
          <FiCalendar className="icon" /> {moment(evaluation.due).format("LL")}
        </DueDate>
        <AppContent>
          <ResponseCountSummary />
          <Button
            variant="outline-primary"
            className="mt-3"
            onClick={() => setShowLogs(true)}
          >
            View Logs
          </Button>
        </AppContent>
      </AppContainer>

      <Modal fullscreen show={showLogs} onHide={() => setShowLogs(false)}>
        <Logs open={setShowLogs} />
      </Modal>
    </>
  );
}

const AppContainer = styled.div``;

const AppContent = styled.div`
  margin-top: 1rem;
`;

const Title = styled.h4`
  width: 40ch;
`;

const DueDate = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 0.5rem;
  }
`;
