import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import Providers from './providers/Providers.tsx';
import { router } from './pages/router.tsx';
import '@/app/assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Providers>
		<RouterProvider router={router} />
	</Providers>
);
