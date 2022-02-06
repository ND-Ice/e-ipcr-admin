import React from "react";
import styled from "styled-components";

export default function ResponseCountSummary() {
  return (
    <Container>
      <SummaryItems>
        <SummaryItem>
          All Responses <Badge bg="#0064f9">{20}</Badge>
        </SummaryItem>
        <SummaryItem>
          Missing <Badge bg="#EF4444">{2}</Badge>
        </SummaryItem>
        <SummaryItem>
          Late <Badge bg="#f0c810">{3}</Badge>
        </SummaryItem>
      </SummaryItems>
    </Container>
  );
}

const Container = styled.div`
  height: max-content;
`;

const SummaryItems = styled.div`
  margin: 5px 0;
`;

const SummaryItem = styled.div`
  margin: 2px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  transition: all 0.3s;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Badge = styled.span`
  display: inline-grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 10px;
  font-weight: 500;
  margin-left: 5px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.bg};
  border-radius: 1rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 0.5rem;
  background: ${({ theme }) => theme.colors.secondary};
`;

const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;
