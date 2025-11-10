import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { config } from "dotenv";

// DB & Routes
import connDb from "./db/connDb.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import convRouter from "./routes/conversation.route.js";
import messageRouter from "./routes/message.route.js";

// MỚI: Import trình xử lý socket
import { initSocketServer } from "./socket.js";

// --- 1. Khởi tạo Config và Server cơ bản ---
config();
const app = express();
const server = http.createServer(app);

// --- 2. Cấu hình CORS cho Express (API) ---
const whitelist = [
 'https://chat.kinghappy.id.vn',      
  'https://chat-app-teal-one-38.vercel.app'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Không được phép bởi CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Áp dụng CORS cho API

// --- 3. Cấu hình Middlewares cơ bản ---
app.use(cookieParser());
app.use(express.json());

// --- 4. Khởi tạo Socket.IO ---
// (Vẫn khởi tạo ở đây)
const io = new Server(server, {
  cors: {
    origin: whitelist,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// --- 5. Đăng ký Middleware "Tiêm" (Inject) `io` ---
// (Vẫn giữ ở đây để routes có thể truy cập `req.io`)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// --- 6. Đăng ký các API Routes ---
// (Giữ nguyên logic Express của bạn)
app.get("/healthz", (req, res) => res.json({ oke: true }));
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/conv", convRouter);
app.use("/message", messageRouter);

// --- 7. MỚI: Ủy quyền logic Socket.IO ---
// Gọi hàm từ file socket.js và truyền 'io' instance vào
initSocketServer(io);

// --- 8. Khởi động Server ---
const PORT = process.env.PORT || 3000;
connDb();
server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
