// 스토리를 만들 컴포넌트 불러오기
import Logo from './Logo'

// 스토리 구성 객체 기본 내보내기
export default {
  // 사이드바에 표시할 이름 (옵션: 그룹 포함)
  title: 'DEMO/Logo',
  // 렌더링 할 컴포넌트
  component: Logo,
  argTypes: {
    title: {
      description: '로고 이름 (스크린 리더에서 읽힘)',
      defaultValue: { summary: '쿠팡' },
    },
    type: /* 사용자 정의 속성명 */ {
      description: '로고 타입 (3개 값 중 하나를 사용해야 함)',
      defaultValue: { summary: 'color' },
      control: {
        type: 'select',
        options: ['colorful', 'mono', 'black'],
      }
    }
  }
}

export const Primary = (args) => <Logo {...args} />


// export const Primary = Template.bind({})
// export const Colorful = Template.bind({})
// export const Mono = Template.bind({})
// export const Black = Template.bind({})

// Primary 컴포넌트에 전달인자(args) 설정
// Colorful.args = {
//   title: '쿠팡 로고',
// }
// Mono.args = {
//   title: '쿠팡 로고',
// }
// Black.args = {
//   title: '쿠팡 로고',
// }
