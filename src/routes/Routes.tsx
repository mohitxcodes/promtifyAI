import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ChatPage from '../pages/chat/ChatPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,

    },
    {
        path: '/get-started',
        element: <ChatPage />
    }
]);

export default router;