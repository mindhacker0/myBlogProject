class ResponseObject{
    constructor({result,errors=null}){
        this.result = result || null;
        this.isSuccess = errors?false:true;
        this.errors = errors;
    }
}

module.exports = ResponseObject;