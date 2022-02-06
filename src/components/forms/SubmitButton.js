import { Button, Spinner } from "react-bootstrap";
import { useFormikContext } from "formik";

export default function SubmitButton(props) {
  const { title, loading, ...otherProps } = props;
  const { handleSubmit } = useFormikContext();

  return (
    <Button disabled={loading} onClick={handleSubmit} {...otherProps}>
      {loading && (
        <Spinner
          animation="border"
          size="sm"
          variant="light"
          className="me-2"
        />
      )}
      {title}
    </Button>
  );
}
