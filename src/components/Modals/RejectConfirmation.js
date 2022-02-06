import React from "react";
import { Alert, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function RejectConfirmation({
  user,
  loading,
  error,
  onReject,
  onCancel,
}) {
  return (
    <Container>
      <h5>Confirmation</h5>
      <p>Are you sure you want to reject this application?</p>
      {error && (
        <Alert variant="danger">
          {error?.response?.data ||
            "Something went wrong. Please try again later."}
        </Alert>
      )}
      <div className="d-flex justify-content-between">
        <Button
          disabled={loading}
          variant="danger"
          onClick={() => onReject(user?._id)}
        >
          {loading ? "Rejecting..." : "Reject"}
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
