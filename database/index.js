const mongoose = require('mongoose');
const env = require(`../environment/${process.env.NODE_ENV}`)

const connectToDatabase = async () => {
    try {
        await mongoose.connect(env.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connexion a la db etablie")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDatabase;