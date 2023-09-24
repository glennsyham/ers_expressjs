const uuid = require('uuid');
const reimbDao = require('../repository/ers_reimbursement_dao');
const jwtUtil = require('../utility/jwt_util');
const url = require('node:url');


const create_ticket = (req, res) => {
    let data = req.body;
    const user = req.user;
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
        const ticket_id = uuid.v4();
        reimbDao.addTicket(ticket_id, user.amount, user.description, user.id, '', user.type).then((resdata) => {
            res.statusCode = 200;
            res.send({ message: "Ticket Added Successfully", ticket_id: ticket_id })

        })
            .catch((err) => {
                res.statusCode = 400;
                res.send({
                    message: err
                })
            });
    }
};

const update_status_ticket_manager = (req, res) => {
    let data = req.body;
    const { id } = req.params;
    const user = req.user;

    if (user.role == 'manager' && id != '' && id) {
        reimbDao.retrieveTicketById(id)
            .then((retrieve_data) => {
                let current_ticket = retrieve_data.Item;
                if (current_ticket.reimb_status == 'pending') {
                    reimbDao.updateTicketStatusById(id, data.status, user.id).then((resdata) => {
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


const list_ticket = (req, res) => {
    const requestUrl = url.parse(req.url).query;
    const req_params = new URLSearchParams(requestUrl);
    const status = req_params.get('status');

    const user = req.user;
    if (user.role == 'manager') {
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
        reimbDao.retrieveTicketByAuthor(user.id)
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

module.exports = {
    create_ticket,
    update_status_ticket_manager,
    list_ticket
};