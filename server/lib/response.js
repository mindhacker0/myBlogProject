class ResponseObject{
   constructor({result}){
       this.result = result || {};
       this.isSuccess = "true";
       this.errors = null;
   }
}

module.exports = ResponseObject;