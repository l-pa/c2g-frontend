import React from 'react'
import { Input, Avatar, Divider, Button, Icon, Row, Col } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import SocketContext from '../SocketContext'

const re = /:([\w]+):/g

const CoubSocket = props => (
  <SocketContext.Consumer>
    {socket => <Chat {...props} socket={socket} />}
  </SocketContext.Consumer>
)

function isEmpty (str) {
  return str.replace(/^\s+|\s+$/gm, '').length === 0
}

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = { messages: [], inputText: '' }
    this.props.socket.on('gotMessage', function (message) {
      // Connected, let's sign-up for to receive messages for this room
      // Create a new array based on current state:
      const messages = [...this.state.messages]
      // Add item to it
      messages.push(message)

      // Set state
      this.setState({ messages })
    }.bind(this))
    this.allMessages = this.allMessages.bind(this)
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }
  
    allMessages(){
    return this.state.messages.map((message, index, array) => {
      let showSender = true;
      if(array.length > 1 && array[index-1] && array[index].from === array[index-1].from){
        showSender = false
      }

      if(message.from === this.props.socket.id){
        return <Message showUser={showSender} user={message.from} time={message.time} message={message.message}  />
      }
      else if(message.from ==='System'){
        return <Message showUser={showSender} color='white' background='radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)' user={message.from} time={message.time} message={message.message}  />
      }
      else if(message.from ==='Coub'){
        return <Message showUser={showSender} color='white' background='radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)' user={message.from} time={message.time} message={message.message}  />
      }
      else{
        return <Message showUser={showSender} color='white' background='linear-gradient(to bottom, #396afc, #2948ff)' user={message.from} time={message.time} message={message.message}  />
      }
    }
    )
  }
    render () {        
    return <div style={{ margin: 10, padding: 25, borderRadius: 15 }}>
      <div className={'usersChat'} style={{ margin: 10 }}>
        <div className='userChat'>
          User List
          <ul />
        </div>
      </div>
      <Divider dashed style={{ marginBottom: 10, marginTop: 0 }} />
      <div>

      <div className={'messagesChat'} ref={el => { this.el = el }} style={{ height: '45vh', overflowY: 'scroll' }} >
        {this.allMessages.call()}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
             </div>
      </div>
      
      <Divider dashed style={{ marginBottom: 10, marginTop: 0 }} />
      <Row>
        <Col span={22}>
          <Input value={this.state.inputText} onChange={(event) =>{ this.setState({inputText : event.target.value})}} placeholder='Message ...' onPressEnter={(event) => {
            if (!isEmpty(this.state.inputText)) {
              var time = new Date()
              this.props.socket.emit('message', { from: this.props.username, message: this.state.inputText, time: time.getHours() + ':' + time.getMinutes() })
            }
            this.setState({inputText : ''})

          }} />
        </Col>
        <Col span={2} push={1}>
          <Button type='primary' shape='circle' icon='caret-right' size={'default'} />
        </Col>
      </Row>
    </div>
  }
}

function Message (props) {

  return <div className='message-box' style={{ marginLeft: 10 }}>
    <div style={{ paddingLeft: 10,paddingRight: 10, paddingTop: 0, paddingBottom: 0 }}>
      {
        props.showUser &&
        <div style={{marginTop: 10}}>
        <Avatar size='small' icon='user' /> {props.user}
          </div>
      }
      <Row>
        <Col span={24} style={{ display: 'flex' }}>
          <div style={{  backgroundColor: props.bgcolor, background: props.background,  color: props.color, marginTop: 3, marginBottom: 3, fontWeight: 'bold', borderRadius: 10, wordBreak: 'break-all', padding: 10, borderStyle: 'solid', borderColor: '#A9A9A9', borderWidth: 1 }}>
            { (() =>{
              if(props.message.match(re)){                
                if(re.exec(props.message)[1] === 'medic'){
                  //    var foo = new Audio("https://wiki.teamfortress.com/w/images/8/8d/Demoman_medic03.wav");
                  //    foo.play()
                  //    foo = undefined
                      
                  return (<div>
                     Cakal ze bude spamovat MEDIC haha, nefunguje, tak nebude spamovat.
                    </div>
                    )

                }else{
                  return re.exec(props.message)[1]
                }
              }
              else{
                return props.message
              }
            })()}
          <div style={{display: 'flex', justifyContent: 'flex-end', margin: 0, fontWeight: 'lighter', fontSize: '0.8em'}}>
            {props.time}
            </div> 
          </div>
          
        </Col>
        
      </Row>
    </div>
  </div>
}

export default CoubSocket
