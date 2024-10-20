'use client'
import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Column, Heading, Row, Stack, Button } from 'gestalt';
import { selectDocToView } from './ViewDocumentSlice';
import { storage } from '../../app/firebase/firebase';
import WebViewer from '@pdftron/webviewer';

import 'gestalt/dist/gestalt.css';
import './ViewDocument.css';
import { useRouter } from 'next/navigation';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const ViewDocument = () => {
  const router = useRouter();
  const [instance, setInstance] = useState(null);

  const doc = useSelector(selectDocToView);
  const { docRef } = doc;
  console.info(`document ref : ${docRef}`);
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        licenseKey: process.env.NEXT_PUBLIC_PDFNET_KEY,
        path: 'webviewer/lib',
        fullAPI: true,
        disabledElements: [
          'ribbons',
          'toggleNotesButton',
          'contextMenuPopup',
        ],
      },
      viewer.current,
    ).then(async instance => {
      // select only the view group
      instance.UI.setToolbarGroup('toolbarGroup-View');

      setInstance(instance);
      // load document
      const storage = getStorage();

      // const URL = await storageRef.child(docRef).getDownloadURL();

      await getDownloadURL(ref(storage, docRef))
        .then((url) => {
          console.info(url)
          instance.Core.documentViewer.loadDocument(url);
        });
      // load document 

    });
  }, [docRef]);

  const download = () => {
    instance.UI.downloadPdf(true);
  };

  const doneViewing = async () => {
    router.push('/');
  }

  return (
    <div className={'prepareDocument'}>
      <Box display="flex" direction="row" flex="grow">
        <Column span={2}>
          <Box padding={3}>
            <Heading size="md">View Document</Heading>
          </Box>
          <Box padding={3}>
            <Row gap={1}>
              <Stack>
                <Box padding={2}>
                  <Button
                    onClick={download}
                    accessibilityLabel="download signed document"
                    text="Download"
                    iconEnd="download"
                  />
                </Box>
                <Box padding={2}>
                  <Button
                    onClick={doneViewing}
                    accessibilityLabel="complete signing"
                    text="Done viewing"
                    iconEnd="check"
                  />
                </Box>
              </Stack>
            </Row>
          </Box>
        </Column>
        <Column span={10}>
          <div className="webviewer" ref={viewer}></div>
        </Column>
      </Box>
    </div>
  );
};

export default ViewDocument;
