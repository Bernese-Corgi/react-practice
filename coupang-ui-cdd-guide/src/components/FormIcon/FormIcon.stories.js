import FormIcon from './FormIcon'

export default {
  title: 'Form/Icon',
  component: FormIcon,
  argTypes: {
    shape: {
      control: {
        type: 'select',
        options: ['letter', 'lock', 'hide', 'show'],
      },
    },
  },
}

const Template = (args) => <FormIcon {...args} />

export const Letter = Template.bind({})
export const Lock = Template.bind({})
export const Hide = Template.bind({})
export const Show = Template.bind({})

Letter.args = {
  shape: 'letter',
  title: '아이디(이메일 주소)'
}

Lock.args = {
  shape: 'lock',
  title: '비밀번호'
}

Hide.args = {
  shape: 'hide',
  title: '비밀번호 숨김'
}

Show.args = {
  shape: 'show',
  title: '비밀번호 보기'
}