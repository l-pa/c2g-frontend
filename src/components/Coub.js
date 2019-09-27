import React, { useState, useEffect } from 'react'
import Iframe from 'react-iframe'

import { Button, Icon, Row, Col, Typography, Statistic } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import Noty from 'noty'
import '../../node_modules/noty/lib/noty.css'
import '../../node_modules/noty/lib/themes/metroui.css'
import SocketContext from '../SocketContext'

const { Title } = Typography

const CoubSocket = props => (
  <SocketContext.Consumer>
    {socket => <Coub {...props} socket={socket} />}
  </SocketContext.Consumer>
)

function Coub (props) {
  const [currentCoub, setCurrentCoub] = useState('zrbpy')

  const [coub, setCoub] = useState('')
  // this.buttonFunction = this.buttonFunction.bind(this)

  function localStorage (key, value) {
    if (window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, value)
    } else {
      window.localStorage.setItem(key, value)
    }
  }

  
  useEffect(() => {
    const buttonFunction = (event) => {
      if (event.keyCode === 37) {
        props.socket.emit('reqPrev')
      }
  
      if (event.keyCode === 39) {
        props.socket.emit('reqNext')
      }
    }
    props.socket.on(
      'gotCoub',
      function (nextCoub) {
        // Connected, let's sign-up for to receive messages for this room

        props.setLoading(false)
        if (nextCoub) {
          console.log(nextCoub)
          setCoub(nextCoub)
          setCurrentCoub(nextCoub.permalink)
          new Noty({
            theme: 'metroui',
            type: 'success',
            layout: 'centerRight',
            timeout: 1000,
            text: nextCoub.title
          }).show()
          localStorage('latestCoub', nextCoub)
        }
      }
    )
    document.addEventListener('keydown', buttonFunction, false)
    return () => {
      document.removeEventListener('keydown', buttonFunction, false)
    }
  }, [])

  // http://coub.com/embed/um0um0?muted=false&autostart=true&originalSize=false&hideTopBar=false&startWithHD=false

  return (
    <div className='coub'>
      <Title level={2} style={{ marginLeft: '1em' }}>{coub.title}</Title>
      <Iframe
        frameBorder={0}
        url={`http://coub.com/embed/${currentCoub}?muted=false&autostart=true&originalSize=false&hideTopBar=false&startWithHD=false`}
        width='100%'
        height='500px'
        id='coubVideo'
        className='myClassname'
        title={'Coub video'}
      />
      <br />
      <Row >
        <Col span={5}>
          <Statistic valueStyle={{ fontSize: '1em' }} title='Date' value={new Date(coub.created_at).toLocaleDateString()} suffix={<Icon type='calendar' />} />
        </Col>
        <Col span={5}>
          <Statistic title='Views' value={coub.views_count} suffix={<Icon type='play-circle' />} />
        </Col>
        <Col span={5}>
          <Statistic title='Likes' value={coub.likes_count} suffix={<Icon type='like' />} />
        </Col>
        {coub.external_download &&
        <Col span={5}>
          <Statistic title={coub.external_download.service_name} suffix={
            coub.external_download.service_name === 'YouTube'
              ? <a href={coub.external_download.url} target={'_blank'}>
                <Icon type='youtube' />
              </a>
              : <a href={coub.external_download.url} target={'_blank'}>
                <Icon type='video-camera' />
              </a>} value={' '} />
        </Col>
        }
      </Row>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          style={{ margin: 5 }}
          block
          size='large'
          icon='left-circle'
          shape='round'
          onClick={() => {
            props.socket.emit('reqPrev')
          }}
        />

        <Button
          style={{ margin: 5 }}
          block
          size='large'
          icon='right-circle'
          shape='round'
          onClick={() => {
            props.socket.emit('reqNext')
          }}
        />
      </div>
    </div>
  )
}

export default CoubSocket
