"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Heading,
  TextField,
  Table,
  Text,
  Toast,
} from "gestalt";
import "gestalt/dist/gestalt.css";
import { Button } from "@mui/material";
import { addSignee, selectAssignees } from "./AssignSlice";
import { useRouter } from "next/navigation";

const Assign = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const assignees = useSelector(selectAssignees);
  const dispatch = useDispatch();
  const router = useRouter();

  const prepare = () => {
    if (assignees.length > 0) {
      router.push(`/PrepareDocument`);
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
    }
  };

  const addUser = (name, email) => {
    const key = `${new Date().getTime()}${email}`;
    if (name !== "" && email !== "") {
      dispatch(addSignee({ key, name, email }));
      setEmail("");
      setDisplayName("");
    }
  };

  return (
    <div>
      <Box padding={3}>
        <Container>
          <Box padding={3}>
            <Heading size="md">Who needs to sign?</Heading>
          </Box>
          <Box padding={2}>
            <TextField
              id="displayName"
              onChange={(event) => setDisplayName(event.value)}
              placeholder="Enter recipient's name"
              label="Name"
              value={displayName}
              type="text"
            />
          </Box>
          <Box padding={2}>
            <TextField
              id="email"
              onChange={(event) => setEmail(event.value)}
              placeholder="Enter recipient's email"
              label="Email"
              value={email}
              type="email"
            />
          </Box>
          <div className="p-2">
            {" "}
            <Button
              accessibilityLabel="add user to sign the document"
              text="add user"
              variant="contained"
              onClick={(event) => {
                addUser(displayName, email);
              }}
            >
              Add User
            </Button>
          </div>
          <Box padding={2}>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Text weight="bold">Name</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text weight="bold">Email</Text>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {assignees.map((user) => (
                  <Table.Row key={user.key}>
                    <Table.Cell>
                      <Text>{user.name}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text>{user.email}</Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Box>
          <Box padding={2}>
            <Button
              accessibilityLabel="add continue to prepare the document"
              variant="outlined"
              onClick={prepare}
              text="Continue"
            >
              Continue
            </Button>
          </Box>
          <Box
            fit
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: "50%",
                transform: "translateX(-50%)",
              },
            }}
            paddingX={1}
            position="fixed"
          >
            {showToast && (
              <Toast color="red" text={<>Please add at least one user</>} />
            )}
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Assign;
