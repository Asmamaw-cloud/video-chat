

import { io } from '../server.js'

const onWebrtcSignal = async(data) => {
    if(data.isCaller) {
        if(data.ongoingCall.participants.reciever.socketId){
            io.to(data.ongoingCall.participants.reciever.socketId).emit('webrtcSignal', data)
        }
    } else {
        if(data.ongoingCall.participants.caller.socketId){
            io.to(data.ongoingCall.participants.caller.socketId).emit('webrtcSignal', data)
        }
    }
}

export default onWebrtcSignal;