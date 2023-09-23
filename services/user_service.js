const uuid = require('uuid');
const usersDao = require('../repository/ers_users_dao');
const jwtUtil = require('../utility/jwt_util');

const register = (req, res) => {
    let data = req.body;
    let user_id = uuid.v4();
    const info_user = ["username", "password"];
    let error_message = '';
    for (let i = 0; i < info_user.length; i++) {
        if (data[info_user[i]] == '' || !data[info_user[i]]) {
            error_message += " " + info_user[i];
        }
    }
    if (error_message != '') {
        res.statusCode = 400;
        res.send({
            message: "Request cannot be submitted missing details: " + error_message
        })
    } else {
        usersDao.retrieveUserByUername(data.username).then((resdata) => {
            if (resdata.Count == 0) {
                usersDao.addUser(user_id, data.username, data.password, data.first_name, data.last_name, 'employee').then((data) => {
                    res.statusCode = 200;
                    res.send({ message: "Registered Successfully" })

                })
                    .catch((err) => {
                        res.statusCode = 400;
                        res.send({
                            message: err
                        })
                    });
            } else {
                res.statusCode = 400;
                res.send({ message: "User Already Exist" })
            }
        })
    }
};


const login = (req, res) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    usersDao.retrieveUserByUername(username)
        .then((resdata) => {

            const userItem = resdata.Items[0];

            if (password === userItem.ers_password) {
                // successful login
                // create the jwt
                const token = jwtUtil.createJWT(userItem.ers_users_id, userItem.ers_username, userItem.user_role_type);

                res.send({
                    message: "Successfully Authenticated",
                    token: token
                })
            } else {
                res.statusCode = 400;
                res.send({
                    message: "Invalid Credentials"
                })
            }
        })
        .catch((err) => {
            console.error(err);
            res.send({
                message: "Failed to authenticate user"
            })
        });


};


module.exports = { login, register }