
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import AuthProvider from './contexts/AuthProvider.jsx';
import './index.css';
import router from './router/Router.jsx';

// tankstack
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

  const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
<QueryClientProvider client={queryClient}>
<RouterProvider router={router} />
    </QueryClientProvider>

</AuthProvider>


);
