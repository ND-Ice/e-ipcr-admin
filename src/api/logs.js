import client from "./client";

const getEvaluationLogs = (evaluationId) => client.get(`/logs/${evaluationId}`);

const logsApi = { getEvaluationLogs };
export default logsApi;
