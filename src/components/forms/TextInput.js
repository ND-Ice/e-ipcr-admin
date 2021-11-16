import { Form } from "react-bootstrap";
import { useFormikContext } from "formik";

export default function TextInput(props) {
  const { title, name, ...otherProps } = props;
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();

  return (
    <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type="text"
        placeholder={title}
        name={name}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        isValid={touched[name] && !errors[name]}
        isInvalid={!touched[name] || !errors[name] ? false : true}
        {...otherProps}
      />
      <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
