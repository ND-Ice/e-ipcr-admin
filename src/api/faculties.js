import client from "./client";

const getFaculties = () => client.get("/faculties");
const addFaculty = (faculty) => client.post("/faculties", faculty);
const activatedFaculty = (facultyId) =>
  client.get(`/faculties/activate-account/${facultyId}`);

const rejectFaculty = (facultyId) =>
  client.delete(`/faculties/reject-faculty/${facultyId}`);

const facultiesApi = {
  getFaculties,
  addFaculty,
  activatedFaculty,
  rejectFaculty,
};
export default facultiesApi;
