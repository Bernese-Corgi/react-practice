import Checkbox from "./Checkbox";

export default {
  title: 'Form/Checkbox',
  Component: Checkbox,
  argsTypes: {
    checked: {
      control: {
        type: 'check',
        options: [true, false]
      },
    },
    disabled: {
      control: {
        type: 'radio',
        options: [true, false]
      },
    },
  },
}

const Template = (args) => <Checkbox {...args} />

export const Checked = Template.bind({})
export const Unchecked = Template.bind({})
export const CheckedDiabled = Template.bind({})
export const UncheckedDisabled = Template.bind({})

Checked.args = {
  checked: true,
  disabled: false,
}

Unchecked.args = {
  checked: false,
  disabled: false,
}

CheckedDiabled.args = {
  checked: true,
  disabled: true,
}

UncheckedDisabled.args = {
  checked: false,
  disabled: true,
}

