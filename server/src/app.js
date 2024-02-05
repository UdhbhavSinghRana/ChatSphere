const io = require("socket.io")(3000, {
    cors: {
        origin: "*",
    },
});

io.on("connection", socket => {
    console.log(socket.id);

    socket.on("send-message", message => {
        console.log(message);
        socket.broadcast.emit("receive-message", message);
    });
});
