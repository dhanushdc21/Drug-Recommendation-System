import mongoose from 'mongoose';
console.log('Actual Connection String:', process.env.DB_URL);


const connect =()=>{
    console.log('DB_URL:', process.env.DB_URL);

    mongoose.connect(
        process.env.DB_URL, // importing mongodb connection url
        {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true
        }
    ).then(console.log('Connected to db')).catch((err)=>console.log(err))   
}
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

export default connect;