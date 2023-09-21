# Project-1: Employee Reimbursment System (ERS)

## Executive Summary
* The Expense Reimbursement System (ERS) will manage the process of reimbursing employees for expenses incurred while on company time. 
* All employees in the company can login and submit requests for reimbursement and view their past tickets and pending requests. 
* Finance managers can log in and view all reimbursement requests and past history for all employees in the company. 
* Finance managers are authorized to approve and deny requests for expense reimbursement.


#### Login/Register Feature
As an Employee or Manager, I should be able to log into the application.

Ability to register a new account

-Must ensure the username is not already registered
-Default employee role
-Should register with at least a username and password

#### Submit Ticket Feature
Employees can submit a new reimbursement ticket
-Must have an amount
-Must have a description
-Should have a default status of Pending

#### Ticketing System Feature
Managers can process tickets submitted by employees

-Tickets can be Approved or Denied
-Tickets cannot change status after processing

Pending tickets should be added to a queue or list that managers can see

Tickets should be removed from the list, or queue, once processed (approved/denied) by a manager

#### View Previous Tickets Feature
As an Employee, I should be able to view all previous reimbursement ticket submissions.

Previous tickets should also show the details of submission.

#### Reimbursement Types Feature
Employees can add Reimbursement Types

-Travel, Lodging, Food, Other
-Employees can view previous requests filtered by type

 #### Change Roles Feature
Managers can change other users’ roles
-Employee to Manager or back to Employee

#### Upload Receipts Feature
Employees can add images of receipts to their reimbursement requests
-Upload and store images (in SQL or cloud storage)

#### User Accounts Feature
User Profile/Account

-Track additional user information (name, address, etc.)
-Users can edit their account
-Users can add a profile picture
**State-chart Diagram (Reimbursement Statuses)** 
![](./imgs/state-chart.jpg)

**Use Case Diagram**
![](./imgs/use-case.jpg)

**Activity Diagram**
![](./imgs/activity.jpg)