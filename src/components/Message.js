import React, { useEffect, useState } from 'react'
import { Avatar, Row, Col } from 'antd'
import { animateScroll } from 'react-scroll'

const re = /:([\w]+):/g

function Message(props) {
  const [matched, setMatched] = useState(false)
  const [gif, setGif] = useState([])

  const setGifUrl = (url, isEmoji = false) => {
    if (isEmoji) {
      setGif(gif => gif.concat(<img src={url} width={'90px'} height={'100%'} style={{ borderRadius: 5 }} alt='gif...' onLoad={() => {
        animateScroll.scrollToBottom(
          {
            containerId: 'messagesChat',
            smooth: true,
            duration: 100,
            isDynamic: true
          }
        )
      }} />))
    } else {
      setGif(gif => gif.concat(<img src={url} width={'200vw'} height={'100%'} style={{ borderRadius: 5 }} alt='gif...' onLoad={() => {
        animateScroll.scrollToBottom(
          {
            containerId: 'messagesChat',
            smooth: true,
            duration: 100,
            isDynamic: true
          }
        )
      }} />))
    }
  }

  useEffect(() => {
    if (props.userId !== 'System' && props.message.match(re)) {
      setMatched(true)
      const a = props.message.match(re)
      console.log(a);

      for (let i = 0; i < a.length; i++) {
        const element = a[i]
        switch (element) {
          case ':medic:':
            setGifUrl('https://media.giphy.com/media/WseBPTW8tmlr2/giphy.gif')
            break

          case ':gachi:':
            setGifUrl('https://cdn.betterttv.net/emote/59143b496996b360ff9b807c/3x', true)
            break

          case ':clap:':
            setGifUrl('https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/3x', true)
            break
          case ':bass:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            setGifUrl('https://cdn.betterttv.net/emote/5c393177fb40bc09d7c6c3aa/3x', true)
            break
          case ':ja:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            setGifUrl('https://cdn.betterttv.net/emote/59f4e1432c047947fb7e0c7b/3x', true)
            break
          case ':xd:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            setGifUrl('https://discordemoji.com/assets/emoji/xd.gif', true)
            break
          case ':help:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            setGifUrl('https://discordemoji.com/assets/emoji/3925_help.gif', true)
            break

          case ':smart:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            setGifUrl('https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif')
            break
          case ':pingu:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            setGifUrl('https://discordemoji.com/assets/emoji/Nootnoot.gif', true)
            break
          case ':pear:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            setGifUrl('https://discordemoji.com/assets/emoji/PearThink.png', true)
            break
          case ':mm:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            setGifUrl('https://discordemoji.com/assets/emoji/1102_belledell1.gif', true)
            break
          case ':aaa:':
            setGifUrl('https://media.giphy.com/media/IaWnztH7MR0jGZUVXx/giphy.gif')
            break
          case ':niee:':
            setGifUrl('https://media.giphy.com/media/dvILshvavCEaM2tIWa/200w_d.gif')
            break

          case ':maros:':
            setGifUrl('https://media.giphy.com/media/WrBSHRLE9gEgM/giphy.gif')
            break

          case ':co:':
            setGifUrl('https://media.giphy.com/media/9ohlKnRDAmotG/giphy-downsized.gif')
            break

          case ':rebel:':
            setGifUrl('https://thumbs.gfycat.com/ImmaterialThreadbareAdouri-size_restricted.gif')
            break

          case ':tonko:':
            setGifUrl('https://media.giphy.com/media/yWgPv6KoCY6c0/giphy.gif')
            break
          case ':nonono:':
            setGifUrl('https://media.giphy.com/media/u0LxmF9QVeDoQ/giphy.gif')
            break


          case ':vysoko:':
            setGifUrl('https://media1.tenor.com/images/5a943ddfef747845bcea8021bf39513b/tenor.gif')
            break


          case ':vecer:':
            setGifUrl('https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif')
            break

          case ':sul:':
            setGifUrl('https://media.giphy.com/media/QOgvV9rV4hHpgNRBfQ/giphy.gif')
            break

          case ':maserka:':
            setGifUrl('https://media.giphy.com/media/l0MYRzcWP7cjfNQ2I/giphy.gif')
            break

          case ':mapa:':
            setGifUrl('https://media.giphy.com/media/zNyBPu5hEFpu/giphy.gif')
            break

          case ':zkusas:':
            setGifUrl('https://thumbs.gfycat.com/UniformDizzyAmericankestrel-size_restricted.gif')
            break
          case ':hnupe:':
            setGifUrl('https://i.makeagif.com/media/4-12-2018/b5p8GJ.gif')
            break
          case ':rozhanis:':
            setGifUrl('https://i.makeagif.com/media/8-21-2015/Z47mdU.gif')
            break


          case ':hotovo:':
            setGifUrl('https://media.giphy.com/media/26uf9FlttgyOa2zrq/200w_d.gif')
            break


          default:
            setGif(gif => gif.concat(<div style={{ borderRadius: 5 }} >{element}</div>))
            break
        }
      }
      const uniqueEmotes = [...new Set(a)]
      console.log(uniqueEmotes);

      for (let i = 0; i < uniqueEmotes.length; i++) {
        const element = uniqueEmotes[i]
        switch (element) {
          case ':medic:':
            new Audio('https://wiki.teamfortress.com/w/images/8/8d/Demoman_medic03.wav').play()
            break

          case ':gachi:':
            new Audio('https://www.myinstants.com/media/sounds/rip-ears.mp3').play()
            break

          case ':clap:':
            new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            break
          case ':bass:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            break
          case ':ja:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            break
          case ':xd:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            break
          case ':help:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            break

          case ':smart:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            break
          case ':pingu:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            break
          case ':pear:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            break
          case ':mm:':
            //   new Audio('https://www.myinstants.com/media/sounds/clap-clap-clap.mp3').play()
            break

          case ':niee:':
            new Audio('https://www.myinstants.com/media/sounds/woah_Wlc9EIM.mp3').play()
            break
          case ':aaa:':
            new Audio('https://www.myinstants.com/media/sounds/five-nights-at-freddys-full-scream-sound_1.mp3').play()
            break

          case ':maros:':
            new Audio('https://www.myinstants.com/media/sounds/orgasm-6_vHxaAU9.mp3').play()
            break
          case ':co:':
            new Audio('https://www.myinstants.com/media/sounds/kurwa-czujesz-to-czujesz-to.mp3').play()
            break

          case ':tonko:':
            new Audio('https://www.myinstants.com/media/sounds/dungeon-master_lH2ReGX.mp3').play()
            break

          case ':nonono:':
            new Audio('https://www.myinstants.com/media/sounds/oh-no-no-no-no-laugh.mp3').play()
            break


          case ':vysoko:':
            new Audio('https://www.myinstants.com/media/sounds/hodne-vysoko-miris.mp3').play()
            break


          case ':vecer:':
            new Audio('http://vyhlasto.cz/audio/3b/3b15-dobry-vecer.mp3').play()
            break

          case ':sul:':
            new Audio('http://vyhlasto.cz/audio/3b/3b22-jaj-boze-muj-hod-tam-tu-sul-na-nekoho-tam-z-okna.mp3').play()
            break

          case ':maserka:':
            new Audio('http://vyhlasto.cz/audio/1e/1e41-prej-maserka-kurva-je-to.mp3').play()
            break

          case ':mapa:':
            new Audio('http://vyhlasto.cz/audio/1e/1e37-neznate-mapu.mp3').play()
            break

          case ':zkusas:':
            new Audio('http://vyhlasto.cz/audio/1e/1e19-jak-zkusas.mp3').play()
            break
          case ':hnupe:':
            new Audio('http://vyhlasto.cz/audio/1e/1e8-bez-do-riti-ty-hnupe.mp3').play()
            break
          case ':rozhanis:':
            new Audio('http://vyhlasto.cz/audio/1g/1g7-co-se-tady-rozhanis.mp3').play()
            break


          case ':hotovo:':
            new Audio('http://vyhlasto.cz/audio/1j/1j6-hotovo-natocte-to.mp3').play()
            break

          case ':rebel:':
            new Audio('https://www.myinstants.com/media/sounds/je-to-rebel.mp3').play()
            break
          default:
            var audio = new Audio('https://www.myinstants.com/media/sounds/spongebob-fail.mp3')
            audio.volume = 0.3
            audio.play()
            break
        }
      }
    }
  }, [props.message])

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messagesChat',
      delay: 0,
      duration: 100,
      isDynamic: true
    })
  }, [gif])

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
                if (matched) {
                  return (
                    <div>
                      {gif.map((i) => {
                        return (i)
                      })}
                    </div>
                  )
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
