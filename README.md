# ABC inventory management Apis
  Express backend for ABC inventory management module API server built using TS

# Features

  * Custom built logger includes:
    * ```newLine()``` - Logs a line gap
    * ```horizontalRule()``` - Logs a horizontal rule
    * ```log()``` - Standard log
    * ```logInfo()``` - Logs info message
    * ```logError()``` - Logs errors    
  * Middleware ```httpLogger()``` to log http request & response
  * Model-Controller architecture
  * Provision to use ```EJS``` to render templates/ dynamic HTML

# Setup Instructions

  * Download or clone the repo
  * Open console in root directory
  * Do ```npm i``` OR ```npm install``` to install dependencies
  * Create and use .env file with following keys:
    * ```Google creds```
    * ```GOOGLE_CLIENT_ID```
    * ```GOOGLE_CLIENT_SECRET```
    * ```DB_NAME```
    * ```MONGO_URI```
    * ```COOKIE_KEY```
    * ```PORT```
  
# Scripts

  * ```npm start``` OR ```npm run dev``` to run the application
  
 
