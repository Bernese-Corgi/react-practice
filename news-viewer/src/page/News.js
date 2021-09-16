import React from 'react';
import { Categories, NewsList } from '../components';

const News = ({ match }) => {
  const category = match.params.category || 'all';

  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  );
};

export default News;
