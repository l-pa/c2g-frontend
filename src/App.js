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
import Tiktok from './components/Tiktok'
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
  const [platform, setPlatform] = useState('coub')

  const [channelName, setChannelName] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [coubCount, setCoubCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [debug, setDebug] = useState(false)

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

  useEffect(
    () => {
      console.log(platform);
      
      socket.emit('category', {
        platform: platform,
        category: category,
        sort: sort,
        channel: channelName,
        hashtag: hashtag
      })
    },
    [platform, sort, category, channelName, hashtag]
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
          <Title level={4}>Coub</Title>

          <div className='buttons'>
            <Button
              size='large'
              shape='round'
              icon='eye'
              type='primary'
              block
              onClick={() => {
                setPlatform('coub')
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
                setPlatform('coub')
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
                setPlatform('coub')
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
                setPlatform('coub')
                setLoading(true)
                setCategory('channel')
                setSort('likes_count')
              }}
            >
              Channel coubs
            </Button>
            <Divider />
          <Title level={4}>Tiktok</Title>

            <Button
              block
              size='large'
              shape='round'
              icon='fire'
              type='primary'
              style={{ marginTop: '1em',  }}
              onClick={() => {
                setLoading(true)
                setPlatform('tiktok')
                setCategory('trends')
                setSort('')
              }}
            >
              Trending
            </Button>
            <Divider/>
            {platform === 'coub' && (
              <div>
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
            )} </div> )}

            <Title level={4}>Settings</Title>
            {
              roomOwner === socket.id &&

              <Checkbox
                disabled
                onChange={() => {
                  socket.emit('lock')
                }}
              >
                <Icon type='lock' theme='twoTone' twoToneColor='#FFD700' />
              Lock room
              </Checkbox>
            }
            <br />
            <Checkbox
              disabled
              onChange={() => {
                // TODO
              }}
            >
              <Icon type='eye' theme='twoTone' twoToneColor='#808080' />
              Dark mode
            </Checkbox>
            <br />
            <Checkbox
              onChange={value => {
                setShowHistory(value.target.checked)
              }}
            >
              <Icon type='book' theme='twoTone' twoToneColor='#808080' />
              Show history
            </Checkbox>
            <Divider />
            <Checkbox
              onChange={() => {
                setDebug(debug => !debug)
              }}
            >
              Debug
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
          {loading && (<div><h1>Loading</h1></div>)}
            { platform === 'coub' && (
            <Coub setLoading={setLoadingProp} socket={socket} />
            )}
            { platform === 'tiktok' && (
            <Tiktok setLoading={setLoadingProp} socket={socket} />
            )}
        </Col>
        <Col md={{ span: 8 }}>
            <Chat socket={socket} username={username} debug={debug} history={showHistory} users={users} setOwner={setOwnerProp} />
        </Col>
      </Row>
    </div>
  )
}

export default App
