import React from 'react'
import Iframe from 'react-iframe'

import { Button, Row, Col } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import Noty from 'noty'
import '../../node_modules/noty/lib/noty.css'
import '../../node_modules/noty/lib/themes/metroui.css'
import SocketContext from '../SocketContext'

const CoubSocket = props => (
  <SocketContext.Consumer>
    {socket => <Coub {...props} socket={socket} />}
  </SocketContext.Consumer>
)

class Coub extends React.Component {
  constructor (props) {
    super(props)
    this.state = { countPlayed: 0, loadedCoub: false, currentCoub: 'um0um0' }
    console.log(props)
  }

  componentDidMount () {
    this.props.socket.on(
      'gotCoub',
      function (nextCoub) {
        // Connected, let's sign-up for to receive messages for this room

        this.props.setLoading(false)
        console.log(nextCoub)
        if (nextCoub) {
          this.setState({ currentCoub: nextCoub.permalink })
          new Noty({
            theme: 'metroui',
            type: 'success',
            layout: 'centerRight',
            timeout: 1000,
            text: nextCoub.title
          }).show()
        }
      }.bind(this)
    )
  }

  // http://coub.com/embed/um0um0?muted=false&autostart=true&originalSize=false&hideTopBar=false&startWithHD=false
  render () {
    return (
      <div className='coub'>
        <Iframe
          frameBorder={0}
          url={`http://coub.com/embed/${
            this.state.currentCoub
          }?muted=false&autostart=true&originalSize=false&hideTopBar=false&startWithHD=false`}
          width='100%'
          height='600px'
          id='coubVideo'
          className='myClassname'
        />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>

          <Button
            style={{ margin: 5 }}
            block
            size='large'
            icon='left-circle'
            shape='round'
            onClick={() => {
              this.props.socket.emit('reqPrev')
            }}
          />

          <Button
            style={{ margin: 5 }}
            block
            size='large'
            icon='right-circle'
            shape='round'
            onClick={() => {
              this.props.socket.emit('reqNext')
            }}
          />
        </div>
      </div>
    )
  }
}

export default CoubSocket
