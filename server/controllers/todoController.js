const ApiError = require('../error/ApiError');
const { Todo, User} = require('../models/models');

class todoController {

    async create(req, res, next) {
        try {
            const { title } = req.body;
            const user_id = req.user.id;

            if (!title || !title.trim()) {
                return next(ApiError.badRequest('Title is required'));
            }

            const todo = await Todo.create({
                title: title.trim(),
                user_id
            });

            return res.status(201).json(todo);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const user_id = req.user.id;

            const deletedCount = await Todo.destroy({
                where: { id, user_id }
            });

            if (!deletedCount) {
                return next(ApiError.badRequest('Todo not found'));
            }

            return res.json({ message: 'Deleted' });

        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const user_id = req.user.id;

            const todos = await Todo.findAll({
                where: { user_id }
            });

            return res.json(todos);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new todoController();