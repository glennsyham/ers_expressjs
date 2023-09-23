const express = require('express');
const router = express.Router();
const UserService = require('../services/user_service');
const TicketService = require('../services/ticket_service');
const jwtUtil = require('../utility/jwt_util');
const bodyParser = require('body-parser');


router.use(bodyParser.json());

router.post('/register', UserService.register);

router.post('/login', UserService.login);

router.post('/tickets', TicketService.create_ticket);

router.put('/tickets/:id', TicketService.update_status_ticket_manager);

router.get('/tickets', TicketService.list_ticket);



module.exports = router;