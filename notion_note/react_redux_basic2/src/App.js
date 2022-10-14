import { Provider } from "react-redux";
import Count from "./components/Count";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Count />
      </Provider>
    </div>
  );
}

export default App;
