import React, { useEffect, useState } from 'react'
import './App.css'
import Coub from './components/Coub'
import Chat from './components/Chat'

import { Button, Row, Col, Typography, Divider, Select, Icon, Checkbox, Modal, Tooltip, Input, Alert } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import SocketContext from './SocketContext'

import Noty from 'noty'
import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/metroui.css'

import { useCookies } from 'react-cookie'

const socket = require('socket.io-client')('https://c2gbb.herokuapp.com/')
var room = 'abc123'

const { Title } = Typography
const { Option } = Select

socket.on('notification', function (object) {
  // Connected, let's sign-up for to receive messages for this room
  new Noty({
    theme: 'metroui',
    type: object.type,
    layout: 'centerRight',
    timeout: 1000,
    text: object.text
  }).show()
})

function isEmpty (str) {
  return str.replace(/^\s+|\s+$/gm, '').length === 0
}

function App () {
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('explore')
  const [lock, setLock] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [cookies, setCookie] = useCookies(['name'])
  const [showModal, setShowModal] = useState(false)
  const [usernameInput, setUsernameInput] = useState('')
  const [usernameError, setUsernameError] = useState(false)

  const [username, setUsername] = useState('')

  const [messages, setMessages] = useState([])

  socket.on('connect', function () {
    // Connected, let's sign-up for to receive messages for this room
    socket.emit('room', room)
    setUsername(socket.id)
  })

  setLoadingProp.bind(this)
  function setLoadingProp (value) {
    setLoading(value)
  }

  useEffect(() => {
    /* if (!cookies.name) {
      setShowModal(true)
    } */
  }, [])

  return (
    <div className='App'>
      <Modal
        visible={showModal}
        title='Username'
        footer={[
          <Button key='submit' type='primary' onClick={(value) => {
            if (isEmpty(usernameInput)) {
              setUsernameError(true)
            } else {
              setUsernameError(false)
              setCookie('name', usernameInput, { path: '/' })
            }
          }}>
              Save <Icon type='user' />
          </Button>
        ]}
      >
        <Title level={3}>Set your username 👓</Title>
        <Input
          onChange={(event) => { setUsernameInput(event.target.value) }}
          placeholder='Enter your username'
          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={
            <Tooltip title='Visible to others'>
              <Icon type='info-circle' style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
        {
          usernameError &&
          <div>
            <Alert message='Empty username!' type='error' showIcon />
          </div>
        }

      </Modal>

      <Title level={1}><span style={{ background: 'linear-gradient(to left, #005c97, #363795)', color: 'white', padding: 12, borderRadius: 10 }}>C2G 😮</span></Title>
      <Divider />
      <Row>
        <Col md={{ span: 4 }}>
          <Title type='secondary' level={4}>{username}</Title>
          <Divider />
          <Title level={4}>Category</Title>

          <div className='buttons'>
            <Button
              size='large'
              shape='round'
              icon='eye'
              type='primary'
              block
              onClick={() => {
                setLoading(true)
                setCategory('explore')
                socket.emit('category', { category: 'explore', sort: 'newest' })
              }}
            >
            Explore
            </Button>
            <Button block
              size='large'
              shape='round'
              icon='fire'
              type='danger'
              style={{ marginTop: '1em' }}
              onClick={() => {
                setLoading(true)
                setCategory('hot')
                socket.emit('category', { category: 'hot', sort: 'likes_count' })
              }}
            >
            Hot
            </Button>
            <Button block
              size='large'
              shape='round'
              icon='question'
              type='danger'
              style={{ marginTop: '1em' }}
              disabled
            >
            Tag
            </Button>
            <Divider />
            { category === 'hot' &&
            <div>
              <Title level={4}
              >Sort by </Title>
              <Select defaultValue='likes_count' style={{ width: '100%' }} onChange={(value) => {
                socket.emit('category', { category: category, sort: value })
                setLoading(true)
              }}>
                <Option value='likes_count'><Icon type='like' theme='twoTone' /> Likes</Option>
                <Option value='views_count'><Icon type='thunderbolt' theme='twoTone' /> Views</Option>
                <Option value='newest_popular'><Icon type='clock-circle' theme='twoTone' /> Newest popular</Option>
                <Option value='oldest'><Icon type='calendar' theme='twoTone' /> Oldest</Option>
              </Select>
              <Divider />
            </div>
            }
            { category === 'explore' &&
            <div>
              <Title level={4}
              >Sort by </Title>
              <Select defaultValue='newest' style={{ width: '100%' }} onChange={(value) => {
                socket.emit('category', { category: category, sort: value })
                setLoading(true)
              }}>
                <Option value='random'><Icon type='like' theme='twoTone' /> Random</Option>
                <Option value='coub_of_the_day'><Icon type='thunderbolt' theme='twoTone' /> Coub of the day</Option>
                <Option value='newest'><Icon type='clock-circle' theme='twoTone' /> Newest</Option>
              </Select>
              <Divider />
            </div>
            }
            <Title level={4}>Settings</Title>

            <Checkbox disabled onChange={() => {
              setLock(false)
            }}>
              Lock room <Icon type='lock' theme='twoTone' twoToneColor='#FFD700' /></Checkbox>
            <br />
            <Checkbox disabled onChange={() => {
              setLock(false)
            }}>
              Dark mode <Icon type='eye' theme='twoTone' twoToneColor='#808080' /></Checkbox>
            <br />
            <Checkbox onChange={(value) => {
              setShowHistory(value.target.checked)
            }}>
              Show history <Icon type='book' theme='twoTone' twoToneColor='#808080' /></Checkbox>
            <Divider />
          </div>
        </Col>
        <Col md={{ span: 12 }}>

          <SocketContext.Provider value={socket}>
            <Coub setLoading={setLoadingProp} />
          </SocketContext.Provider>
        </Col>
        <Col md={{ span: 8 }}>
          <SocketContext.Provider value={socket}>
            <Chat username={username} history={showHistory} />
          </SocketContext.Provider>

        </Col>

      </Row>
    </div>
  )
}

export default App
