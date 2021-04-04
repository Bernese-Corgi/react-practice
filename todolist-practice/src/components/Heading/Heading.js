import React from 'react';

export default function Heading({ level, children, lang, ...restProps }) {
  return React.createElement(`h${level}`, {
    children,
    lang,
    ...restProps,
  });
}
