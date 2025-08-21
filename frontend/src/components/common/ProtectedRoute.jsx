import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchMe } from '../../redux/thunks/authThunks.js';
import {Spin} from "antd";

function ProtectedRoute({ children }) {
    const dispatch = useDispatch();

    const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(fetchMe());
        }
    }, [dispatch, isAuthenticated, user]);

    if (isLoading) {
        return <Spin />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default memo(ProtectedRoute);
