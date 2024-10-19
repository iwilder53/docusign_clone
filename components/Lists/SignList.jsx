import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchForDocumentToSign } from '../../app/firebase/firebase';
import { selectUser } from '../../app/firebase/firebaseSlice';
import { setDocToSign } from '../SignDocument/SignDocumentSlice';
import { useRouter } from 'next/navigation';
import CircularIndeterminate from '../ui/CircularProgressIndicator';
import Visibility from '@mui/icons-material/Visibility';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid,GridActionsCellItem } from '@mui/x-data-grid';

const SignList = () => {
  const user = useSelector(selectUser);

  const { email } = user;

  const router = useRouter()

  const [docs, setDocs] = useState([]);
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  function getRowId(row) {
    return row.docRef;
  }
  const handleEvent = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {

    const { docRef, docId } = params.row;
    dispatch(setDocToSign({ docRef, docId }));
    router.push(`/SignDocument`);
  };
  const columns = [
    {
      field: 'displayName',
      headerName: 'From',
      width: 200,
      editable: false,
      valueGetter: (value, row) => row.email.split("@")[0]
    },
    {
      field: 'email',
      headerName: 'Email ID',
      width: 200,
      editable: false,
    },
    {
      field: 'requestedTime',
      headerName: 'Date',
      type: 'date',
      width: 200,
      valueGetter: (value,row) => new Date(row.requestedTime.toDate())
    },
    {
      type: 'string',
      width: 200,
      valueGetter: (value,row) => "Sign"
    },
   /*  {
      field: 'action',
      type: 'actions',
      headerName:'View',
      getActions: (params) => [
        <GridActionsCellItem
        icon={<Visibility/>}
          label="Dup"
          onClick={handleEvent(params)}
        
        
      />,

        ]
    } */
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
        <CircularIndeterminate show={show} accessibilityLabel="spinner" />
      ) : (
        <div>
          <Box sx={{ height: '100%', width: '100%' }}>
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
          </Box> </div>)}
    </div>
  );
};

export default SignList;
