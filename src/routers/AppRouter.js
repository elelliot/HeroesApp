import { Routes, Route,BrowserRouter } from "react-router-dom";

import { LoginScreen } from '../components/login/LoginScreen';

import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    return (
        <BrowserRouter>

            <Routes>

                {/* <Route path="/login" element={ <LoginScreen /> } /> */}
                <Route path="/login" element = { 
                        <PublicRoute>
                            <LoginScreen />
                        </PublicRoute>                
                    }
                />

                {/* PrivateRoute es higher order comp. y verifica si el user esta auth o no, y si está auth, usa el DashBoardRoutes */}
                <Route path="/*" element= { 
                        <PrivateRoute> 
                            <DashboardRoutes />
                        </PrivateRoute>
                    } 
                />

                {/* <Route path="/*" element= { <DashboardRoutes /> } /> */}
                
            </Routes>
        </BrowserRouter>
    )
}

