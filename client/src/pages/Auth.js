import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {GET_USER_TODOS, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {tryLogin, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context)
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await tryLogin(login, password);
            } else {
                data = await registration(login, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(GET_USER_TODOS);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}>
            <Card style={{width: "600"}} className="p-5">
                <h2 className="m-auto" >{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder={isLogin ? "Введите логин" : "Придумайте логин"}
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder={isLogin ? "Введите пароль" : "Придумайте пароль"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"/>
                    <Row className="d-flex justify-content-between mt-2 pl-3 pr-3">
                        {isLogin ?
                            <div className="align-self-start mr-3">
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div className="align-self-start mr-3">
                                Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войди!</NavLink>
                            </div>}
                    </Row>
                </Form>
                <Button className="mt-2" variant={"outline-success"} onClick={click}>{isLogin ? "Войти" : "Создать аккаунт"}</Button>

            </Card>

        </Container>
    );
});

export default Auth;