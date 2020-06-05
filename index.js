const express = require("express");
const app = express();
const http = require("http").createServer(app);
require('dotenv').config();
const routes = require("./src/routes");
const cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser');
const router = express.Router();
const swaggerUi=require("swagger-ui-express");
const swaggerDocs=require("./swagger.json");
app.use(cors());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/images');
    },
    filename: async (req, file, cb) => {

        try {
            const fileName = require("./src/helper/misc.helper").makeid(40) + ".png";
            cb(null, fileName);

        } catch (e) {
            throw e;
        }
    }
});
const upload = multer({ storage });
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + "/public"));
app.use("/api", [cors(), upload.single("Image")], routes);
app.use("/",swaggerUi.serve,swaggerUi.setup(swaggerDocs));
const port = process.env.LOCAL_PORT || 3002;
http.listen(port, () => {
    console.log('started listening at http://localhost:' + port + "/");
});