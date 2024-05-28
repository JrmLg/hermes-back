/**
 * Les noms des cannaux d'événements Websocket s'écrivent sans espace avec
 * des doubles points en séparateur sous la forme: '[roomName]:[roomArgs]'
 * Exemple : 'message:private:1'
 *
 * [roomName] : (
 *   'message',
 *   'patient',
 *   'user',
 * )
 *
 * ROOM : [message]:
 *   socketRoomId: [roomName]:[roomType]:[roomId]
 *   roomArgs: {
 *     [roomType]: (
 *       'private',
 *       'channel',
 *       'team',
 *      )
 *     [roomId]: ( nombre entier > 0)
 *   }
 *   Example: 'message:private:1'
 *
 * ROOM [patient]:
 *   socketRoomId: [roomName]:[patientId]
 *   roomArgs: {
 *     [patientId]: ( nombre entier > 0)
 *   }
 * */

import socketRoomHandler from '../handlers/socketRoomHandler.js';

/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 * */
export default (io, socket) => {
  socket.on('socketRoom:join:message', socketRoomHandler.joinMessageRoom(io, socket));
  socket.on('socketRoom:leave:message', socketRoomHandler.leaveMessageRoom(io, socket));
  socket.on('socketRoom:list', socketRoomHandler.listRooms(io, socket));

  socket.on('socketRoom:join:patient', ({}) => {});
};
