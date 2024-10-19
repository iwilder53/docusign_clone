This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the project. Vercel link is not working due to an issue with CORS policy on google storage.
Please use Sign In With Google to start, login form is broken as of now.

This project uses firebase services for authentication, docuement storage, as well as storage bucket to store PDF files.

Libraries used are 
  - PDFTron for PDF viewving & editing
  - gestalt for UI components
  - firebase sdk

whats working 
  - Authentication with google only (Form fields for signing up not working yet)
  - prepare document
  - add users to sign
  - view pending document signing requests

Email alerts for 
  - user is requested to sign
  - update for every user who signs
  - when a document is signed by all users/invitees


