import { io } from 'socket.io-client';
import { socket_url } from '../app/utilities/baseQuery';

export const socket = io(socket_url, { autoConnect: false });
