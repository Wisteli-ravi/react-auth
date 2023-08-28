import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { NotFoungPage } from './NotFoundPage';
import { DashboardPage } from './DashbaordPage';
import { LoginPage } from './LoginPage';
import { UserPage } from './UsersPage';
 
export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" Component={DashboardPage} />
            <Route path='/login' Component={LoginPage} />
            <Route path='/user' Component={UserPage} />
            <Route path="*" Component={NotFoungPage} />
            </Routes>
        </Router>
    )
}
