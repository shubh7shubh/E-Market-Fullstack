import mongoose from 'mongoose';

export const connectDb = async () => {
    mongoose.connect("mongodb+srv://emarket24:senpai69@cluster0.beob0mj.mongodb.net/", {
        dbName: 'E-market_24',
    }).then(c => console.log(`Db connected to ${c.connection.host}`))
}