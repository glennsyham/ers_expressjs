const usersDao = require('./DAO/ers_users_dao');
const uuid = require('uuid');

//usersDao.addUser(uuid.v4(), 'ers_username', 'ers_password', 'user_first_name', 'user_last_name', 'employee');

//usersDao.updateUserById('e0426bcd-a561-4f37-9b32-0c9eebae49c7', 'password', 'donald', 'duck');

// usersDao.retrieveUserById('e0426bcd-a561-4f37-9b32-0c9eebae49c7')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(data);
//     });

// usersDao.deleteUserById('e0426bcd-a561-4f37-9b32-0c9eebae49c7');