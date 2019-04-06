//region INITIALIZATION
const express = require('express');
const bodyParser = require('body-parser');
const errors = require("./assets/json/error_messages.json");
const app = express();
const bearerToken = require('express-bearer-token');
const request = require("request");

app.use('/assets', express.static('assets'));
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(bearerToken());

//endregion

//region PAGE RENDER GET REQUESTS

app.get("/", function(req, res){
    res.render("index.ejs")
});

app.get("/board", function(req, res){
    res.render("board.ejs")
});

app.get("/dispos", function(req, res){
    res.render("dispos.ejs")
});

app.get("/taches", function(req, res){
    res.render("taches.ejs")
});

app.get("/affect", function(req, res){
    res.render("affect.ejs")
});

//endregion

//region QUERY GET REQUESTS

//region GET TABLES ALL DATA
app.get("/orga", function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {undefined: undefined}
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });

});

app.get("/task", function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/task',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {undefined: undefined}
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.get("/shift", function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/shift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {undefined: undefined}
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.get("/subshift", function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/subshift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {undefined: undefined}
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.get("/shift_orga", function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/shift_orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {undefined: undefined}
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.get("/shift_task", function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/shift_task',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {undefined: undefined}
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});
//endregion

//region GET DATA WITH idOrga
app.get("/shift_by_orga",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/shift_by_orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idOrga: req.body.idOrga }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.get("/task_by_orga",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/task_by_orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idOrga: req.body.idOrga }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.get("/orga_task",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/orga_task',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idOrga: req.body.idOrga }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.get("/orga_shift",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/orga_shift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idOrga: req.body.idOrga }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.get("/orga_details",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/orga_details',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idOrga: req.body.idOrga }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.get("/task_by_resp_orga", function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/task_by_resp_orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idOrga: req.body.idOrga }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.get("/assigned_task_by_orga",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/assigned_task_by_orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idOrga: req.body.idOrga }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});
//endregion

//region GET DATA WITH idTask
app.get("/shift_by_task",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/shift_by_task',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idTask: req.body.idTask }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});
        res.send(body);
    });
});

app.get("/orga_assigned_by_task", function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/orga_assigned_by_task',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idTask: req.body.idTask }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});
        res.send(body);
    });
});
//endregion

//region GET DATA WITH idShift
app.get("/orga_by_shift",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/orga_by_shift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idShift: req.body.idShift }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});
        res.send(body);
    });
});

app.get("/task_by_shift",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/task_by_shift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idShift: req.body.idShift }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});
        res.send(body);
    });
});

app.get("/subshift_by_shift",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/subshift_by_shift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idShift: req.body.idShift }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});
        res.send(body);
    });
});
//endregion

//region GET DATA WITH idSubShift
app.get("/orga_by_subshift",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/orga_by_subshift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idSubShift: req.body.idSubShift }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});
        res.send(body);
    });
});

app.get("/task_by_subshift",function(req, res){
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:2445/task_by_subshift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: { idSubShift: req.body.idSubShift }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});
        res.send(body);
    });
});
//endregion

//endregion

//region QUERY CREATE REQUESTS

app.post("/orga", function(req, res){
    let options = {
        method: 'POST',
        url: 'http://127.0.0.1:2445/orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            mail: req.body.mail,
            pwd: req.body.pwd
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.post("/assign_shift_orga", function(req, res){
    let options = {
        method: 'POST',
        url: 'http://127.0.0.1:2445/assign_shift_orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            idOrga: req.body.idOrga,
            shifts: req.body.shifts
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.post("/task", function(req, res){
    let options = {
        method: 'POST',
        url: 'http://127.0.0.1:2445/task',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            name: req.body.name,
            description: req.body.description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            idOrga: req.body.idOrga
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.post("/shift", function(req, res){
    let options = {
        method: 'POST',
        url: 'http://127.0.0.1:2445/shift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            start_date: req.body.start_date
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.post("/assign_task_orga", function(req, res){
    let options = {
        method: 'POST',
        url: 'http://127.0.0.1:2445/assign_task_orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            idOrga: req.body.idOrga,
            idTask: req.body.idTask
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.post("/shifts", function(req, res){
    let options = {
        method: 'POST',
        url: 'http://127.0.0.1:2445/shifts',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            undefined: undefined
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

//endregion

//region QUERY UPDATE REQUESTS

//endregion

//region QUERY DELETE REQUESTS

app.delete('/shift', function(req, res){
    let options = {
        method: 'DELETE',
        url: 'http://127.0.0.1:2445/shift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            idShift: req.body.idShift,
            delete_task: req.body.delete_task
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.delete('/orga', function(req, res){
    let options = {
        method: 'DELETE',
        url: 'http://127.0.0.1:2445/orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            idOrga: req.body.idOrga,
            delete_task: req.body.delete_task
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.delete('/task', function(req, res){
    let options = {
        method: 'DELETE',
        url: 'http://127.0.0.1:2445/task',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            idTask: req.body.idTask
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.delete('/task_shift', function(req, res){
    let options = {
        method: 'POST',
        url: 'http://127.0.0.1:2445/task_shift',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            idTask: req.body.idTask,
            idSubShift: req.body.idSubShift
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.delete('/task_orga', function(req, res){
    let options = {
        method: 'POST',
        url: 'http://127.0.0.1:2445/task_orga',
        headers:
            {
                'Postman-Token': '3cca8e0a-0ec5-465e-aff4-b8dbc6816ef8',
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+req.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {
            idTask: req.body.idTask,
            idOrga: req.body.idOrga
        }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

//endregion

/*region AUTH REQUESTS*/

app.post("/check_pwd", function(req, res){
    let options = {
        method: 'POST',
        url: 'http://localhost:4524/check_pwd',
        headers:
            {
                'Postman-Token': 'e99cb172-c3fc-4150-ae2a-6005aadfa7bd',
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form:
            {
                mail: req.body.mail,
                pwd: req.body.pwd
            }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.post("/register_user", function(req, res){
    let options = {
        method: 'POST',
        url: 'http://localhost:4524/register_user',
        headers:
            {
                'Postman-Token': 'e99cb172-c3fc-4150-ae2a-6005aadfa7bd',
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form:
            {
                mail: req.body.mail,
                pwd: req.body.pwd
            }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

app.post("/logout", function(req, res){
    let options = {
        method: 'POST',
        url: 'http://localhost:4524/logout',
        headers:
            {
                'Postman-Token': 'e99cb172-c3fc-4150-ae2a-6005aadfa7bd',
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        form:
            {
                idOrga: req.body.idOrga
            }
    };

    request(options, function (error, response, body) {
        if (error) res.send({'status': 1000, 'error': errors.error_1000});

        res.send(body);
    });
});

/*endregion*/

//region LISTEN

app.listen(80, function(){
    console.log("client server listening on port 80");
});

//endregion