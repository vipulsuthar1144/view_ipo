import { Provider } from "react-redux";
import AppRoutes from "./routes/App.routes";
import AppTheme from "./theme/AppTheme";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <AppRoutes />
      </AppTheme>
    </Provider>
  );
}

export default App;
