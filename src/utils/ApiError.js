class ApiError extends Error{
    constructor(
        status,
        message="something went wrong",
        error=[]
    ){
        super(message)
        this.status=status,
        this.data=null
        this.message=message
        this.success=false
        this.error=error
    }

}

export {ApiError}