'use server'
import { PDFNet } from '@pdftron/pdfnet-node';
import { storage } from '../../app/firebase/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


export const mergeAnnotations = async (docRef, xfdf) => {

  try {
    
    // const Core = window.Core;
    // Core.setWorkerPath('webviewer/lib/core');
    PDFNet.initialize('demo:1729242579433:7e1e7d6e0300000000c0137aa39fab9df3e0a551e4c2572d4eed7df75c')
    console.log(PDFNet);
    const storage = getStorage();
    const storageRef = ref(storage, docRef)

    const URL = await getDownloadURL(storageRef)
      .then((url) => {
        console.info(url)
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
        PDFNet.SDFDoc.SaveOptions.e_linearized,
      );
      const blob = new Blob([docbuf], {
        type: 'application/pdf',
      });

      await uploadBytes(storageRef, blob).then(function (snapshot) {
        console.log('Uploaded the blob');
      });
    }

    await PDFNet.runWithCleanup(main);
  } catch (error) {
    console.error(error);
  }
};
