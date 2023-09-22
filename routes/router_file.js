const express = require('express');
const router = express.Router();
const reimbDao = require('../repository/ers_reimbursement_dao');
const usersDao = require('../repository/ers_users_dao');
const jwtUtil = require('../utility/jwt_util');
const bodyParser = require('body-parser');

const uuid = require('uuid');
const url = require('node:url');
const { createLogger, transports, format } = require('winston');
// create the logger
const logger = createLogger({
    level: 'info', // this will log only messages with the level 'info' and above
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // log to the console
        new transports.File({ filename: 'info.log', level: 'info' }),
        new transports.File({ filename: 'error.log', level: 'error' }),
    ]
})

//router.use(bodyParser.json());
router.use(bodyParser.json());


router.get('/', (req, res) => {
    console.log("workig");

});

router.get('/:id', (req, res) => {
    const { id } = req.params;


});

let log_data;
router.post('/register', (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        const data = JSON.parse(body);
        let user_id = uuid.v4();
        log_data = data;
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
    });
});

router.post('/login', (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        const data = JSON.parse(body);
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
    });


});

/*
  id: '09d86f22-1410-4c42-a4fc-526f2838e6c2',
  username: 'mike',
  role: 'employee',

*/

router.post('/ticket', (req, res) => {
    let body = '';
    let gtd = getTokenDetails(req, res);
    req.on('data', (chunk) => {
        body += chunk;

    });
    req.on('end', () => {
        if (body == '') {
            res.statusCode = 400;
            res.send({
                message: "Request cannot be submitted missing details"
            })
        } else {
            const data = JSON.parse(body);
            const info_ticket = ["amount", "description", "type"];
            let error_message = '';
            for (let i = 0; i < info_ticket.length; i++) {
                if (data[info_ticket[i]] == '' || !data[info_ticket[i]]) {
                    error_message += " " + info_ticket[i];
                }
            }
            if (error_message != '') {
                res.statusCode = 400;
                res.send({
                    message: "Request cannot be submitted missing details: " + error_message
                })
            } else {
                const getToken = async () => {
                    const token_data = await gtd;
                    reimbDao.addTicket(uuid.v4(), data.amount, data.description, token_data.id, '', data.type).then((resdata) => {
                        res.statusCode = 200;
                        res.send({ message: "Ticket Added Successfully" })

                    })
                        .catch((err) => {
                            res.statusCode = 400;
                            res.send({
                                message: err
                            })
                        });
                };
                getToken();
            }
        }
    });
});


router.put('/ticket', (req, res) => {


    console.log(req.body);

    res.statusCode = 200;
    res.send({ message: "Ticket Added Successfully" })
    // let gtd = getTokenDetails(req, res);
    // req.on('data', (chunk) => {
    //     body += chunk;

    // });
    // req.on('end', () => {
    //     if (body == '') {
    //         res.statusCode = 400;
    //         res.send({
    //             message: "Request cannot be submitted missing details"
    //         })
    //     } else {
    //         const data = JSON.parse(body);
    //         const info_ticket = ["amount", "description", "type"];
    //         let error_message = '';
    //         for (let i = 0; i < info_ticket.length; i++) {
    //             if (data[info_ticket[i]] == '' || !data[info_ticket[i]]) {
    //                 error_message += " " + info_ticket[i];
    //             }
    //         }
    //         if (error_message != '') {
    //             res.statusCode = 400;
    //             res.send({
    //                 message: "Request cannot be submitted missing details: " + error_message
    //             })
    //         } else {
    //             const getToken = async () => {
    //                 const token_data = await gtd;
    //                 reimbDao.addTicket(uuid.v4(), data.amount, data.description, token_data.id, '', data.type).then((resdata) => {
    //                     res.statusCode = 200;
    //                     res.send({ message: "Ticket Added Successfully" })

    //                 })
    //                     .catch((err) => {
    //                         res.statusCode = 400;
    //                         res.send({
    //                             message: err
    //                         })
    //                     });
    //             };
    //             getToken();
    //         }
    //     }
    // });
});

function getTokenDetails(req, res) {
    const token = req.headers.authorization.split(' ')[1]; // ['Bearer', '<token>'];
    const token_data = jwtUtil.verifyTokenAndReturnPayload(token)
        .then((payload) => {
            return payload;
        })
        .catch((err) => {
            console.error(err);

        })
        ;

    return token_data;
}
module.exports = router;