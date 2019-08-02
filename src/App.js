import React, { useEffect, useState } from 'react'
import './App.css'
import Coub from './components/Coub'
import Chat from './components/Chat'

import SocketContext from './SocketContext'

import Noty from 'noty'
import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/metroui.css'

const socket = require('socket.io-client')('http://127.0.0.1:4000')
var room = 'abc123'

socket.on('connect', function () {
  // Connected, let's sign-up for to receive messages for this room
  socket.emit('room', room)
})

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

function App () {
  const [loading, setLoading] = useState(false)
  setLoadingProp.bind(this)
  function setLoadingProp (value) {
    setLoading(value)
  }

  useEffect(() => {
    console.log(socket)
  }, [])

  return (
    <div className='App'>

      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          setLoading(true)
          socket.emit('latest')
        }}
      >
            Latest
      </Button>
      <br />
      <Button variant='contained' color='primary'>
            Hot
      </Button>
      <SocketContext.Provider value={socket}>
        <Coub setLoading={setLoadingProp} />
      </SocketContext.Provider>
      {loading && (
        'Progress bar'
      )}
      <Chat />
    </div>
  )
}

export default App
