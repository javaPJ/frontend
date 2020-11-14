import React, {useState, useEffect} from "react";
import styles from './Chatting.scss';
import classNames from 'classnames/bind';
import {AiOutlineClose, AiFillCaretLeft} from "react-icons/ai";
import {w3cwebsocket as W3CWebSocket} from "websocket";

const cx = classNames.bind(styles);

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const Chatting = ({positionY, mouseMove, handleChattingOn, handleChattingOff}) => {
    const [load, setLoad] =useState(-1), //load
          [chatView, setChatView] = useState(false), //chatting창이 보이는냐 마느냐
          [iconY, setIconY] = useState(0), //clientY의 값을 업데이트하기 위한 변수
          [textHeight, setTextHeight] = useState(20), //textarea의 높이 변수
          [contentHeight, setContentHeight] = useState(240), //contents의 높이 변수
          [yourMessage, setYourMessage] = useState(''), //textarea value 값 변수
          [yourName, setYourName] = useState('Jerome'), //사용자 이름 변수
          [messages, setMessages] = useState([]);
    
    //socket 관련 useEffect
    useEffect(() => {
        if(load === -1){
            client.onopen = () => {
                console.log('WebSocket Client Connected');
            };
            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                console.log('got reply! ', dataFromServer);
                if(dataFromServer.type === "message") {
                    setMessages([...messages, {
                        msg: dataFromServer.msg,
                        user: dataFromServer.user
                    }])
                }
            }
            setLoad(0);
        }
    }, [load])

    //마우스가 1514width 이상이 되면 true가 된다. 이때 clientY값을 update 해준다.
    useEffect(() => {
        if(mouseMove === true) {
            setIconY(positionY);
        }
    }, [mouseMove])

    //textarea 자동 높이 조절
    const ySize = () => {
        var sTextarea = document.getElementById("chat-text");
        if(yourMessage === '') {
            sTextarea.style.height = 20 + "px";
            setTextHeight(20)
            setContentHeight(240);
        } else {
            if(textHeight === '53px') {
                sTextarea.style.overflow = "scroll";
                console.log("none");
            } else {
                sTextarea.style.height = "1px";
                sTextarea.style.height = sTextarea.scrollHeight - 20 + "px";
                setTextHeight(sTextarea.style.height);
                setContentHeight(260-sTextarea.scrollHeight+20);
            }
        }
        
    }

    //textarea에서 enter 키를 눌렀을 때
    const handleEnterKey = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            if(yourMessage === '') {
                alert("Text is none");
            } else {
                client.send(JSON.stringify({
                    type: "message",
                    msg: e.target.value,
                    user: yourName
                }));
            }
        }
    }

    return (
        <div>
            { mouseMove === true &&
                <div>
                { chatView !== true ?
                    <div 
                        style={{top: iconY+"px"}}
                        className={cx('chat-icon')} 
                        onClick={() => {setChatView(true);handleChattingOn()}}
                    >
                        <AiFillCaretLeft color="white"></AiFillCaretLeft>
                    </div>
                    :
                    <div className={cx('chat-main')}>
                        <div className={cx('chat-header')}>
                            <div className={cx('chat-title')}>채팅</div>
                            <div className={cx('chat-close')} onClick={() => {setChatView(false);handleChattingOff()}}>
                                <AiOutlineClose size="27" color="white"></AiOutlineClose>
                            </div>
                        </div>
                        <div className={cx('chat-contents')}>
                            <div 
                                style={{height: contentHeight+"px"}}
                                className={cx('chat-lists')}
                            >
                                {/* { messages.map(
                                    msg =>
                                    <div className={cx('chat-item')}>
                                        <div className={cx('chat-item-header')}>
                                            <div className={cx('chat-username')}>{msg.user}</div>
                                            <div className={cx('chat-date')}></div>
                                        </div>
                                        <div className={cx('chat-item-text')}>{msg.msg}</div>
                                    </div>
                                )} */}
                                <div className={cx('chat-item')}>
                                    <div className={cx('chat-item-header')}>
                                        <div className={cx('chat-username')}>{yourName}</div>
                                        <div className={cx('chat-date')}>오후 10:09</div>
                                    </div>
                                    <div className={cx('chat-item-text')}>asdfasdfasdfaasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsdfasdfasdfasdfasdf</div>
                                </div>
                            </div>

                            <textarea
                                id="chat-text" 
                                style={{height: textHeight}} 
                                onKeyDown={(e) => {ySize();handleEnterKey(e)}} 
                                onKeyUp={() => ySize()}
                                onChange={(e) => setYourMessage(e.target.value)}
                                className={cx('chat-input')}
                                placeholder="메시지를 입력하세요..."
                            />
                        </div>
                    </div>
                }
                </div>
            }
        </div>
    )
}

export default Chatting;