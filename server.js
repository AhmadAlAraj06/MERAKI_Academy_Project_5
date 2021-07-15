const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db");
const userRouter = require("./routers/routes/user");
const registerRouter = require("./routers/routes/auth/signUp");
const authRouter = require("./routers/routes/auth/login");
const postRouter = require("./routers/routes/post");
const favoriteRouter = require("./routers/routes/favorite")
const google = require("./routers/controllers/google/google")
const likeRouter = require("./routers/routes/like")
const adminRouter = require("./routers/routes/admin")
const socket = require('socket.io');
const path = require('path');


const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

//routers

//built-in middlewares
app.use(express.json());

//third-party middleware
app.use(cors());
app.use(express.static(path.resolve(__dirname, './client/build')));


//app routers
app.use("/user", userRouter, registerRouter, authRouter);
app.use("/post", postRouter);
app.use("/favorite", favoriteRouter)
app.use(google);
app.use(likeRouter)
app.use(adminRouter)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  },
});

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log('user joined Room:', data);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data.content);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
