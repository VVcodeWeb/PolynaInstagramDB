const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
    })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
module.exports = mongoose