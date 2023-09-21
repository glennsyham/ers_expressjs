const usersDao = require('./DAO/ers_users_dao');
const reimbDao = require('./DAO/ers_reimbursement_dao');
const uuid = require('uuid');

//usersDao.addUser(uuid.v4(), 'ers_username', 'ers_password', 'user_first_name', 'user_last_name', 'employee');
//usersDao.addUser(uuid.v4(), 'admin', 'pass', 'cat', 'dog', 'manager');
//usersDao.updateUserById('e0426bcd-a561-4f37-9b32-0c9eebae49c7', 'password', 'donald', 'duck');

// usersDao.retrieveUserById('e0426bcd-a561-4f37-9b32-0c9eebae49c7')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(data);
//     });

// usersDao.deleteUserById('e0426bcd-a561-4f37-9b32-0c9eebae49c7');

//reimbDao.addTicket(uuid.v4(), 155.10, 'vacation', 'e0426bcd-a561-4f37-9b32-0c9eebae49c7', '', 'lodging');
// let timestamp = 1695262551;
// console.log(new Date(timestamp * 1000));


//reimbDao.updateTicketById('2fdfd4f8-8155-4664-817f-b278dac0edf0', 320.50, 'business vacation', 'travel');

//reimbDao.updateTicketStatusById('2fdfd4f8-8155-4664-817f-b278dac0edf0', 'approved', 'b3c39f94-59ca-44c2-97ce-7fb417c53037');

//reimbDao.deleteTicketById('2fdfd4f8-8155-4664-817f-b278dac0edf0');