This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://docusign-clone.vercel.app](http://docusign-clone.vercel.app) with your browser to see the project.
serverless functions & cors policies might cause issues with the deployment, please try to run locally if possible.

This project uses firebase services for authentication, docuement storage, as well as storage bucket to store PDF files.
For email functionalities, the project uses nodemailer. It needs an app password to work, please refer to example.env

Libraries used are

- PDFTron for PDF viewving & editing
- gestalt & Material UI for UI components
- firebase sdk

Features

- Authentication with google
- prepare document
- add users to sign
- view pending document signing requests

Email alerts for

- user is requested to sign
- update for every user who signs
- when a document is signed by all users/invitees
