const uuid = require('uuid');
const reimbDao = require('../repository/ers_reimbursement_dao');
const jwtUtil = require('../utility/jwt_util');
const url = require('node:url');


const create_ticket = (req, res) => {
    let data = req.body;
    let gtd = getTokenDetails(req, res);
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
};

const update_status_ticket_manager = (req, res) => {
    let data = req.body;
    let gtd = getTokenDetails(req, res);
    const getToken = async () => {
        const token_data = await gtd;
        if (token_data.role == 'manager' && data.id != '' && data.id) {
            reimbDao.retrieveTicketById(data.id)
                .then((retrieve_data) => {
                    let current_ticket = retrieve_data.Item;
                    if (current_ticket.reimb_status == 'pending') {
                        reimbDao.updateTicketStatusById(data.id, data.status, token_data.id).then((resdata) => {
                            res.statusCode = 200;
                            res.send({ message: "Ticket Updated Successfully" })

                        })
                            .catch((err) => {
                                res.statusCode = 400;
                                res.send({
                                    message: err
                                })
                            });
                    } else {
                        res.statusCode = 400;
                        res.send({
                            message: "Ticket is not pending cannot be changed"
                        })
                    }



                })
                .catch((err) => {
                    res.statusCode = 500;
                    res.send({
                        message: err
                    })
                });




        } else {
            res.statusCode = 400;
            res.send({
                message: "Employees do not have permission"
            })
        }
    };
    getToken();

};


const list_ticket = (req, res) => {
    const requestUrl = url.parse(req.url).query;
    const req_params = new URLSearchParams(requestUrl);
    const status = req_params.get('status');
    let gtd = getTokenDetails(req, res);

    const getToken = async () => {
        const token_data = await gtd;
        if (token_data.role == 'manager') {
            reimbDao.retrieveTicketByStatus(status)
                .then((data) => {
                    res.statusCode = 200;
                    res.send(data.Items)
                })
                .catch((err) => {
                    res.statusCode = 500;
                    res.send({
                        message: err
                    })
                });
        } else {
            reimbDao.retrieveTicketByAuthor(token_data.id)
                .then((data) => {
                    res.statusCode = 200;
                    res.send(data.Items)
                })
                .catch((err) => {
                    res.statusCode = 500;
                    res.send({
                        message: err
                    })
                });
        }
    };
    getToken();

};
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
module.exports = {
    create_ticket,
    update_status_ticket_manager,
    list_ticket
};