import { Provider } from "react-redux";
import AppRoutes from "./routes/App.routes";
import AppTheme from "./theme/AppTheme";
import { store } from "./store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Provider store={store}>
        <AppTheme>
          <AppRoutes />
        </AppTheme>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
