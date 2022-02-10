import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table } from "react-bootstrap";
import { FiCalendar } from "react-icons/fi";

import { Logs, ResponseData, ViewResponse } from "../components";
import evaluationsApi from "../api/evaluations";
import responseApi from "../api/response";
import { MyLoader } from "../components";

import {
  evaluationsRequested,
  evaluationPreviewed,
  evaluationsRequestFailed,
  getEvaluations,
} from "../store/evaluations";
import { evaluationResponseReceived, getResponses } from "../store/responses";

export default function EvaluationPreview({ match }) {
  const dispatch = useDispatch();
  const { list } = useSelector(getResponses);
  const id = match.params.id;
  const evaluations = useSelector(getEvaluations);
  const evaluation = evaluations?.preview;
  const [showLogs, setShowLogs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedResponse, setSelectedResponse] = useState({});
  const [showResponsePreview, setShowResponsePreview] = useState(false);

  useEffect(() => {
    getEvaluationResponse(id);
  }, []);

  const evaluationPreview = evaluations?.list?.filter(
    (evaluation) => evaluation?._id === id
  )[0];

  const getEvaluationResponse = async (evaluationId) => {
    try {
      setLoading(true);
      const response = await responseApi.getEvaluationResponse(evaluationId);
      setLoading(false);
      return dispatch(evaluationResponseReceived(response.data));
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };

  return (
    <>
      <AppContainer>
        <Title>
          Individual Performance Commitment Review (IPCR){" "}
          <strong>
            {parseInt(evaluationPreview.targetYear) - 1} -{" "}
            {evaluationPreview?.targetYear}
          </strong>
        </Title>
        <DueDate>
          <FiCalendar className="icon" /> Due{" "}
          {moment(evaluationPreview?.due).endOf("day").fromNow()}
        </DueDate>
        <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
          <h5 className="m-0 text-uppercase fw-bold">Reponses</h5>
          <Button variant="outline-primary" onClick={() => setShowLogs(true)}>
            View Logs
          </Button>
        </div>

        {loading ? (
          <MyLoader />
        ) : (
          <Table>
            <tbody>
              <tr className="text-uppercase">
                <td>Profile</td>
                <td>Name</td>
                <td>Email Address</td>
                <td>Date Submitted</td>
                <td>Final Average</td>
                <td>Adjectival Rating</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={7}></td>
              </tr>
              {list?.map((response) => (
                <ResponseData
                  key={response?._id}
                  response={response}
                  onPreview={() => {
                    setSelectedResponse(response);
                    return setShowResponsePreview(true);
                  }}
                />
              ))}
            </tbody>
          </Table>
        )}
      </AppContainer>

      <Modal fullscreen show={showLogs} onHide={() => setShowLogs(false)}>
        <Logs open={setShowLogs} id={id} />
      </Modal>
      <Modal
        fullscreen
        show={showResponsePreview}
        onHide={() => setShowResponsePreview(false)}
      >
        <ViewResponse
          response={selectedResponse}
          open={setShowResponsePreview}
        />
      </Modal>
    </>
  );
}

const AppContainer = styled.div`
  padding: 1rem;
  height: 600px;
  overflow: auto;
`;

const AppContent = styled.div`
  margin-top: 1rem;
`;

const Title = styled.h5`
  width: 40ch;
  font-weight: 500;
  text-transform: uppercase;
`;

const DueDate = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 0.5rem;
  }
`;
