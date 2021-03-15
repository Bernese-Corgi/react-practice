import Button from './Button'

export default {
  title: 'Form/Button',
  Component: Button,
  argsTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['Primary', 'Secondary'],
      },
    },
    disabled: {
      control: {
        type: 'select',
        options: [true, false]
      }
    }
  },
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
export const Secondary = Template.bind({})

Primary.args = {
  mode: 'Primary',
  disabled: false,
}

Secondary.args = {
  mode: 'Secondary',
  disabled: false,
}