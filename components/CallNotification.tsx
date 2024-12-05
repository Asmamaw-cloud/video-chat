'use client'

import { useSocket } from "@/context/SocketContext";
import Avatar from "./Avatar";
import { MdCall, MdCallEnd } from "react-icons/md";

const CallNotification = () => {

    const {ongoingCall, handleJoinCall, handleHangup} = useSocket()

    if(!ongoingCall?.isRinging) return
    

    return ( 
        <div className="absolute bg-slate-500 bg-opacity-70 w-screen h-screen top-0 left-0 flex items-center justify-center ">
            <div className="bg-white min-w-[300px] min-h-[100px] flex flex-col items-center justify-center rounded p-4 ">
                <div className="flex flex-col items-center">
                    <Avatar src={ongoingCall.participants.caller.profile.imageUrl}/>
                    <h3> {ongoingCall.participants.caller.profile.fullName?.split(' ')[0] } </h3>
                </div>
                <p className="text-sm mb-2">Incomming Call</p>
                <div className="flex gap-8">
                    <button onClick={() => handleJoinCall(ongoingCall)} className=" w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-white "> <MdCall size={24}/> </button>
                    <button onClick={() =>handleHangup({ongoingCall: ongoingCall ? ongoingCall : undefined, isEmitHangup: true})} className=" w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white "> <MdCallEnd size={24}/> </button>

                </div>
            </div>
        </div>
     );
}
 
export default CallNotification;