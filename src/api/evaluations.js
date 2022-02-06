import client from "./client";

const getEvaluations = () => client.get("/evaluations");

const evaluationsApi = { getEvaluations };
export default evaluationsApi;
