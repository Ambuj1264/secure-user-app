const cors = require("cors");

const allowedDomains = ["https://api.example.com"];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedDomains.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

exports.corsMiddleware = cors(corsOptions);
