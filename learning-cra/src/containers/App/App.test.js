// React Testing Library 모듈 불러오기
// render, screen 모듈 추출
import { render, screen } from '@testing-library/react'

// 테스트 할 컴포넌트 불러오기
import App from './App'

// 어떤 컴포넌트를 테스트 할 것인지 기술(describe) 하시오.

// 첫번째 테스트 케이스
test('App이 정상적으로 렌더링 되는가?', () => {
  // 컴포넌트 렌더링
  render(<App />)
  // 스크린 디버깅
  screen.debug()
})

// 첫번째 테스트 케이스
test('`learn react` 텍스트를 가진 요소가 App 컴포넌트에 존재하는가?', () => {
  // 컴포넌트 렌더링
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
