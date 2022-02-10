import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  evaluationsReceived,
  evaluationsRequested,
  evaluationsRequestFailed,
  getEvaluations,
} from "../store/evaluations";
import { EvaluationCard } from "../components/Cards";
import evaluationsApi from "../api/evaluations";
import { MyLoader } from "../components";

export default function Evaluations({ history }) {
  const dispatch = useDispatch();
  const evaluations = useSelector(getEvaluations);

  useEffect(() => {
    const getEvaluations = async () => {
      try {
        dispatch(evaluationsRequested());
        const response = await evaluationsApi.getEvaluations();
        return dispatch(evaluationsReceived(response.data));
      } catch (error) {
        evaluationsRequestFailed(error);
      }
    };
    getEvaluations();
  }, []);

  return (
    <AppContainer>
      <AppHeader>
        <h5 className="m-0 fw-bold">EVALUATIONS</h5>
      </AppHeader>

      {evaluations?.loading ? (
        <MyLoader />
      ) : (
        <div>
          {evaluations?.list?.map((evaluation) => (
            <EvaluationCard
              evaluationInfo={evaluation}
              key={evaluation.id}
              onPreview={() =>
                history.push(`/dashboard/evaluations/${evaluation._id}`)
              }
            />
          ))}
        </div>
      )}
    </AppContainer>
  );
}

const AppContainer = styled.div``;

const AppHeader = styled.div`
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 0.5rem;
`;
