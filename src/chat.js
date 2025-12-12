import React, {useState, useEffect,useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { addChat, sendMessage, recieveMessage } from './slices/chatsSlice';


const Wbchatapplication = () => {
    const [message, setMessage] = useState('')
    const [openChatTab, setopenChatTab] = useState('chat1')
    const dispatch = useDispatch()
    const { chatId } = useParams()
    const navigate = useNavigate()
    const chatsState = useSelector((state)=> state.chats)
    const order = chatsState?.order || []
    const chats = chatsState?.chats || {}
    function updateMessage(e) {
        setMessage(e.target.value)
    }
    function handleSendMessg () {
        if(message.trim() === '' || !openChatTab) return ;
        dispatch(sendMessage({ chatId: openChatTab, text: message }))
        setMessage('')
        setTimeout(() => { dispatch(recieveMessage({ chatId: openChatTab, text: message })) }, 500)
    }
    function handleOpenChat(e) {
        const id = e.currentTarget.id
        navigate(`/${id}`)
    }
let openChatWindow = []
if (openChatTab && chats[openChatTab]) {
    openChatWindow = chats[openChatTab].messages
}

useEffect(() => {
    if (chatId) {
        if (chats[chatId]) {
            setopenChatTab(chatId)
        } else if (order.length > 0) {
            navigate(`/${order[0]}`, { replace: true })
        }
    } else if (order.length > 0) {
        navigate(`/${order[0]}`, { replace: true })
    }
}, [chatId, chats, order, navigate])

const apiResponse = (messg) =>{
    return (
        <div className='api-reply  '>
            <div className='profile-icon col-12'>
                <img src='/profile-icon.png' alt='profile-icon' className='profile-icon'></img>
            </div>
            <div className='user-reply-txt'>
                {messg}
            </div>
        </div>
    )
}
const userchat = (messg) =>{
    return (
        <div className='sender-chat'>
            <div className='usertxt'>
                    {messg}
            </div>
            <div className='user-indicator'> You</div>
        </div>
    )
}

function handleAddChat () {
    let maxNumber = 0
    for (let existingId of order) {
        const digits = String(existingId).replace(/\D/g, '')
        const n = digits ? parseInt(digits, 10) : 0
        if (n > maxNumber) maxNumber = n
    }
    const nextNumber = maxNumber + 1
    const newId = 'chat' + nextNumber
    const newName = 'Chat ' + nextNumber


    dispatch(addChat({ id: newId, name: newName }))
    navigate(`/${newId}`)
}

const messagesEndRef = useRef(null); 
useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [openChatWindow]);
    return(
        <div className='chat-wrapper padding'>
            <div className='chat-left '>
               <ul className='chat-ul' id="chatList">
                {order.map((id) => (
                    <li key={id} id={id} className={openChatTab === id ? 'active' : ''} onClick={handleOpenChat}>{chats[id].name}</li>
                ))}
                
            </ul>
            <button name="addChat" className="btn btn-primary addChat-btn" onClick={handleAddChat}>Add Chat</button>
            </div>
            <div className='chat-right'>
            <div className='message-window'>
            <div className='chat-header'> Chatbot</div>
            <div className='messages-list'>
                {openChatWindow.map((chatText, index)=> (
                    <div key={index} className={''}>
                        {(chatText.sender === 'api') ? apiResponse(chatText.text) : userchat(chatText.text)}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className='chat-input'>
                <input type='text' 
                        name='chat-message' 
                        onChange={(e)=> {updateMessage(e)}}
                        onKeyDown={(e) => (e.key === 'Enter') ? handleSendMessg() : ''}
                        value={message}
                        placeholder='Type a message...'
                        className='chat-inputbx'></input>
                <button type='submit' onClick={handleSendMessg} className='sendbtn btnbtn-primary'>Send</button>
            </div>
        </div>
            </div>
         
        </div>



        

    )
}

export default Wbchatapplication