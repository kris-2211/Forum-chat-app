// export const getSender = (loggedUser, users)=>{
//     return users[0]._id===loggedUser._id?users[1].name:users[0].name
// }
export const getSenderDetails = (loggedUser, users)=>{
    return users[0]._id===loggedUser._id?users[1]:users[0]
}
export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const isSameSender = (msgs, msg, index, userId)=>{
  return (
    index < msgs.length - 1 &&
    (msgs[index + 1].sender._id !== msg.sender._id || msgs[index + 1].sender._id === undefined) &&
    msgs[index].sender._id !== userId
  )
}

export const isLastMessage = (msgs, index, userId) => {
  return (
    index === msgs.length - 1 && 
    msgs[msgs.length - 1].sender._id !== userId &&
    msgs[msgs.length - 1].sender._id
  )
}