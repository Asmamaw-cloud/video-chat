import {io} from "../server.js"

const onCall = async(participants) => {
    if(participants.reciever.socketId) {
        io.to(participants.reciever.socketId).emit('incommingCall', participants)
    }
}

export default onCall;