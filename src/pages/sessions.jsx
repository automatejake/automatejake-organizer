import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, Header, Icon, Label, List } from 'semantic-ui-react'
import Task from '../components/task'
// import ReactDOM from 'react-dom';
// import Draggable from 'react-draggable';
// import {app}  from 'electron';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// const Notification2 = require('node-mac-notifier');  



const formatSeconds = (seconds) => {
    let m = Math.floor(seconds/60)
    let s = seconds % 60

    if (s < 10) {
        return m + ":0" + s
    }

    return m + ":" + s
}

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [session_len, setSessionLength] = useState(600);
    const [break_len, setBreakLength] = useState(120);
    const [remainingTime, setRemainingTime] = useState(0);
    const [start,setStart] = useState(Date.now());
    const [seconds, setSeconds] = useState(session_len);
    const [isSession,setIsSession] = useState(true);
    const [percentage, setPercentage] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [timerIcon,setTimerIcon] = useState(()=>( <Icon size='large' name='play' />));

    const toggle = () => {
        setIsActive(!isActive);
        if (isActive)
            setStart(Date.now());
        else
            setRemainingTime(seconds);
        
    }

    const changeBreakLength = (newLength) => {
        setBreakLength(newLength);
    }
    const changeSessionLength = (newLength) => {
        setSessionLength(newLength);
    }

    const addSession = () => {
        setSessions([...sessions,<Task/>])
    }
    const removeSession = () => {
       var test = [...sessions]
       test.pop()
       setSessions(test)
    }

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
          interval = setInterval(() => {
            let delta = Date.now() - start;    
            setSeconds(seconds => remainingTime - Math.floor(delta / 1000));
                if (isSession) {
                    setPercentage( 100 - 100*((seconds-1)/session_len));
                }else{
                    setPercentage( 100 - 100*((seconds-1)/break_len));
                }   
            }, 10);
        }else if(isActive && seconds < 1){

            Notification.title = "hello"
            const notification = new Notification('Wow, replies!', {title:"test"},{ canReply: true,  title:"test"});

            notification.addEventListener('reply', ({ response }) => {
            alert(`User entered: ${response}`);
            });
            
            if (isSession) {
                setIsSession(!isSession)
                setSeconds(break_len);
            }else{
                setIsSession(!isSession)
                setSeconds(session_len);
            }

            setTimerIcon(<Icon name='play' />);
            clearInterval(interval); 
  
            setIsActive(!isActive);
            if (isActive)
                setStart(Date.now());
            else
                setRemainingTime(seconds);
        }
        return () => clearInterval(interval);
      }, [break_len,session_len, start, remainingTime, seconds, isSession, isActive]);

    return(  
        <Container>
            <Grid columns={2}>
                <Grid.Row>
                    <Header as='h1'>Complete by</Header>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <List>
                        {sessions.map(
                            session => <List.Item>{session}</List.Item>
                        )}
                        </List>
                    </Grid.Column>
                    <Grid.Column width={6}>   
                        <CircularProgressbarWithChildren value={percentage} >
   
    
                            <Header style={{fontSize:"90px"}}>
                            {/* text={`${formatSeconds(seconds) }`} */}
                            {formatSeconds(seconds)}
                            </Header>
                    
                            <Button style={{}} onClick={() => { 
                                toggle()
                                if (isActive){
                                    setTimerIcon(<Icon size='large' name='play' />)
                                }else{
                                    setTimerIcon(<Icon size='large' name='stop circle' />)
                                }
                            }} primary>
                                <Button.Content>
                                    {timerIcon}
                                </Button.Content>
                            </Button> 
                    

                        </CircularProgressbarWithChildren>
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row>
                    <Button onClick={() => { removeSession()} } icon>
                        <Icon size='large' name='minus circle' />
                    </Button>

                    <Label>
                    Tasks: {sessions.length}
                    </Label>

                    <Button onClick={() => { addSession()} } icon>    
                        <Icon name='plus circle' />
                    </Button>

                    <Label>
                    Task Length: {formatSeconds(session_len)}
                    </Label>
                    <Label>
                    Break Length: {formatSeconds(break_len)}
                    </Label>

                </Grid.Row>

            </Grid>
            
        </Container>
    )
}





export default Sessions;