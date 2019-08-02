import React from 'react'
import ReactDOM from 'react-dom'
import { Input, Avatar, Divider, Button, Icon, Row, Col } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

class Chat extends React.Component {
  render () {
    return <div style={{ width: '50vw', margin: 10, padding: 25, borderRadius: 15, borderStyle: 'solid' }}>
      <div className={'usersChat'} style={{ margin: 10 }}>
        <Avatar size='large' icon='user' /> SOCKET.ID
      </div>
      <Divider dashed style={{ marginBottom: 10, marginTop: 0 }} />
      <div className={'messagesChat'} >
        <Message user='socket id' message='xDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD' />
        <Message user='socket id' message='xDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD' />
        <Message user='socket id' message='xDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD' />
        <Message user='socket id' message='xDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD' />
        <Message user='socket id' message='xDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD' />

      </div>
      <Divider dashed style={{ marginBottom: 10, marginTop: 0 }} />
      <Row>
        <Col span={22}>
          <Input placeholder='Message ...' />
        </Col>
        <Col span={2} push={1}>
          <Button type='primary' shape='circle' icon='caret-right' size={'default'} />
        </Col>
      </Row>
    </div>
  }
}

function Message (props) {
  return <div className='message-box' style={{ margin: 10 }}>
    <div style={{ padding: 10 }}>
      <Avatar size='small' icon='user' /> SOCKET.ID
      <Row>
        <Col span={8}>
          {props.user} :
        </Col>
        <Col span={14} style={{ display: 'flex' }}>
          <div style={{ fontWeight: 'bold', borderRadius: 10, wordBreak: 'break-all', padding: 8, borderStyle: 'solid', borderColor: 'gray', borderWidth: 1 }}>
            {props.message}
          </div>
        </Col>
      </Row>
    </div>
  </div>
}

export default Chat
