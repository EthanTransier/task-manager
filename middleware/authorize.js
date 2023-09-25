const authorize = (req,res,next) => {
    /* an example of how an api key can be used. NOT PROPER FOR REAL USE. */
    const {apiKey} = req.query
    if(apiKey==='ping'){
        console.log('Authorize Access Granted')
        req.user={name:'Jimmy Johns', id:123456}
        next()
    }else{
        console.log('Authorize Access Denied')
        res.send({results:[], status: 401, message: 'Access Denied'})
        next()
    }
} 

module.exports = authorize;