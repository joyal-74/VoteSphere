import app from "./app.js";
import http from 'http';
import { MongoConnection } from "./infra/database/Mongo.config.js";
import { initSocket } from "./presentation/socket/SocketManager.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initSocket(server);


server.listen(PORT, async () => {
    await MongoConnection.connect()

    console.log(`server started at port ${PORT}`)
})