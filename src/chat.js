import React, {useState, useEffect,useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { sendMessage as sendChat1, recieveMessage as replyChat1 } from './slices/chat1Slice';
import { sendMessage as sendChat2, recieveMessage as replyChat2 } from './slices/chat2Slice';
import { sendMessage as sendChat3, recieveMessage as replyChat3 } from './slices/chat3Slice';


const Wbchatapplication = () => {
    const [message, setMessage] = useState('')
    const [openChatTab, setopenChatTab] = useState('chat1')
    const dispatch = useDispatch()
    const chat1 = useSelector((state)=> state.chat1.messages)
    const chat2 = useSelector((state)=> state.chat2.messages)
    const chat3 = useSelector((state)=> state.chat3.messages)
    function updateMessage(e) {
        setMessage(e.target.value)
    }
    function handleSendMessg () {
        if(message.trim() === '') return ;
        if(openChatTab == 'chat1'){
            dispatch(sendChat1(message))
            setMessage('')
            setTimeout(() => {dispatch(replyChat1(message))
            },500)
        }else if(openChatTab == 'chat2'){
            dispatch(sendChat2(message))
            setMessage('')
            setTimeout(() => {dispatch(replyChat2(message))
            },500)
        }else if(openChatTab == 'chat3'){
            dispatch(sendChat3(message))
            setMessage('')
            setTimeout(() => {dispatch(replyChat3(message))
            },500)
        }
        
    }
    function handleOpenChat(e) {
        console.log('clicked chat:' + e.currentTarget.id)
        document.querySelectorAll('li').forEach(li => {
            li.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
        setopenChatTab(e.currentTarget.id)
    }
let openChatWindow = chat1
if(openChatTab== 'chat1'){
    openChatWindow = chat1;
} else if(openChatTab== 'chat2'){
    openChatWindow = chat2;

} else if(openChatTab== 'chat3'){
    openChatWindow = chat3;

} 

const apiResponse = (messg) =>{
    return (
        <div className='api-reply'>
            <div className='profile-icon'>
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
const messagesEndRef = useRef(null); 
useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [openChatWindow]);
    return(
        <div className='chat-wrapper'>
            <div className='chat-left'>
               <ul className='chat-ul'>
            <li key= 'chatid1' id="chat1" className= "" onClick={(e)=> {handleOpenChat(e)}}>Chat 1</li>
            <li key= 'chatid2' id="chat2" className= "" onClick={(e)=> {handleOpenChat(e)}}>Chat 2</li>
            <li key= 'chatid3' id="chat3" className= "" onClick={(e)=> {handleOpenChat(e)}}>Chat 3</li>
        </ul>
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
                <button type='submit' onClick={handleSendMessg} className='sendbtn'>Send</button>
            </div>
        </div>
            </div>
         
        </div>



        

    )
}

export default Wbchatapplication