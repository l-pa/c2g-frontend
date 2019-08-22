import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import {
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Select,
  Icon,
  Checkbox,
  Modal,
  Tooltip,
  Input,
  Alert
} from 'antd'
import Noty from 'noty'
import Coub from './components/Coub'
import Chat from './components/Chat'

import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import SocketContext from './SocketContext'

import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/metroui.css'

const socket = require('socket.io-client')('https://c2gbb.herokuapp.com/')
// const socket = require('socket.io-client')('http://localhost:8080')

const room = 'abc123'

const { Title } = Typography
const { Option } = Select

console.log(socket)


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
  const [roomOwner, setRoomOwner] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')
  const [channelName, setChannelName] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [coubCount, setCoubCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [usernameInput, setUsernameInput] = useState('')
  const [usernameError, setUsernameError] = useState(false)

  const [username, setUsername] = useState(window.sessionStorage.getItem('username'))

  const [users, setUsers] = useState([])

  socket.on('coubCount', function (coubCount) {
    setCoubCount(coubCount)
  })

  socket.on('users', function (users) {
    setUsers(users)
  })

  socket.on('connect', function () {
    // Connected, let's sign-up for to receive messages for this room
    socket.emit('room', room)
    if (!window.sessionStorage.getItem('username')) {
      setShowModal(true)
    } else {
      setUsername(window.sessionStorage.getItem('username'))
    }
  })

  function setLoadingProp (value) {
    setLoading(value)
  }
  setLoadingProp.bind(this)

  function setOwnerProp (value) {
    setRoomOwner(value)
  }
  setOwnerProp.bind(this)

  function useEffectSkipFirst (fn, arr) {
    const isFirst = useRef(true)

    useEffect(() => {
      if (isFirst.current) {
        isFirst.current = false
        return
      }

      fn()
    }, arr)
  }

  useEffectSkipFirst(
    () => {
      console.log(category, sort)
      socket.emit('category', {
        category: category,
        sort: sort,
        channel: channelName,
        hashtag: hashtag
      })
    },
    [sort, category, channelName, hashtag]
  )

  useEffect(() => {
  }, [coubCount])

  useEffect(() => {
    socket.emit('username', username)
  }, [username])

  return (
    <div className='App'>
      <Modal
        visible={showModal}
        title='Username'
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={value => {
              if (isEmpty(usernameInput)) {
                setUsernameError(true)
              } else {
                setUsernameError(false)
                window.sessionStorage.setItem('username', usernameInput)
                setUsername(usernameInput)
                setShowModal(false)
              }
            }}
          >
            Save
            <Icon type='user' />
          </Button>
        ]}
      >
        <Title level={3}>
          Set your username
          <span role='img' aria-label='Glasses'>👓</span>
        </Title>
        <Input
          onChange={event => {
            setUsernameInput(event.target.value)
          }}
          placeholder='Enter your username'
          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={
            <Tooltip title='Visible to others'>
              <Icon type='info-circle' style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
        {usernameError && (
          <div>
            <Alert message='Empty username!' type='error' showIcon />
          </div>
        )}
      </Modal>

      <Title level={1}>
        <span
          style={{
            background: 'linear-gradient(to left, #005c97, #363795)',
            color: 'white',
            padding: 12,
            borderRadius: 10
          }}
        >
          C2G <span role='img' aria-label='Hmm'>🤔</span>
        </span>
      </Title>
      <Divider />
      <Row>
        <Col md={{ span: 4 }}>
          <Title type='secondary' level={4}>
            {username}
          </Title>
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
                setSort('newest')
              }}
            >
              Explore
            </Button>
            <Button
              block
              size='large'
              shape='round'
              icon='fire'
              type='danger'
              style={{ marginTop: '1em' }}
              onClick={() => {
                setLoading(true)
                setCategory('hot')
                setSort('likes_count')
              }}
            >
              Hot
            </Button>
            <Button
              block
              size='large'
              shape='round'
              icon='question'
              type='danger'
              style={{ marginTop: '1em' }}
              onClick={() => {
                setLoading(true)
                setCategory('hashtag')
                setSort('likes_count')
              }}
            >
              Tag
            </Button>
            <Button
              block
              size='large'
              shape='round'
              icon='fire'
              type='primary'
              style={{ marginTop: '1em' }}
              onClick={() => {
                setLoading(true)
                setCategory('channel')
                setSort('likes_count')
              }}
            >
              Channel coubs
            </Button>
            <Divider />
            {category === 'hot' && (
              <div>
                <Title level={4}>Sort by </Title>
                <Select
                  defaultValue='likes_count'
                  style={{ width: '100%' }}
                  onChange={value => {
                    setSort(value)
                    setLoading(true)
                  }}
                >
                  <Option value='likes_count'>
                    <Icon type='like' theme='twoTone' />
                    Likes
                  </Option>
                  <Option value='views_count'>
                    <Icon type='thunderbolt' theme='twoTone' />
                    Views
                  </Option>
                  <Option value='newest_popular'>
                    <Icon type='clock-circle' theme='twoTone' />
                    Newest popular
                  </Option>
                  <Option value='oldest'>
                    <Icon type='calendar' theme='twoTone' />
                    Oldest
                  </Option>
                </Select>
                <Divider />
              </div>
            )}
            {category === 'explore' && (
              <div>
                <Title level={4}>Sort by </Title>
                <Select
                  defaultValue='newest'
                  style={{ width: '100%' }}
                  onChange={value => {
                    setSort(value)
                    setLoading(true)
                  }}
                >
                  <Option value='random'>
                    <Icon type='like' theme='twoTone' />
                    Random
                  </Option>
                  <Option value='coub_of_the_day'>
                    <Icon type='thunderbolt' theme='twoTone' />
                    Coub of the day
                  </Option>
                  <Option value='newest'>
                    <Icon type='clock-circle' theme='twoTone' />
                    Newest
                  </Option>
                </Select>
                <Divider />
              </div>
            )}
            {category === 'channel' && (
              <div>
                <Title level={4}>Sort by </Title>
                <Select
                  defaultValue='likes_count'
                  style={{ width: '100%' }}
                  onChange={value => {
                    setSort(value)
                    setLoading(true)
                  }}
                >
                  <Option value='likes_count'>
                    <Icon type='like' theme='twoTone' />
                    Likes
                  </Option>
                  <Option value='views_count'>
                    <Icon type='thunderbolt' theme='twoTone' />
                    Views
                  </Option>
                  <Option value='newest_popular'>
                    <Icon type='clock-circle' theme='twoTone' />
                    Newest popular
                  </Option>
                </Select>
                <Divider />
                <Input size='large' placeholder='Channel name' onPressEnter={(event) => {
                  setChannelName(event.target.value)
                }} />
                <Divider />
              </div>
            )}
            {category === 'hashtag' && (
              <div>
                <Title level={4}>Sort by </Title>
                <Select
                  defaultValue='likes_count'
                  style={{ width: '100%' }}
                  onChange={value => {
                    setSort(value)
                    setLoading(true)
                  }}
                >
                  <Option value='likes_count'>
                    <Icon type='like' theme='twoTone' />
                    Likes
                  </Option>
                  <Option value='views_count'>
                    <Icon type='thunderbolt' theme='twoTone' />
                    Views
                  </Option>
                  <Option value='newest_popular'>
                    <Icon type='clock-circle' theme='twoTone' />
                    Newest popular
                  </Option>
                  <Option value='oldest'>
                    <Icon type='clock-circle' theme='twoTone' />
                    Oldest
                  </Option>
                </Select>
                <Divider />
                <Input size='large' placeholder='# ' onPressEnter={(event) => {
                  setHashtag(event.target.value)
                }} />
                <Divider />
              </div>
            )}
            <Title level={4}>Settings</Title>
            {
              roomOwner === socket.id &&

              <Checkbox
                disabled
                onChange={() => {
                  socket.emit('lock')
                }}
              >
              Lock room
                <Icon type='lock' theme='twoTone' twoToneColor='#FFD700' />
              </Checkbox>
            }
            <br />

            <Checkbox
              disabled
              onChange={() => {
                // TODO
              }}
            >
              Dark mode
              <Icon type='eye' theme='twoTone' twoToneColor='#808080' />
            </Checkbox>
            <br />
            <Checkbox
              onChange={value => {
                setShowHistory(value.target.checked)
              }}
            >
              Show history
              <Icon type='book' theme='twoTone' twoToneColor='#808080' />
            </Checkbox>
            <Divider />
            <Title level={4}>Stats</Title>
            <Row>
              <Col push={2} span={12}>
                <Title level={3}>{coubCount}</Title>
              </Col>
              <Col pull={2} span={12}>
                <Icon type='eye' theme='twoTone' twoToneColor='#52c41a' style={{ fontSize: '32px' }} />
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={{ span: 12 }}>
          <SocketContext.Provider value={socket}>
            <Coub setLoading={setLoadingProp} />
          </SocketContext.Provider>
        </Col>
        <Col md={{ span: 8 }}>
          <SocketContext.Provider value={socket}>  
            <Chat username={username} history={showHistory} users={users} setOwner={setOwnerProp} />
          </SocketContext.Provider>
        </Col>
      </Row>
    </div>
  )
}

export default App
