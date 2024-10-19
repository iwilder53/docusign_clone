"use client"

import React from 'react'
import { PDFDocument } from 'pdf-lib'

async function createPdf() {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([350, 400]);
    page.moveTo(110, 200);
    page.drawText('Hello World!');
    await pdfDoc.saveAsBase64({ dataUri: true }).then((e) => { return e });

}

const viewer = () => {
    return (
        <div>    <iframe id="pdf" className=' w-full h-full' ref={createPdf} >  </iframe>
        </div>
    )
}

export default viewer