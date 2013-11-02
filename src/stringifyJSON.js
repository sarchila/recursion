// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  var finalString ;
  if (obj === undefined) {
  	finalString = "";
  } else if(Array.isArray(obj)){
  	var reducedStr = _.reduce(obj, function(str,elem,ind){
  		if (ind==0){
  			return str + stringifyJSON(elem);
  		} else {
  			return str + "," + stringifyJSON(elem);
  		}
  	}, "");
  	finalString = "[" + reducedStr + "]";
  } else if (typeof(obj)=="string") {
  	finalString = "\"" + obj + "\""
  } else {
  	finalString = obj + "";
  }
  return finalString;
};
