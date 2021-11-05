import { Card } from "react-bootstrap";
import { Divider, Icons } from ".";

export default function InformationItem(props) {
  const { children, icon } = props;
  return (
    <>
      <Card.Text>
        {icon && (
          <Icons
            size={40}
            icon={icon}
            backgroundColor="#fafafa"
            iconColor="#212529"
          />
        )}
        <span className="mt-2 d-inline-flex">{children}</span>
      </Card.Text>
      <Divider bg="#fafafa" />
    </>
  );
}
