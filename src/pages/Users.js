import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { Filter, IconButton, MyLoader, TableData } from "../components";
import { deansReceived, deansSorted, getDeans } from "../store/deans";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { UserPreview } from "../components/Modals";

import deansApi from "../api/deans";
import UserData from "../components/UserData";

const listItem = [
  { value: "ALL" },
  { id: 1, value: "CHAIRPERSON" },
  { id: 2, value: "INTERMEDIATE SUPERVISOR" },
  { id: 3, value: "DIRECTOR" },
  { id: 4, value: "PMT" },
  { id: 5, value: "HEAD" },
];

export default function Users({ history }) {
  const dispatch = useDispatch();
  const deans = useSelector(getDeans);
  const [showUserPreview, setShowUserPreview] = useState(false);
  const [selectedUser, setSelecteduser] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await deansApi.getDeans();
        return dispatch(deansReceived(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const usersRequests = deans?.list?.filter((user) => !user?.isActivated);

  const approvedUser = deans?.list?.filter((user) => user?.isActivated);

  const filtered =
    deans.sortBy && deans.sortBy.id
      ? approvedUser?.filter((user) => user?.position === deans?.sortBy?.value)
      : approvedUser;

  const handleSelectItem = (item) => dispatch(deansSorted(item));

  return (
    <>
      <Appcontainer>
        <AppHeader>
          <h5 className="m-0 fw-bold text-uppercase">USERS</h5>
        </AppHeader>

        <div className="d-flex align-items-center justify-content-between">
          <Filter
            items={listItem}
            onSelectItem={handleSelectItem}
            selectedItem={deans?.sortBy}
          />
          <Button
            variant="outline-primary"
            onClick={() => history.push("/dashboard/users-requests")}
          >
            Requests{" "}
            {usersRequests?.length !== 0 && (
              <Badge variant="pill" bg="danger">
                {usersRequests?.length}
              </Badge>
            )}
          </Button>
        </div>

        {deans?.loading ? (
          <MyLoader />
        ) : (
          <Table borderless className="w-100">
            <TableHead>
              <TableHeader>Profile</TableHeader>
              <TableHeader>Email Address</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Position</TableHeader>
              <TableHeader>College</TableHeader>
            </TableHead>
            <tbody>
              {filtered?.map((user) => (
                <TableData
                  key={user?._id}
                  userInfo={user}
                  onPreview={() => {
                    setShowUserPreview(true);
                    return setSelecteduser(user);
                  }}
                />
              ))}
            </tbody>
          </Table>
        )}
      </Appcontainer>
      <Modal show={showUserPreview} onHide={() => setShowUserPreview(false)}>
        <UserPreview user={selectedUser} />
      </Modal>
    </>
  );
}

const Appcontainer = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
`;

const TableHead = styled.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const TableHeader = styled.th`
  padding: 1rem;
  font-weight: 500;
  text-transform: uppercase;
`;
