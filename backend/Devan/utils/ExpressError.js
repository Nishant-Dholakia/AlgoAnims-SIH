
class ExpressError extends Error{
    constructor(statusCode , msg){
        super();
        this.status = statusCode;
        this.message = msg;
    }
}


module.exports  = ExpressError