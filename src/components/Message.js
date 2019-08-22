import React from 'react'
import { Avatar, Row, Col } from 'antd'

const re = /:([\w]+):/g

function Message (props) {
  return (
    <div className='message-box' style={{ marginLeft: 10 }}>
      <div
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 0,
          paddingBottom: 0
        }}
      >
        {props.showUser && (
          <div style={{ marginTop: 10 }}>
            <Avatar size='small' src={`https://avatars.dicebear.com/v2/human/${props.user}.svg`} /> {props.user}
          </div>
        )}
        <Row>
          <Col span={24} style={{ display: 'flex' }}>
            <div
              style={{
                display: 'inline-block',
                wordBreak: 'break-word',
                backgroundColor: props.bgcolor,
                background: props.background,
                color: props.color,
                marginTop: 3,
                marginBottom: 3,
                fontWeight: 'bold',
                borderRadius: 10,
        //        wordBreak: 'break-all',
                padding: 7,
                borderStyle: 'solid',
                borderColor: '#A9A9A9',
                borderWidth: 1
              }}
            >
              {(() => {
                if (props.message.match(re)) {
                  if (re.exec(props.message)[1] === 'medic') {
                        // var foo = new Audio("https://wiki.teamfortress.com/w/images/8/8d/Demoman_medic03.wav");
                        // foo.play()
                        // foo = undefined

                    return (
                      <div>
                        Cakal ze bude spamovat MEDIC haha, nefunguje, tak nebude
                        spamovat.
                      </div>
                    )
                  }
                  return re.exec(props.message)[1]
                }
                if (props.thumbnail) {
                  return (
                    <div>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={`https://coub.com/view/${props.link}`}
                        style={{ display: 'grid' }}
                      >
                        {props.message}
                        <img src={props.thumbnail} alt='Coub thumbnail' />
                      </a>
                    </div>
                  )
                }
                return props.message
              })()}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  margin: 0,
                  fontWeight: 'lighter',
                  fontSize: '0.8em'
                }}
              >
                {props.time}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Message
