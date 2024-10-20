"use server";
import { firebase } from "@/app/services/firebase/firebase";
import { PDFNet } from "@pdftron/pdfnet-node";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// We merge the signature on top of file here,
// this is throws locale error on the lambda / vercel
export const mergeAnnotations = async (docRef, xfdf) => {
  try {
    PDFNet.initialize(process.env.NEXT_PUBLIC_PDFNET_KEY);
    console.log(PDFNet);
    const storage = getStorage(firebase);
    const storageRef = ref(storage, docRef);

    const URL = await getDownloadURL(storageRef).then((url) => {
      console.info(url);
      // documentViewer.loadDocument(url);
      return url;
    });

    // const URL = await storageRef.child(docRef).getDownloadURL();

    const main = async () => {
      const doc = await PDFNet.PDFDoc.createFromURL(URL);
      await doc.initSecurityHandler();

      let i;
      for (i = 0; i < xfdf.length; i++) {
        console.log(xfdf[i]);
        let fdfDoc = await PDFNet.FDFDoc.createFromXFDF(xfdf[i]);
        await doc.fdfMerge(fdfDoc);
        await doc.flattenAnnotations();
      }

      const docbuf = await doc.saveMemoryBuffer(
        PDFNet.SDFDoc.SaveOptions.e_linearized
      );
      const blob = new Blob([docbuf], {
        type: "application/pdf",
      });

      await uploadBytes(storageRef, blob).then(function (snapshot) {
        console.log("Uploaded the blob");
      });
    };

    await PDFNet.runWithCleanup(main);
  } catch (error) {
    console.error(error);
  }
};
