import { combineReducers } from "redux";
import evaluations from "./evaluations";
import notifications from "./notifications";
import faculties from "./faculties";
import deans from "./deans";
import responses from "./responses";

export default combineReducers({
  evaluations,
  notifications,
  faculties,
  deans,
  responses,
});
