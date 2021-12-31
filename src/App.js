import Header from './Header';
import Console from './Console'

const App = () => (
  <div class="flex flex-col h-screen">
    <Header></Header>
    <div class="bg-manjaro bg-center pt-5 px-5 pb-16 sm:p-20 h-full">
      <Console></Console>
    </div>
  </div>
);

export default App;
