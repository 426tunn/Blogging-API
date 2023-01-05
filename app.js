const app = require('./index');
const {connectToDB} = require('./db');
const logger = require('./logging/logger');


const PORT = 4333;
connectToDB();

app.listen(PORT, ()=>{
 logger.info(`Server is running at PORT: ${PORT}`)
})

