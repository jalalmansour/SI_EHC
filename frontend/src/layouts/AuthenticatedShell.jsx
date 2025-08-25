import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

// --- Your Components ---
import Sidebar from '../components/navigation/SideBar.jsx'; // Adjust path if necessary
import Navbar from '../components/navigation/NavBar.jsx';
import {selectCurrentUser} from "../redux/slices/authSlice.js";
import {logout} from "../redux/thunks/authThunks.js";   // Adjust path if necessary

// --- Redux Actions ---

const { Content } = Layout;

export function AuthenticatedShell() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // 1. Get user data from your Redux store
    const user = useSelector(selectCurrentUser);

    // 2. Define the navigation handler for the Sidebar
    // The `item` object is passed by Ant Design's Menu component
    const handleMenuClick = (item) => {
        // `item.key` is the value you defined in your Sidebar's menu items (e.g., "dashboard", "clients-list")
        // We construct the path based on the user's role and the key.
        const basePath = `/${user?.role?.name.toLowerCase().replace(' ', '-')}`;
        navigate(`${basePath}/${item.key}`);
    };

    // 3. Define the logout handler for the Navbar
    const handleLogout = () => {
        dispatch(logout());
    };

    const currentPathKey = location.pathname.split('/').pop();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar
                userRole={user?.role?.name.toLowerCase()}
                currentPath={currentPathKey}
                onMenuClick={handleMenuClick}
            />

            <Layout>
                <Navbar
                    user={user}
                    onLogout={handleLogout}
                />

                <Content style={{ padding: '24px', background: '#f0f2f5' }}>
                    <Outlet />
                </Content>
            </Layout>

        </Layout>
    );
}