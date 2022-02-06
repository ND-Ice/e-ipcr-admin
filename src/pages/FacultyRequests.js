import React, { useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { RequestCard } from "../components/Cards";
import {
  activateFaculty,
  facultyRemoved,
  getFaculties,
} from "../store/faculties";
import { useHistory } from "react-router-dom";
import { Modal, Table } from "react-bootstrap";
import { ApprovedConfirmation } from "../components/Modals";
import RejectConfirmation from "../components/Modals/RejectConfirmation";
import facultiesApi from "../api/faculties";
import UserData from "../components/UserData";

export default function FacultyRequests() {
  const dispatch = useDispatch();
  const history = useHistory();
  const faculties = useSelector(getFaculties);
  const [showApproveConfirmation, setShowApproveConfirmation] = useState(false);
  const [toApprovedFaculty, setToApprovedFaculty] = useState({});
  const [showRejectConfirmation, setShowRejectConfirmation] = useState(false);
  const [toRejectFaculty, setToRejectFaculty] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const facultyRequests = faculties?.list?.filter(
    (faculty) => !faculty?.isActivated
  );

  const handleAccept = async (facultyId) => {
    try {
      setLoading(true);
      const response = await facultiesApi.activatedFaculty(facultyId);
      setLoading(false);
      setShowApproveConfirmation(false);
      return dispatch(
        activateFaculty({ id: facultyId, faculty: response.data })
      );
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };

  const handleReject = async (facultyId) => {
    try {
      setLoading(true);
      await facultiesApi.rejectFaculty(facultyId);
      setLoading(false);
      dispatch(facultyRemoved({ id: facultyId }));
      return setShowRejectConfirmation(false);
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };

  return (
    <>
      <Container>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h5 className="text-uppercase fw-bold">Faculties Requests</h5>
          <IconContainer onClick={() => history.goBack()}>
            <FiX />
          </IconContainer>
        </div>

        {facultyRequests?.length === 0 ? (
          <Message>No requests yet.</Message>
        ) : (
          <Table borderless className="mt-2 w-100">
            <TableHead>
              <TableHeader>Profile</TableHeader>
              <TableHeader>Email Address</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Position</TableHeader>
              <TableHeader>College</TableHeader>
            </TableHead>
            <tbody>
              {facultyRequests?.map((faculty) => (
                <UserData
                  key={faculty?._id}
                  userInfo={faculty}
                  onAccept={() => {
                    setShowApproveConfirmation(true);
                    return setToApprovedFaculty(faculty);
                  }}
                  onReject={() => {
                    setShowRejectConfirmation(true);
                    return setToRejectFaculty(faculty);
                  }}
                />
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <Modal
        show={showApproveConfirmation}
        onHide={() => setShowApproveConfirmation(false)}
      >
        <ApprovedConfirmation
          user={toApprovedFaculty}
          loading={loading}
          error={errorMessage}
          onAccept={handleAccept}
          onCancel={() => setShowApproveConfirmation(false)}
        />
      </Modal>

      <Modal
        show={showRejectConfirmation}
        onHide={() => setShowRejectConfirmation(false)}
      >
        <RejectConfirmation
          user={toRejectFaculty}
          onReject={handleReject}
          loading={loading}
          error={errorMessage}
          onCancel={() => setShowRejectConfirmation(false)}
        />
      </Modal>
    </>
  );
}

const Container = styled.div`
  padding: 1rem;
  position: relative;
  overflow-y: auto;
  height: 600px;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  display: grid;
  border-radius: 3px;
  place-items: center;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Message = styled.div`
  width: max-content;
  padding: 1rem 2rem;
  border: 2px solid ${({ theme }) => theme.colors.accent.emerald};
  color: ${({ theme }) => theme.colors.accent.emerald};
  position: absolute;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TableHead = styled.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const TableHeader = styled.th`
  padding: 1rem;
  font-weight: 500;
  text-transform: uppercase;
`;
