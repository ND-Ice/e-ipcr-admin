import client from "./client";

const getDeans = () => client.get("/deans");
const addDean = (dean) => client.post("/deans", dean);
const activateDeanAccount = (deanId) =>
  client.get(`/deans/activate-account/${deanId}`);

const rejectDeanAccount = (deanId) =>
  client.delete(`/deans/reject-dean/${deanId}`);

const deansApi = { getDeans, addDean, rejectDeanAccount, activateDeanAccount };
export default deansApi;
