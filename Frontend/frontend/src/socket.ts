// src/socket.ts
import { io } from 'socket.io-client';

const socket = io('http://127.0.0.1:5001');
export default socket;
