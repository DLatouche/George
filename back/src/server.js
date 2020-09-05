require('dotenv').config();
import app from './'

const port = process.env.PORT
const name = process.env.NAME

app.listen(port, () => {
    console.log(`Name: ${name}`);
    console.log(`Port: ${port}`);
});