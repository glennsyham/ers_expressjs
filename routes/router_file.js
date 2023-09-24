const express = require('express');
const router = express.Router();
const userService = require('../services/user_service');
const ticketService = require('../services/ticket_service');
const authGaurd = require('../middleware/auth_gaurd');
const bodyParser = require('body-parser');


router.use(bodyParser.json());

router.post('/register', userService.register);

router.post('/login', userService.login);

router.use(authGaurd.authenticateJWT);

router.post('/tickets', ticketService.create_ticket);

router.put('/tickets/:id', ticketService.update_status_ticket_manager);

router.get('/tickets', ticketService.list_ticket);

router.get('/test', (req, res) => {
    res.statusCode = 200;
    res.send({
        message: "test"
    })
});


module.exports = router;