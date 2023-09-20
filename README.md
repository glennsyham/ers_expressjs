# ers_expressjs
Login/Register Feature
As an Employee or Manager, I should be able to log into the application.

Ability to register a new account

-Must ensure the username is not already registered
-Default employee role
-Should register with at least a username and password

Employees can submit a new reimbursement ticket

Must have an amount

Must have a description

Should have a default status of Pending

Managers can process tickets submitted by employees

-Tickets can be Approved or Denied
-Tickets cannot change status after processing

Pending tickets should be added to a queue or list that managers can see

Tickets should be removed from the list, or queue, once processed (approved/denied) by a manager

As an Employee, I should be able to view all previous reimbursement ticket submissions.

Previous tickets should also show the details of submission.

npm install winston
npm install aws-sdk
npm install body-parser
npm install express
npm install uuid