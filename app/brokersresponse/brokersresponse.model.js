module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        brokerName: String,
        userId: String,
        attachment: String,
        status : String,
        
       
        
      },

      { timestamps: true }
    );

  
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Response = mongoose.model("response", schema);
    return Response;
  };
  
  