import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(201).send({
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        if (req.role === "admin") {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send("Account has been deleted successfully...");
        } else {
            return next(createError(404, "Only admin can delete a user..."));
        }
    } catch (error) {
        next(error);
    }
};
