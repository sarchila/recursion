// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  var finalString ;
  if (obj === undefined || typeof(obj)==="function") {
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
  } else if (typeof(obj)==="object" && !Array.isArray(obj) && obj != null){
  	var firstTime = true;
  	var reducedStr = _.reduce(obj, function(str,elem,ind){
  	 	if (stringifyJSON(elem) === ""){
  	 		firstTime = false;
  	 		return str + "";
  	 	} else if (firstTime){
  			firstTime = false;
  			return str + stringifyJSON(ind) + ":" + stringifyJSON(elem);
  		} else {
  			return str + "," + stringifyJSON(ind) + ":" + stringifyJSON(elem);
  		}  		
  	}, "");
  	finalString = "{" + reducedStr + "}";
  } else if (typeof(obj)=="string") {
  	finalString = "\"" + obj + "\""
  } else {
  	finalString = obj + "";
  }
  return finalString;
};
