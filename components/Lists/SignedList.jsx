import React, { useEffect, useState } from "react";
import { Table, Text } from "gestalt";
import "gestalt/dist/gestalt.css";
import { useSelector, useDispatch } from "react-redux";
import { searchForDocumentsSigned } from "../../app/firebase/firebase";
import { selectUser } from "../../app/firebase/firebaseSlice";
import { setDocToView } from "../ViewDocument/ViewDocumentSlice";
import { useRouter } from "next/navigation";
import CircularIndeterminate from "../ui/CircularProgressIndicator";
import { Button } from "@mui/material";
const SignedList = () => {
  const user = useSelector(selectUser);
  const { email } = user;
  const [docs, setDocs] = useState([]);
  const [show, setShow] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchDocs() {
      const docsToView = await searchForDocumentsSigned(email);
      setDocs(docsToView);
      setShow(false);
    }
    setTimeout(fetchDocs, 1000);
  }, [email]);

  return (
    <div>
      {show ? (
        <div className=" h-screen flex items-center justify-center">
          {" "}
          <CircularIndeterminate show={show} accessibilityLabel="spinner" />
        </div>
      ) : (
        <div>
          {docs.length > 0 ? (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Text weight="bold">From</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text weight="bold">When</Text>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {docs.map((doc) => (
                  <Table.Row key={doc.docRef}>
                    <Table.Cell>
                      {doc.emails.map((email) => (
                        <Text key={email}>{email}</Text>
                      ))}
                    </Table.Cell>
                    <Table.Cell>
                      <Text>
                        {doc.signedTime
                          ? new Date(
                              doc.signedTime.seconds * 1000
                            ).toDateString()
                          : ""}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        variant="contained"
                        onClick={(event) => {
                          const { docRef, docId } = doc;
                          dispatch(setDocToView({ docRef, docId }));
                          router.push(`/ViewDocument`);
                        }}
                        accessibilityLabel="Sign out of your account"
                        text="Sign out"
                      >
                        Open
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p className=" text-gray-900">
              You do not have any documents to review
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SignedList;
