import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatroomGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, data: any): void {
    client.join(data.roomName);
    this.server.to(data.roomName).emit('message', {
      message: `新用户${data.nickName}加入${data.roomName}聊天室`,
      nickName: data.nickName,
    });
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() payload: any): void {
    this.server.to(payload.room).emit('message', { nickName: payload.nickName, message: payload.message });
  }
}
