import mongoose from "mongoose"

const connectionDatabase = () => {
    mongoose.connect("mongodb://sena:sena@cluster0-shard-00-00.vlbt6.mongodb.net:27017,cluster0-shard-00-01.vlbt6.mongodb.net:27017,cluster0-shard-00-02.vlbt6.mongodb.net:27017/questions?ssl=true&replicaSet=atlas-9wutgr-shard-0&authSource=admin&retryWrites=true&w=majority", {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
        .then(() => {
            console.log('connected');
        })
        .catch((err: Error) => {
            console.log('err', err)
        })
}

export {connectionDatabase};
