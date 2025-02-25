import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { queryClient } from "./services/QueryClient.ts";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactQueryDevtools } from "react-query-devtools";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="856144354818-hrot573bj8lmbod786pla96i3lsj7rsf.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} />; */}
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
