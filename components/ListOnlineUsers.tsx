'use client'


import { useSocket } from "@/context/SocketContext";
import { useUser } from "@clerk/nextjs";
import Avatar from "./Avatar";

const ListOnlineUsers = () => {
    const {user} = useUser();
    const {onlineUsers, handleCall} = useSocket()
    
    return ( 
        <div className="flex border-b border-b-primary/10 w-full">
            {onlineUsers && onlineUsers.map(onlineUser =>{
                if(onlineUser.profile.id === user?.id) return null
                return (
                    <div key={onlineUser.userId} onClick={() => handleCall(onlineUser)} className="flex flex-col items-center gap-1 cursor-pointer">
                        <Avatar src= {onlineUser.profile.imageUrl} />
                        <div>{ onlineUser.profile.fullName?.split(' ')[0] }</div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default ListOnlineUsers;