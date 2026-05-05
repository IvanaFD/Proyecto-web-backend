const errorHandler = (err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "La imagen no puede superar 1MB" });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ error: "Campo de archivo inesperado" });
    }
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Internal server error" });
};

module.exports = errorHandler;