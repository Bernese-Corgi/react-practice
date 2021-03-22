import './Logo.scss'
import { ReactComponent as ColorfulLogo } from '../../assets/UI/logo/colorful.svg'
import { ReactComponent as MonoLogo } from '../../assets/UI/logo/mono.svg'
import { ReactComponent as BlackLogo } from '../../assets/UI/logo/black.svg'

const Logo = ({ type, title = "쿠팡", ...restProps }) => {
  return (
    <>
      {type === "colorful"
        ? <ColorfulLogo title={title} />
        : (type === 'mono'
          ? (<MonoLogo title={title} />)
          : (<BlackLogo title={title} />))
      }

      {/* className={`logo ${className}`.trim()} */}
    </>
  )
}

Logo.defaultProps = {
  title: '쿠팡'
}

export default Logo