import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchForDocumentToSign } from "../../app/services/firebase/firebase";
import { selectUser } from "../../app/services/firebase/firebaseSlice";
import { setDocToSign } from "../SignDocument/SignDocumentSlice";
import { useRouter } from "next/navigation";
import CircularIndeterminate from "../ui/CircularProgressIndicator";
import Visibility from "@mui/icons-material/Visibility";

import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

const SignList = () => {
  const user = useSelector(selectUser);

  const { email } = user;

  const router = useRouter();

  const [docs, setDocs] = useState([]);
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  function getRowId(row) {
    return row.docRef;
  }
  const handleEvent = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    const { docRef, docId } = params.row;
    dispatch(setDocToSign({ docRef, docId }));
    router.push(`/SignDocument`);
  };
  const columns = [
    {
      field: "displayName",
      headerName: "From",
      width: 250,
      editable: false,
      valueGetter: (value, row) => row.email.split("@")[0],
    },
    {
      field: "email",
      headerName: "Email ID",
      width: 300,
      editable: false,
    },
    {
      field: "requestedTime",
      headerName: "Date",
      type: "date",
      width: 120,
      valueGetter: (value, row) => new Date(row.requestedTime.toDate()),
    },
    {
      field: "action",
      type: "actions",
      headerName: "View",
      width: 60,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row.requestedTime}
          icon={<Visibility />}
          label="Dup"
          onClick={(e) => {
            e.preventDefault();
            const { docRef, docId } = params.row;
            dispatch(setDocToSign({ docRef, docId }));
            router.push(`/SignDocument`);
          }}
        />,
      ],
    },
  ];

  useEffect(() => {
    async function getDocs() {
      const docsToSign = await searchForDocumentToSign(email);
      setDocs(docsToSign);
      setShow(false);
    }

    setTimeout(getDocs, 1000);
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
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={docs}
              getRowId={getRowId}
              columns={columns}
              onRowClick={handleEvent}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>{" "}
        </div>
      )}
    </div>
  );
};

export default SignList;
