
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}


export default function customTransport (props){
    try{
        var existingLogs=localStorage.getObj('logs') || [];
        existingLogs.push("\n"+props.msg);
        localStorage.setObj('logs',existingLogs);
    }catch(error){
        console.error('error saving logs',error);
    }
}


   