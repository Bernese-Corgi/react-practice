import Heading from 'components/Heading/Heading';

export default function Header({ level, children, lang, ...restProps }) {
  return (
    <>
      <Heading level={1} lang={lang} children="To Do List" {...restProps} />
      <Heading level={2} lang={lang} children="This week" {...restProps} />
    </>
  );
}
