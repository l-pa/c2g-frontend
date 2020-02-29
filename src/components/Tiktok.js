import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'

import { Button, Icon, Row, Col, Typography, Statistic } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import Noty from 'noty'
import '../../node_modules/noty/lib/noty.css'
import '../../node_modules/noty/lib/themes/metroui.css'

const { Title } = Typography

function Tiktok (props) {

  console.log(props);
  

  const [currentTiktok, setCurrentTiktok] = useState('idk')

  const [tiktok, setTiktok] = useState('')
  // this.buttonFunction = this.buttonFunction.bind(this)
  
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
      'gotTiktok',
      function (nextTiktok) {
        props.setLoading(false)
        console.log(nextTiktok);
        setTiktok(nextTiktok)
      }
    )
    document.addEventListener('keydown', buttonFunction, false)
    return () => {
      document.removeEventListener('keydown', buttonFunction, false)
      props.socket.off('gotTiktok')
    }
  }, [])

  return (
    <div className='coub'>
      <Title level={2} style={{ marginLeft: '1em' }}>{tiktok.text}</Title>
      <ReactPlayer height="500px" url={tiktok.videoUrl} loop controls playing />
      <br />
      <Row >
        <Col span={5}>
          {/* <Statistic valueStyle={{ fontSize: '1em' }} title='Date' value={new Date(coub.created_at).toLocaleDateString()} suffix={<Icon type='calendar' />} /> */}
        </Col>
        <Col span={5}>
          {/* <Statistic title='Views' value={coub.views_count} suffix={<Icon type='play-circle' />} /> */}
        </Col>
        <Col span={5}>
          {/* <Statistic title='Likes' value={coub.likes_count} suffix={<Icon type='like' />} /> */}
        </Col>
        {/* {coub.external_download &&
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
         */}
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

export default Tiktok
