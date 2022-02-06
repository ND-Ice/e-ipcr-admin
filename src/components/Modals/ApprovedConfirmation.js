import React from "react";
import { Alert, Button } from "react-bootstrap";
import styled from "styled-components";

export default function ApprovedConfirmation({
  user,
  loading,
  onAccept,
  error,
  onCancel,
}) {
  return (
    <Container>
      <h5>Confirmation</h5>
      <p>Are you sure you want to approve this application?</p>
      {error && (
        <Alert variant="danger">
          {error?.response?.data ||
            "Something went wrong. Please try again later."}
        </Alert>
      )}
      <div className="d-flex justify-content-between">
        <Button
          disabled={loading}
          variant="success"
          onClick={() => onAccept(user?._id)}
        >
          {loading ? "Confirming..." : "Confirm"}
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
