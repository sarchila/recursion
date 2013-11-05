// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:


var getElementsByClassName = function (className, currentNode, arr) {
	if (arguments.length<2) {
		var currentNode = document.body;
		var arr = [];
	};

	if (_.contains(currentNode.classList, "targetClassName")){
		arr.push(currentNode);
	}

	_.each(currentNode.childNodes, function(childNode){
		getElementsByClassName(className,childNode,arr);
	});

	return arr;
};
