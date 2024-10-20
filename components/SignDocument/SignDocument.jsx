"use client";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";

import { Column, Heading, Row, Stack } from "gestalt";
import { selectDocToSign } from "./SignDocumentSlice";
import { updateDocumentToSign } from "../../app/services/firebase/firebase";
import { selectUser } from "../../app/services/firebase/firebaseSlice";
import WebViewer from "@pdftron/webviewer";
import "gestalt/dist/gestalt.css";
import "./SignDocument.css";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import CircularIndeterminate from "../ui/CircularProgressIndicator";

const SignDocument = () => {
  const [annotationManager, setAnnotationManager] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [annotPosition, setAnnotPosition] = useState(0);
  const router = useRouter();
  const doc = useSelector(selectDocToSign);
  const user = useSelector(selectUser);
  const { docRef, docId } = doc ?? "";
  const { email } = user;
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: "webviewer/lib",
        fullAPI: true,
        licenseKey: process.env.NEXT_PUBLIC_PDFNET_KEY,
      },
      viewer.current
    ).then(async (instance) => {
      instance.Core.PDFNet.initialize();
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      setAnnotationManager(annotationManager);

      // select only the insert group
      instance.UI.setToolbarGroup("toolbarGroup-Insert");

      // load document
      const storage = getStorage();

      // const URL = await storageRef.child(docRef).getDownloadURL();

      await getDownloadURL(ref(storage, docRef)).then((url) => {
        console.info(url);
        documentViewer.loadDocument(url);
      });

      const normalStyles = (widget) => {
        if (widget instanceof Annotations.TextWidgetAnnotation) {
          return {
            "background-color": "#a5c7ff",
            color: "white",
          };
        } else if (widget instanceof Annotations.SignatureWidgetAnnotation) {
          return {
            border: "1px solid #a5c7ff",
          };
        }
      };

      annotationManager.addEventListener(
        "annotationChanged",
        (annotations, action, { imported }) => {
          if (imported && action === "add") {
            annotations.forEach(function (annot) {
              if (annot instanceof Annotations.WidgetAnnotation) {
                Annotations.WidgetAnnotation.getCustomStyles = normalStyles;
                if (!annot.fieldName.startsWith(email)) {
                  annot.Hidden = true;
                  annot.Listable = false;
                }
              }
            });
          }
        }
      );
    });
  }, [docRef, email]);

  const nextField = () => {
    let annots = annotationManager.getAnnotationsList();
    if (annots[annotPosition]) {
      annotationManager.jumpToAnnotation(annots[annotPosition]);
      if (annots[annotPosition + 1]) {
        setAnnotPosition(annotPosition + 1);
      }
    }
  };

  const prevField = () => {
    let annots = annotationManager.getAnnotationsList();
    if (annots[annotPosition]) {
      annotationManager.jumpToAnnotation(annots[annotPosition]);
      if (annots[annotPosition - 1]) {
        setAnnotPosition(annotPosition - 1);
      }
    }
  };

  const completeSigning = async () => {
    setIsUploading(true);
    const xfdf = await annotationManager.exportAnnotations();
    await updateDocumentToSign(docId, email, xfdf);
    router.replace("/");
  };

  return isUploading ? (
    <div className=" h-screen flex items-center justify-center">
      <CircularIndeterminate />
    </div>
  ) : (
    <div className={"prepareDocument"}>
      <Box display="flex" direction="row" flex="grow">
        <Column span={2}>
          <Box padding={3}>
            <Heading size="md">Sign Document</Heading>
          </Box>
          <Box padding={3}>
            <Row gap={1}>
              <Stack>
                <Box padding={2}>
                  <Button
                    onClick={nextField}
                    accessibilityLabel="next field"
                    text="Next field"
                    variant="outlined"
                  >
                    Next Field
                  </Button>
                </Box>
                <Box padding={2}>
                  <Button
                    onClick={prevField}
                    accessibilityLabel="Previous field"
                    text="Previous field"
                    variant="outlined"
                  >
                    Previous Field
                  </Button>
                </Box>
                <Box padding={2}>
                  <Button
                    onClick={completeSigning}
                    accessibilityLabel="complete signing"
                    text="Complete signing"
                    variant="contained"
                  >
                    Finish
                  </Button>
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

export default SignDocument;
