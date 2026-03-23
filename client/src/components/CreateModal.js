import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../index";
import {createTodo} from "../http/todoAPI";

const CreateModal = ({show, onHide}) => {
    const {todos} = useContext(Context)
    const [title, setTitle] = useState("")


    const addTodo = async () => {
        try {
            if (!title.trim()) {
                return;
            }

            const data = await createTodo(title.trim());
            todos.addTodo(data);
            setTitle("");
            onHide();
        } catch (e) {
            console.log(e.response?.data || e.message);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить to-do
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"Введи задачу"} value={title} onChange={e => setTitle(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-info" onClick={addTodo}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateModal;