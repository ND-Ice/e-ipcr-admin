import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { AppForm, FormControl } from "../forms";
import { Alert } from "react-bootstrap";
import { department } from "../../utils";
import {
  getFaculties,
  clearStatus,
  facultyRequested,
  facultyAdded,
  facultyRequestFailed,
} from "../../store/faculties";
import facultiesApi from "../../api/faculties";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This must be a valid email address.")
    .required("This Field is required."),
  firstName: Yup.string()
    .min(4, "This should be atleast 4 characters Long")
    .required("This field is required."),
  lastName: Yup.string()
    .min(4, "This should be atleast 4 characters Long")
    .required("This field is required."),
  dept: Yup.string().required("This field is required."),
});

export default function CreateFacultyAccount() {
  const dispatch = useDispatch();
  const faculties = useSelector(getFaculties);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      dispatch(facultyRequested());
      const faculty = await facultiesApi.addFaculty(values);
      dispatch(facultyAdded(faculty.data));
      return setTimeout(() => {
        resetForm();
        dispatch(clearStatus());
      }, 2000);
    } catch (error) {
      return dispatch(facultyRequestFailed(error));
    }
  };

  return (
    <AppContainer>
      <AppForm
        initialValues={{ email: "", firstName: "", lastName: "", dept: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="input"
          title="Email Address"
          name="email"
          className="p-2"
          loading={faculties.loading}
        />
        <NameContainer>
          <FormControl
            variant="input"
            title="First Name"
            name="firstName"
            className="p-2"
            loading={faculties.loading}
          />
          <FormControl
            variant="input"
            title="Last Name"
            name="lastName"
            className="p-2"
            loading={faculties.loading}
          />
        </NameContainer>
        <FormControl
          variant="select"
          title="Department"
          name="dept"
          className="p-2"
          menuItems={department}
          loading={faculties.loading}
        />
        {faculties.errorMessage && (
          <Alert variant="danger">
            {faculties?.errorMessage?.response?.data ||
              "Something went wrong. Please try again later."}
          </Alert>
        )}
        {faculties.successMessage && (
          <Alert variant="success">{faculties.successMessage.message}</Alert>
        )}
        <FormControl
          variant="button"
          title="Create Account"
          className="p-2"
          loading={faculties.loading}
        />
      </AppForm>
    </AppContainer>
  );
}

const AppContainer = styled.section``;

const NameContainer = styled.div`
  display: grid;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;
