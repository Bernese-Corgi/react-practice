import { useCallback, useState } from 'react';
import { Categories, NewsList } from './components';

function App() {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);
  return (
    <div>
      <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} />
    </div>
  );
}

export default App;
