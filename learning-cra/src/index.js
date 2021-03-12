import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import './styles/index.css'
import { StrictMode } from 'react'
import { render } from 'react-dom'

// import App from './containers/App/App'

// JSX 학습
// 데이터 → 인터폴레이션(보간) → JSX → React.createElement()

const songs = [
  {
    id: 'song-dkjv01',
    title: 'Jazz Cabbage',
    artist: 'Ian Ewing, Strehlow',
    song: 'https://mp3.chillhop.com/serve.php/?mp3=9363',
    cover:
      'https://chillhop.com/wp-content/uploads/2020/06/49f6e32ca521fbad46a1b281e3893cf6254bf11d-1024x1024.jpg',
    active: true,
    colors: '#fcbc9f #bab1c0'.split(' '),
    albumClass: 'song-figure',
  },
]

// 객체 구조 분해 할당
// const { title, artist, cover, song, colors } = songs[0]

// 앨범 피규어 렌더링 함수
function renderAlbumFigure({ active, albumClass, cover, song, colors }) {
  // const { cover, song: mp3, colors } = song
  return active ? (
    // <figure className="song-figure">
    <figure className={albumClass}>
      <img src={cover} alt="" />
      <figcaption>
        <div>
          <a href={song} download={true}>
            download mp3
          </a>
        </div>
        <span lang="ko">
          여러분이 선택한 앨범에서 선택한 컬러 개수: <b>{colors.length}</b>
        </span>
      </figcaption>
    </figure>
  ) : null
}

// React 요소 (JSX 활용)
// IIFE 활용
const albumElement = (() => {
  let firstSong = songs[0]

  firstSong = {
    ...firstSong,
    active: false,
  }

  // firstSong.active = !firstSong.active

  const styleObject = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }

  return (
    <div className="song-container" lang="en" style={styleObject}>
      <h1 className="song-info">{`${firstSong.title} → ${firstSong.artist}`}</h1>
      {renderAlbumFigure(firstSong)}
    </div>
  )
})()

render(
  <StrictMode>
    {/* <App /> */}
    {albumElement}
  </StrictMode>,
  document.getElementById('root')
)
