const mongose = require("mongoose")
const Schema = mongose.Schema;


const Art = new Schema({
    subject: String,
    allSubject: String
});

const Arty = mongose.model("Arty", Art)

module.exports = Arty;

