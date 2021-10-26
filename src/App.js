import { Tabs } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import Character from './demos/character';
import MarQuee from './demos/marquee';
import Snake from './demos/snake';
import Qrcode from './demos/qrcode';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <Tabs tabPosition='left'>
          <TabPane tab="字符" key="1">
            <Character />
            <MarQuee />
            <Qrcode />
          </TabPane>
          <TabPane tab="贪吃蛇" key="2">
            <Snake />
          </TabPane>
        </Tabs>
    </div>
  );
}

export default App;
