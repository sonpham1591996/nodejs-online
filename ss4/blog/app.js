const express = require("express");
const path = require("path");
const rootRouter = require("./routes");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
const handleError = require("./middlewares/error");
const connectToMongoDB = require("./config/mongodbConnection");

connectToMongoDB()
  .then(() => {
    console.log("Connected to MongoDB");

    // optional
    require('./model/blogsModel');

    // Init app
    const app = express();

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });

    // Set view engine
    app.set("view engine", "ejs");
    // Set path of views directory which includes view files
    app.set("views", path.resolve(__dirname, "views"));

    /**
     * - bodyParser
     * Middleware được đăng ký với phương thức `use` của đối tượng `app`.
     * express.urlencoded là một built-in middleware trong Express
     * được sử dụng để parse dữ liệu được gửi lên từ client dưới dạng URL-encoded và trả về kết quả trong đối tượng req.body.
     */
    app.use(express.urlencoded({ extended: false })); // req.body = <parsed data>
    app.use(express.json());

    // Middle - Application-level Middleware
    // app.use(rootRouter);

    // NOTE: logging (logger) request information
    // app.use((req, res, next) => {
    //   console.log('method = ' + req.method + " || url = " + req.url);
    //   // Write file
    //   next();
    // });

    // NOTE: Write log into file
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, "access.log"),
      {
        flags: "a",
      }
    );

    // NOTE: Third-party middle
    app.use(morgan("combined", { stream: accessLogStream }), helmet(), limiter);
    // app.use(helmet());
    // app.use(limiter);

    // Consider to the order of middlewares
    // app.use((req, res, next) => {
    //   if (req.url === '/') return res.end();
    //   next();
    // });

    // Setup swagger ui for web service
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use("", rootRouter);

    // Error handling middleware
    app.use(handleError);

    app.disable("x-powered-by");

    const PORT = 3000;

    app.listen(PORT, () => {
      console.log("server is running...");
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
