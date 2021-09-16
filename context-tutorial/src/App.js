import { ColorBox, SelectColor } from './components';
import { ColorProvider } from './contexts/color';

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColor />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
