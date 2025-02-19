import { Routes,Route} from "react-router-dom";
import Lobby from "./screens/Lobby";
import RoomPage from "./screens/Room";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="room/:roomid" element={<RoomPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
