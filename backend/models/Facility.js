const mongoose = require("mongoose");

const facilitySchema = mongoose.Schema(
{
  name:String,

  type:{
    type:String,
    enum:["pickleball","cricket"]
  },

  status:{
    type:String,
    default:"active"
  }
}
);

module.exports = mongoose.model(
  "Facility",
  facilitySchema
);