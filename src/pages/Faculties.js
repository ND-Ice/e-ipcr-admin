import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Badge, Modal } from "react-bootstrap";

import { Filter, MyLoader, TableData } from "../components";
import { UserPreview } from "../components/Modals";
import {
  facultyReceived,
  facultyRequested,
  facultyRequestFailed,
  facultySorted,
  getFaculties,
} from "../store/faculties";

import colleges from "../utils/filter";
import facultiesApi from "../api/faculties";

export default function Faculties({ history }) {
  const dispatch = useDispatch();
  const faculties = useSelector(getFaculties);
  const [showFacultyPreview, setShowFacultyPreview] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState({});

  useEffect(() => {
    const getFaculties = async () => {
      try {
        dispatch(facultyRequested());
        const facultyList = await facultiesApi.getFaculties();
        return dispatch(facultyReceived(facultyList.data));
      } catch (error) {
        return dispatch(facultyRequestFailed(error));
      }
    };

    getFaculties();
  }, []);

  const approvedFaculties = faculties?.list?.filter(
    (faculty) => faculty?.isActivated
  );

  const facultiesRequests = faculties?.list?.filter(
    (faculty) => !faculty?.isActivated
  );

  const filtered =
    faculties?.sortBy && faculties?.sortBy?.id
      ? approvedFaculties?.filter(
          (faculty) => faculty?.college === faculties?.sortBy?.value
        )
      : approvedFaculties;

  const handleItemSelect = (item) => dispatch(facultySorted(item));
  return (
    <>
      <Appcontainer>
        <AppHeader>
          <h5 className="m-0 fw-bold">FACULTIES</h5>
        </AppHeader>

        <div className="d-flex align-items-center justify-content-between">
          <Filter
            items={colleges}
            onSelectItem={handleItemSelect}
            selectedItem={faculties?.sortBy}
          />

          <Button
            variant="outline-primary"
            onClick={() => history.push("/dashboard/faculty-requests")}
          >
            Requests{"  "}
            {facultiesRequests?.length !== 0 && (
              <Badge bg="danger" variant="pill">
                {facultiesRequests?.length}
              </Badge>
            )}
          </Button>
        </div>

        {faculties?.loading ? (
          <MyLoader />
        ) : (
          <Table borderless className="mt-2 w-100">
            <TableHead>
              <TableHeader>Profile</TableHeader>
              <TableHeader>Email Address</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Position</TableHeader>
              <TableHeader>College</TableHeader>
            </TableHead>
            <tbody>
              {filtered?.map((faculty) => (
                <TableData
                  key={faculty?._id}
                  userInfo={faculty}
                  onPreview={() => {
                    setShowFacultyPreview(true);
                    return setSelectedFaculty(faculty);
                  }}
                />
              ))}
            </tbody>
          </Table>
        )}
      </Appcontainer>
      <Modal
        show={showFacultyPreview}
        onHide={() => setShowFacultyPreview(false)}
      >
        <UserPreview user={selectedFaculty} open={setShowFacultyPreview} />
      </Modal>
    </>
  );
}

const Appcontainer = styled.div`
  padding: 0 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  height: 610px;
  overflow: auto;
`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
`;

const TableHead = styled.thead`
  text-transform: uppercase;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const TableHeader = styled.th`
  padding: 1rem;
  font-weight: 500;
`;
