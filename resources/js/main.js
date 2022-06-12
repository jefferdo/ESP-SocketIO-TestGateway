const $ = require("jquery");
import * as io from 'socket.io-client';
import 'bootstrap';



$(function () {
    let host = document.domain
    let socket = io.connect(host);
    socket.on('connect', () => {
        $("#display").text("Connected")
    });

    socket.on('read_pump_display', (data) => {
        console.log(data);
        $("#display").text(JSON.stringify(data, null, 4))
    });
});
