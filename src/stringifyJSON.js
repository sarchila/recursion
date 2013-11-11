// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  var finalString;

  // Break up obj into different data types

  // undefined and function types stringify to nothing
  if (obj === undefined || typeof(obj)==="function") {
  	finalString = "";
  }

  //  array strings are built up using reduce, where the iterator
  //  function builds the reduced string by either adding the
  //  recursive call on the first indexed element OR by adding a
  //  comma string and then the recursive call.  Finally, the reduced
  //  string is wrapped in brackets to create the final string.
  else if(Array.isArray(obj)){
  	var reducedStr = _.reduce(obj, function(str,elem,ind){
  		if (ind==0){
  			return str + stringifyJSON(elem);
  		} else {
  			return str + "," + stringifyJSON(elem);
  		}
  	}, "");
  	finalString = "[" + reducedStr + "]";
  }

  // object types that are not arrays and are not null
  else if (typeof(obj)==="object" && !Array.isArray(obj) && obj != null){
  	
  	// built similar to the array branch, but using curly braces and,
  	// because objects don't have zeroth indexed elements, I instead
  	// created a firstTime variable that will only be true once.
  	// This allows me to add the comma string to every other key-value
  	// pair but the first one.  I added a rule for objects that I
  	// observed from JSON.stringify, which is that key-value pairs
  	// whose values stringify to nothing are not included
  	// in the final string, so first IF branch takes care of that.
  	var firstTime = true;
  	var reducedStr = _.reduce(obj, function(str,value,key){
  	 	if (stringifyJSON(value) === ""){
  	 		firstTime = false;
  	 		return str + "";
  	 	} else if (firstTime){
  			firstTime = false;
  			return str + stringifyJSON(key) + ":" + stringifyJSON(value);
  		} else {
  			return str + "," + stringifyJSON(key) + ":" + stringifyJSON(value);
  		}  		
  	}, "");
  	finalString = "{" + reducedStr + "}";
  }

  // strings have quotes added around them
  else if (typeof(obj)=="string") {
  	// add backslash before backslash symbol
  	obj = obj.split('\\').join('\\\\');
  	// add backslash before quote symbol
  	obj = obj.split('"').join('\\"');
  	// stringify with \r
  	obj = obj.split('\r').join('\\r');
  	// stringify with \n
  	obj = obj.split('\n').join('\\n');
  	// stringify with \t
  	obj = obj.split('\t').join('\\t');
  	finalString = "\"" + obj + "\""
  }

  // primitives, booleans, etc are stringified as-is
  else {
  	finalString = obj + "";
  }

  // Lastly, return the final string
  return finalString;
};
