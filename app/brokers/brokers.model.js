module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        brokerEmail: String,
        brokerLastName: String,
        brokerFirstName: String
        
       
        
      },

      { timestamps: true }
    );

  
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Broker = mongoose.model("broker", schema);
    return Broker;
  };
  
  