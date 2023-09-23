const express = require('express');
const app = express();
const PORT = 3000;
//https://github.com/gitdagray/express_mvc/tree/main
//https://github.com/gitdagray/express_jwt
// import the router
const myRouter = require('./routes/router_file');




app.use('/ers', myRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})