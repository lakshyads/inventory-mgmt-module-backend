// Import modules
import express, { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';

// Use passport service
import './services/usePassport';

// Import utils
import dateTimestamp from './utils/dateTimeUtil'
import { newLine, logError, horizontalRule } from './utils/loggerUtil';
import httpLogger from './utils/middlewares/httpLogger';

// Connect DB
mongoose.connect(process.env.MONGO_URI ?? '', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error)
        logError('MongoDB connection Failed', error.message);
    else
        log(`${chalk.grey(`[${dateTimeStamp()}]`)} ${chalk.bold(`{MongoDB} Connected to DB: `)}`, process.env.DB_NAME);
});

// Initialize server
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(httpLogger);
server.use(session({
    secret: process.env.COOKIE_KEY ?? "Our little secret.",
    resave: false,
    saveUninitialized: false,
}));
server.use(cookieParser(process.env.COOKIE_KEY));

// Use Passport
server.use(passport.initialize());
server.use(passport.session());// usePassport();



// Auth Routes
require('./routers/userRouter')(server);


// Import routers
import HealthRouter from './routers/healthRouter';
import ItemRouter from './routers/itemRouter';
import CategoryRouter from './routers/categoryRouter';
import { log } from 'console';
import dateTimeStamp from './utils/dateTimeUtil';

// Use routers
server.use(ItemRouter);
server.use(CategoryRouter);
server.use(HealthRouter);

server.get('/api', (req, res) => {
    res.send(`Welcome to ABC inventory management API, please go to /auth/google for user authentication`);
});

// Handler for 404 - Resource Not Found
server.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Resource Not Found!');
});

// Handler for 500
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send('Connection Error!');
});

// Start the server
const port = process.env.PORT ?? 3000;
server.listen(port, () => {
    newLine();
    horizontalRule();
    console.log(`${chalk.grey(`[${dateTimestamp()}]`)} ${chalk.bold.magenta('Server is running on port')}`, port);
})

// Exports --------------------------------------------------------------------
export { server };
