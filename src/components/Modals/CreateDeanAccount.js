import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { AppForm, FormControl } from "../forms";

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

const menuItems = [
  {
    title: "CAS",
    value: "CAS",
  },
];

export default function CreateDeanAccount() {
  const handleSubmit = (values) => console.log(values);

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
        />
        <NameContainer>
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
        </NameContainer>
        <FormControl
          variant="select"
          title="Department"
          name="dept"
          className="p-2"
          menuItems={menuItems}
        />
        <FormControl variant="button" title="Create Account" className="p-2" />
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
