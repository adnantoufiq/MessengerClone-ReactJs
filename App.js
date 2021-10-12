import {  FormControl,  Input, FormHelperText, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { firebase } from '@firebase/app';
import '@firebase/firestore';

import './App.css';
import db from './firebase';
import Message from './Message';
import FlipMove from 'react-flip-move';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';

function App() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    const name = () => {
        let enterName = '';
        while (!enterName || enterName.length >20) {
            
            enterName = prompt('Please enter your name');
            
        }
        return enterName;
    }

    useEffect(() => {
        setUsername(name)
    }, [])

    useEffect(() => {
        db.collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
            })
    }, [])

    const updateInput = (e) => {
        setInput(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('messages').add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('');
    }
  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" alt="Girl in a jacket"/>
      
      <h3>Welcome <span className="bold">{username}</span> !</h3>

      <form className="app__form">
        <FormControl className="app__formControl">
            <InputLabel value={input} onChange={updateInput}>Type a message...</InputLabel>
            <Input className="app__input" value={input}  onChange= { e => setInput(e.target.value) }  />
            <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage} ><SendIcon></SendIcon>
              
            </IconButton>
            <FormHelperText ></FormHelperText>
        </FormControl>
              {/* <input value={input}  onChange= { e => setInput(e.target.value) } /> */}
              {/* <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage} >Send message</Button> */}
      </form>
    
        <FlipMove>
          {

              messages.map(({id,  message })=>  (
              <Message key={id} username={username}  message={message}/>
            ))       
          } 
        </FlipMove>
    </div>
  );
}

export default App;
