import { ReactComponent as Letter } from './images/letter.svg'
import { ReactComponent as Lock } from './images/lock.svg'
import { ReactComponent as Hide } from './images/hide.svg'
import { ReactComponent as Show } from './images/show.svg'

const FormIcon = ({ shape = 'letter', title = '아이디(이메일 주소)', ...restProps }) => {
  let Comp = null
  switch (shape) {
    case 'lock':
      Comp = Lock
      break;
    case 'hide':
      Comp = Hide
      break;
    case 'show':
      Comp = Show
      break;
    default:
    case 'letter':
      Comp = Letter
      break;
  }

  return <Comp title={title} {...restProps} />
}

export default FormIcon