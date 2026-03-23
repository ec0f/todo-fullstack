import {CREATE_TODOS, GET_USER_TODOS, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import Todos from "./pages/Todos";

export const authRoutes = [
    {
        path: GET_USER_TODOS,
        Component: Todos
    },
    {
        path: CREATE_TODOS,
        Component: Todos
    }
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]