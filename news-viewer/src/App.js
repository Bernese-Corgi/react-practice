import axios from 'axios';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const handleClick = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=kr&category=science&apiKey=656e5f6ee4c24324a79ec250c2aec539',
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={handleClick}>불러오기</button>
      {data && (
        <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly />
      )}
    </>
  );
}

export default App;
