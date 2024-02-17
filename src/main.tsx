import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { queryClient } from './services/QueryClient.ts'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        
        <App />
        
      </BrowserRouter>
    </QueryClientProvider>,
)
