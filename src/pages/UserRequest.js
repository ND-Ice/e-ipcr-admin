import React, { useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { Modal, Table } from "react-bootstrap";
import { ApprovedConfirmation } from "../components/Modals";
import RejectConfirmation from "../components/Modals/RejectConfirmation";
import { activateDeanAccount, deansRemoved, getDeans } from "../store/deans";
import deansApi from "../api/deans";
import { useDispatch } from "react-redux";
import UserData from "../components/UserData";

export default function UsersRequests() {
  const history = useHistory();
  const dispatch = useDispatch();
  const deans = useSelector(getDeans);
  const [showApproveConfirmation, setShowApproveConfirmation] = useState(false);
  const [showRejectConfirmation, setShowRejectConfirmation] = useState(false);
  const [toApprovedUser, setToApprovedUser] = useState({});
  const [toRejectUser, setToRejectUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const usersRequests = deans?.list?.filter((user) => !user?.isActivated);

  const handleAccept = async (userId) => {
    try {
      setLoading(true);
      const response = await deansApi.activateDeanAccount(userId);
      setLoading(false);
      setShowApproveConfirmation(false);
      return dispatch(activateDeanAccount({ id: userId, dean: response.data }));
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };

  const handleReject = async (userId) => {
    try {
      setLoading(true);
      await deansApi.rejectDeanAccount(userId);
      setLoading(false);
      dispatch(deansRemoved({ id: userId }));
      return setShowRejectConfirmation(false);
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };

  return (
    <>
      <Container>
        <AppHeader>
          <h5 className="text-uppercase fw-bold m-0">USERS REQUESTS</h5>
          <IconContainer onClick={() => history.goBack()}>
            <FiX />
          </IconContainer>
        </AppHeader>

        {usersRequests?.length === 0 ? (
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
              {usersRequests?.map((user) => (
                <UserData
                  key={user?._id}
                  userInfo={user}
                  onAccept={() => {
                    setShowApproveConfirmation(true);
                    return setToApprovedUser(user);
                  }}
                  onReject={() => {
                    setShowRejectConfirmation(true);
                    return setToRejectUser(user);
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
          user={toApprovedUser}
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
          user={toRejectUser}
          loading={loading}
          error={errorMessage}
          onReject={handleReject}
          onCancel={() => setShowRejectConfirmation(false)}
        />
      </Modal>
    </>
  );
}

const Container = styled.div`
  position: relative;
  overflow-y: auto;
  height: 600px;
`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
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
