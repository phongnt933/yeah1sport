import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AppRouter from "./routes";
import { ConfigProvider } from "antd";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AYYq8dB9Fk40a7r12BmpWh9SQq_YaJyVqG4CiwZdF3RwRSIV7_N-o--KPq1eA88l2142o_eTaR1ifNm6",
        components: "buttons",
        currency: "USD",
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            fontFamily:
              '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          },
          components: {
            Typography: {
              titleMarginBottom: 0,
            },
          },
        }}
      >
        <AppRouter />
      </ConfigProvider>
    </PayPalScriptProvider>
  );
}

export default App;
