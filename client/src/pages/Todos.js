import React, {useContext, useEffect, useState} from 'react';
import { Button, Card, Container } from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CreateModal from "../components/CreateModal";
import {delTodo, getAll} from "../http/todoAPI";

const Todos = observer(() => {

    const [todoVisible, setTodoVisible] = useState(false);
    const {todos} = useContext(Context);

    useEffect(() => {
        getAll().then(data => {
            todos.setTodos(data);
        });
    }, []);

    const deleteTodoHandler = async (id) => {
        try {
            await delTodo(id);
            todos.deleteTodo(id);
        } catch (e) {
            console.log(e.response?.data || e.message);
        }
    };

    return (
        <Card border="dark" className="p-4 m-2 align-self-center">
            <Card.Title className="align-self-center">Мои to-do</Card.Title>
            <Container>
                <Button variant="outline-info" onClick={() => setTodoVisible(true)}>Добавить to-do</Button>
                {todos.todos.map(todo =>
                    <Card bg="light" border="success" className="mt-2" key={todo.id}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <Card.Text className="mb-0">
                                {todo.title}
                            </Card.Text>
                            <Button variant="outline-danger" onClick={() => deleteTodoHandler(todo.id)}>Удалить</Button>

                        </Card.Body>
                    </Card>
                )}
                <CreateModal show={todoVisible} onHide={() => setTodoVisible(false)} ></CreateModal>
            </Container>
        </Card>
    );
});

export default Todos;