import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const audioEl = useRef(null)
  const [sense, setSense] = useState(0)
  const [status, setStatus] = useState(0)
  const [goodEvil, setGoodEvil] = useState(0)
  const [timeline, setTimeline] = useState(0)
  const [isStart, setIsStart] = useState(false)

  const styles = {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: 20,
    },
    explain: {
      maxWidth: 800,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    lists: {
      listStyle: 'none',
      display: 'flex',
      fontSize: 18,
      fontWeight: 'bold',
      padding: 0,
    },
    list: {
      margin: '0 10px',
      color: '#000000',
    },
    active: {
      color: '#ff0000',
    },
    image: {
      maxWidth: 400,
    },
    audio: {
      display: 'none',
    },
    start: {
      width: 150,
      height: 30,
      marginTop: 20,
      fontSize: 18,
      fontWeight: 'bold',
    },
  }


  const start = (num) => {
    setIsStart(true)
    audioEl.current.play()
    const ring = () => {
      audioEl.current.removeEventListener('ended', ring)
      const next = num + 1
      if (next === 108) {
        setIsStart(false)
        return
      }
      setSense(next % 6)
      setStatus(Math.floor(next / 6) % 3)
      setGoodEvil(Math.floor(next / 6 / 3) % 2)
      setTimeline(Math.floor(next / 6 / 3 / 2) % 3)
      audioEl.current.play()
      start(num + 1)
    }
    audioEl.current.addEventListener('ended', ring)
  }

  return (
    <div style={styles.root}>
      <div style={styles.explain}>
        <h1>煩悩の数の解説</h1>
        <div>煩悩の数は眼（げん）・耳（に）・鼻（び）・舌（ぜつ）・身（しん）・意（い）の六根のそれぞれに好（こう：気持ちが好い）・悪（あく：気持ちが悪い）・平（へい：どうでもよい）があって18類、この18類それぞれに浄（じょう）・染（せん：きたない）の2類があって36類、この36類を前世・今世・来世の三世に配当して108となり、人間の煩悩の数を表す。</div>
      </div>
      <button onClick={() => start(0)} disabled={isStart} style={styles.start}>開始</button>
      <ul style={styles.lists}>
        <li style={sense === 0 ? {...styles.list, ...styles.active} : styles.list}>眼（げん）</li>
        <li style={sense === 1 ? {...styles.list, ...styles.active} : styles.list}>耳（に）</li>
        <li style={sense === 2 ? {...styles.list, ...styles.active} : styles.list}>鼻（び）</li>
        <li style={sense === 3 ? {...styles.list, ...styles.active} : styles.list}>舌（ぜつ）</li>
        <li style={sense === 4 ? {...styles.list, ...styles.active} : styles.list}>身（しん）</li>
        <li style={sense === 5 ? {...styles.list, ...styles.active} : styles.list}>意（い）</li>
      </ul>
      <ul style={styles.lists}>
        <li style={status === 0 ? {...styles.list, ...styles.active} : styles.list}>好（こう）</li>
        <li style={status === 1 ? {...styles.list, ...styles.active} : styles.list}>悪（あく）</li>
        <li style={status === 2 ? {...styles.list, ...styles.active} : styles.list}>平（へい）</li>
      </ul>
      <ul style={styles.lists}>
        <li style={goodEvil === 0 ? {...styles.list, ...styles.active} : styles.list}>浄（じょう）</li>
        <li style={goodEvil === 1 ? {...styles.list, ...styles.active} : styles.list}>染（せん）</li>
      </ul>
      <ul style={styles.lists}>
        <li style={timeline === 0 ? {...styles.list, ...styles.active} : styles.list}>前世</li>
        <li style={timeline === 1 ? {...styles.list, ...styles.active} : styles.list}>今世</li>
        <li style={timeline === 2 ? {...styles.list, ...styles.active} : styles.list}>来世</li>
      </ul>
      <img src={require('./jyoya.jpg')} styles={styles.image} />
      <audio ref={audioEl} src={require('./zyoya.mp3')} styles={styles.audio} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)