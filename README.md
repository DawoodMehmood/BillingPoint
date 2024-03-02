# BillingPoint

This is a platform to see your bill details from different vendors including pepco, washgas and wssc. 
I made this project for a client who wanted a system for the users to basically manage their bills and pay them accordingly.
I have managed admin and user roles efficiently, restricting user authorization to different parts of the system so that only the relevant logged in user can perform his/her own actions.

I have made its frontend in Reactjs and backend on Nodejs, with MSSQL as the database which was provided by the client.

You can run it by simply cloning the repo and installing dependencies for both frontend and backend using the command:

    npm install

And before running the project, you need to setup the environment file `.env` with the required credentials. Example `.env` is also present for your reference.

You can run the backend for deployment using the command:

  `npm run dev`

And for production, you can use:

  `npm start`

Frontend server can be run using the command:

  `nom start`
