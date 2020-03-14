import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

import { Button, Icon, Row, Col, Typography, Statistic, Input } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import Noty from 'noty'
import '../../node_modules/noty/lib/noty.css'
import '../../node_modules/noty/lib/themes/metroui.css'

const { Title } = Typography

function Video(props) {

  console.log(props);

  const [video, setVideo] = useState('')
  const [videoPause, setVideoPause] = useState(true)

  const playerRef = useRef()

  const test = useRef(false)


  // this.buttonFunction = this.buttonFunction.bind(this)

  useEffect(() => {
    const buttonFunction = (event) => {
      if (event.keyCode === 37) {
        //    props.socket.emit('reqPrev')
      }

      if (event.keyCode === 39) {
        //     props.socket.emit('reqNext')
      }
    }
    props.socket.on(
      'gotVideo',
      function (video) {
        props.setLoading(false)
        console.log(video);
        setVideo(video)
      }
    )

    props.socket.on(
      'pauseVideo',
      function (video) {
        setVideoPause(false)
      }
    )

    props.socket.on(
      'playVideo',
      function (video) {
        setVideoPause(true)
      }
    )

    props.socket.on(
      'seek',
      function (time) {
        console.log(time);
        test.current = true
        playerRef.current.seekTo(parseFloat(time), 'seconds')
      }
    )

    //    document.addEventListener('keydown', buttonFunction, false)
    return () => {
      //    document.removeEventListener('keydown', buttonFunction, false)
      props.socket.off('gotVideo')
      props.socket.off('pauseVideo')
      props.socket.off('playVideo')
      props.socket.off('seek')

    }
  }, [])

  return (
    <div className='coub'>
      <Title level={2} style={{ marginLeft: '1em' }}>{video.text}</Title>
      <ReactPlayer ref={playerRef} width="48vw" height="70vh" url={video} loop controls playing={videoPause} onPlay={() => {
        props.socket.emit('playVideo', {
          userId: props.socket.id,
          from: props.username,
          time: new Date().toLocaleTimeString('it-IT')
        })
      }} onPause={() => {
        console.log('pause');        
        props.socket.emit('pauseVideo', {
          userId: props.socket.id,
          from: props.username,
          time: new Date().toLocaleTimeString('it-IT')
        })
      }}
      onSeek={(sec) => { 
        if (!test.current) {       
        props.socket.emit('seek', {
          userId: props.socket.id,
          from: props.username,
          to: sec,
          time: new Date().toLocaleTimeString('it-IT')
        })
      } else {
        test.current = false
      }
      }}
      />
      <br />
      <Row >
        <Input placeholder="Video url" onPressEnter={(e) => {
          props.socket.emit('sendVideo', {
            userId: props.socket.id,
            from: props.username,
            video: e.target.value,
            time: new Date().toLocaleTimeString('it-IT')
          })
          e.target.value = ""
        }} />
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

      </div>
    </div>
  )
}

export default Video
