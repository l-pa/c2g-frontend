import React from 'react'
import ReactDOM from 'react-dom'
import Container from '@material-ui/core/Container'
import Iframe from 'react-iframe'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Icon from '@material-ui/core/Icon'

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
      'gotNext',
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

    this.props.socket.on(
      'gotPrev',
      function (prevCoub) {
        // Connected, let's sign-up for to receive messages for this room
        this.props.setLoading(false)
        console.log(prevCoub)
        if (prevCoub) {
          this.setState({ currentCoub: prevCoub.permalink })
          new Noty({
            theme: 'metroui',
            type: 'success',
            layout: 'centerRight',
            timeout: 1000,
            text: prevCoub.title
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
          url={`http://coub.com/embed/${
            this.state.currentCoub
          }?muted=false&autostart=true&originalSize=false&hideTopBar=false&startWithHD=false`}
          width='100vw'
          height='405vh'
          id='coubVideo'
          className='myClassname'
          display='initial'
          position='relative'
        />
        <br />
        <Grid item>
          <ButtonGroup
            fullWidth
            color='primary'
            aria-label='full width outlined primary button group'
          >
            <Button
              onClick={() => {
                this.props.socket.emit('reqPrev')
              }}
            >
              <Icon>skip_previous</Icon>
            </Button>

            <Button
              onClick={() => {
                this.props.socket.emit('reqRandom')
              }}
            >
              <Icon>movie</Icon>
            </Button>
            <Button
              onClick={() => {
                this.props.socket.emit('reqNext')
              }}
            >
              <Icon>skip_next</Icon>
            </Button>
          </ButtonGroup>
        </Grid>
      </div>
    )
  }
}

export default CoubSocket
