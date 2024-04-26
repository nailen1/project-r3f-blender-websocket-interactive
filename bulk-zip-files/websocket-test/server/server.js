// server base code
import { Server } from "socket.io";

const characters = []

const io = new Server({
    cors:{
        origin: "http://localhost:5173",
    }
});

io.listen(3001);

io.on("connection", (socket) => {
    console.log(`connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`);

        const idx = characters.findIndex((item)=> item.key === socket.id);
        characters.splice(idx,1);

        io.emit("characters", characters)

    });
    socket.on("join", (userName)=>{
        characters.push({
            key: socket.id,
            name: userName,
        })
        io.emit("characters", characters)
        // socket.emit
    })

    socket.on("talk", (message)=>{
        const char = characters.find(item => item.key === socket.id)
        char.talk = message
        io.emit("characters", characters)
    })
})