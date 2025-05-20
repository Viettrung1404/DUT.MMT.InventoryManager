import { Router } from "express";

const router = Router();

router.use((err, req, res, next) => {
    if(!err.statusCode) {
        err.statusCode = 500;
    }
    const errorResponse = {
        status: err.statusCode,
        message: err.message || 'Internal server error',
        stack: err.stack
    }

    res.status(err.statusCode).json(errorResponse);
});

export default router;