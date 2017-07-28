var watchProp = function(object, prop, callback) {
    /// watches the specified property on the specified object
    /// callback executes when the property value changes changes
    /// The callback is passed the object
    object.watchHolder = object[prop];
    if (Object.defineProperty) {
        Object.defineProperty(object, prop, {set: function(x){
            this.watchHolder = x;
            callback(this);
        }, get: function(){
            return this.watchHolder;
        }});
    } else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) {
        object.__defSetter__(prop, function(x){
            this.watchHolder = x;
            callback(this);
        });
        object.__defGetter__(prop, function(){
            return this.watchHolder;
        });
    }
}
