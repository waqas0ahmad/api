module.exports = {
    log: (error) => {
        const logFileName = process.env.EX_LOG_FILE || "logs/api.exception.log";
        require("fs").appendFileSync(logFileName, "==========================================\n");
        require("fs").appendFileSync(logFileName, new Date().toDateString());
        require("fs").appendFileSync(logFileName, "\n");
        require("fs").appendFileSync(logFileName, JSON.stringify(error));
        // require("fs").appendFileSync(logFileName, error.name);
        // require("fs").appendFileSync(logFileName, ":\nMessage:\n");
        // require("fs").appendFileSync(logFileName, error.message);
        // require("fs").appendFileSync(logFileName, "\nDetails:\n");
        // require("fs").appendFileSync(logFileName, error.stack);
        require("fs").appendFileSync(logFileName, "\n\n");
    }
}