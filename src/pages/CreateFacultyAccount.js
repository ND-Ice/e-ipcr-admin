import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { AppForm, FormControl } from "../components/forms";

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
});

export default function CreateFacultyAccount() {
  const handleSubmit = (values) => console.log(values);

  return (
    <AppContainer>
      <FormContainer>
        <AppForm
          initialValues={{ email: "", firstName: "", lastName: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <h1 className="mb-2">Create Faculty Account</h1>
          <p className="mb-4">
            This process is only available for admin. only admin can perform
            this action
          </p>

          <FormControl
            variant="input"
            title="Email Address"
            name="email"
            className="p-2"
          />
          <FormControl
            variant="input"
            title="First Name"
            name="firstName"
            className="p-2"
          />
          <FormControl
            variant="input"
            title="Last Name"
            name="lastName"
            className="p-2"
          />
          <FormControl
            variant="button"
            title="Create Account"
            className="p-2"
          />
        </AppForm>
      </FormContainer>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  border-radius: 0.5rem;
  padding: 1rem;
  background: ${(props) => props.theme.colors.secondary};
`;

const FormContainer = styled.div`
  padding: 1.5rem;
  width: 100%;
`;
