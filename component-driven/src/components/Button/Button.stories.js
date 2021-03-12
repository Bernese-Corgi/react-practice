// 스토리를 만들 컴포넌트 불러오기
import Button from './Button'

// 스토리 구성 객체 기본 내보내기
export default {
  // 사이드바에 표시할 이름 (옵션: 그룹 포함)
  title: 'DEMO/Button',
  // 렌더링 할 컴포넌트
  component: Button,
}

// 기본 컴포넌트 Primary 이름으로 내보내기
export const Primary = () => <Button>안녕 스토리북 😎</Button>
