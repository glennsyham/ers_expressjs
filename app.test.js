const usersDao = require('./repository/ers_users_dao');
const reimbDao = require('./repository/ers_reimbursement_dao');
const uuid = require('uuid');

//usersDao.addUser(uuid.v4(), 'changeuser', 'password', 'test', 'user', 'employee');
//usersDao.addUser(uuid.v4(), 'admin', 'pass', 'cat', 'dog', 'manager');
//usersDao.updateUserById('e0426bcd-a561-4f37-9b32-0c9eebae49c7', 'password', 'donald', 'duck');
//usersDao.updateUserRoleTypeById('ae565c79-12cf-4b55-af6b-816e89dc5fba', 'manager');



// usersDao.retrieveUserById('e0426bcd-a561-4f37-9b32-0c9eebae49c7')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(data);
//     });

// usersDao.retrieveUserByUername('changeuser')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(data);
//     });

// usersDao.deleteUserById('e0426bcd-a561-4f37-9b32-0c9eebae49c7');

// reimbDao.addTicket(uuid.v4(), 255.10, 'miami', 'e0426bcd-a561-4f37-9b32-0c9eebae49c7', '', 'travel');
// reimbDao.addTicket(uuid.v4(), 355.10, 'hotel', 'e0426bcd-a561-4f37-9b32-0c9eebae49c7', '', 'lodging');
// reimbDao.addTicket(uuid.v4(), 6455.10, 'restaurant', 'e0426bcd-a561-4f37-9b32-0c9eebae49c7', '', 'food');
// reimbDao.addTicket(uuid.v4(), 355.10, 'meeting', 'e0426bcd-a561-4f37-9b32-0c9eebae49c7', '', 'other');
// let timestamp = 1695262551;
// console.log(new Date(timestamp * 1000));


//reimbDao.updateTicketById('2fdfd4f8-8155-4664-817f-b278dac0edf0', 320.50, 'business vacation', 'travel');

//reimbDao.updateTicketStatusById('2fdfd4f8-8155-4664-817f-b278dac0edf0', 'approved', 'b3c39f94-59ca-44c2-97ce-7fb417c53037');

//reimbDao.deleteTicketById('2fdfd4f8-8155-4664-817f-b278dac0edf0');

// reimbDao.retrieveTicketById('aa0ac539-0b93-481f-9d67-2bd1ace9dfd6')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(data);
//     });

// reimbDao.retrieveTicketByAuthor('e0426bcd-a561-4f37-9b32-0c9eebae49c7xx')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(data);
//     });

reimbDao.retrieveTicketAuthorStatus("09d86f22-1410-4c42-a4fc-526f2838e6c2", "pending")
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(data);
    })