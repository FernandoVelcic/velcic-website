import Header from './Header';
import Console from './Console'

const App = () => (
  <div class="flex flex-col h-screen">
    <Header></Header>
    <div class="bg-manjaro bg-center p-5 h-full sm:p-20">
      <Console></Console>
    </div>
  </div>
);

export default App;
