function Utils(){}
Utils.validate = function(obj)
{
    return (typeof obj == 'undefined'|| obj == null)? false : true ;
};
function Constants(){}
Constants.URL = "http://imagestore3.herokuapp.com";