import Heading from 'components/Heading/Heading';

export default function Header({ level, children, lang, ...restProps }) {
  return (
    <Heading level={level} lang={lang} children={children} {...restProps} />
  );
}
