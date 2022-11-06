const app = require('./index');
const {connectToDB} = require('./db');


const PORT = 4333;
connectToDB();

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT: ${PORT}`)
})

