# ABC inventory management Apis
  Express backend for ABC inventory management module API server built using ```TypeScript```, ```Express.JS```, ```Passport.js```, ```mongoose```

# Features

  * Google Authentication (OAuth.20) using ```Passport.JS```
  * Custom built logger includes:
    * ```newLine()``` - Logs a line gap
    * ```horizontalRule()``` - Logs a horizontal rule
    * ```log()``` - Standard log
    * ```logInfo()``` - Logs info message
    * ```logError()``` - Logs errors    
  * Middleware ```httpLogger()``` to log http request & response with customizable detail
  * Model-Controller architecture

# Setup Instructions

  * Download or clone the repo
  * Open console in root directory
  * Do ```npm i``` OR ```npm install``` to install dependencies
  * *Create and use .env file with following keys:*
    * ```GOOGLE_CLIENT_ID```
    * ```GOOGLE_CLIENT_SECRET```
    * ```DB_NAME```
    * ```MONGO_URI```
    * ```COOKIE_KEY```
    * ```PORT```
  
# Scripts

  * ```npm start``` OR ```npm run dev``` to run the application
  
 
