module.exports = function check(str, bracketsConfig) {
  // your solution
	if (str.length%2 != 0 || str.length == 0) return false;
	var openingBracks = [];
	var closingBracks = [];
	for (var i = 0; i < bracketsConfig.length; i++) {
		openingBracks.push(bracketsConfig[i][0]);
		closingBracks.push(bracketsConfig[i][1]);
	}
	
	var strArray = str.split("").reverse();
	var brackStack = new Stack();
	
	while (strArray.length > 0) {
		var bracket = strArray.pop();
		if (openingBracks.indexOf(bracket) == -1 && closingBracks.indexOf(bracket) == -1) return false;
		var brOpenIndex = openingBracks.indexOf(bracket);
		var brCloseIndex = closingBracks.indexOf(bracket);
		if (openingBracks[brOpenIndex] == closingBracks[brCloseIndex]) {
			if (brackStack.peek() == bracket) {
				brackStack.pop();
				continue;
			}
			else {
				brackStack.add(bracket);	//otherwise add bracket to stack
				continue;
			}
		}
		if (openingBracks.indexOf(bracket) > -1) {	//if the bracket is opening
			if (strArray.length == 0) {	//if an opening bracket in the last in str, return false
				return false;
			}
			brackStack.add(bracket);	//otherwise add bracket to stack
			continue;
		}
		if (closingBracks.indexOf(bracket) > -1) {	//if the bracket is closing
			if (brackStack.length() == 0) {	//if stack is empty, return false
				return false;
			}
			if (brackStack.peek() != openingBracks[brCloseIndex]) {
				return false;
			}
			else {
				brackStack.pop();
			}
		}
	}
	
	return (brackStack.length() == 0) ? true : false;
}

function Stack() {
	this.dataStore = [];
	this.top = 0;
	this.add = add;
	this.peek = peek;
	this.pop = pop;
	this.length = length;
}

function add(element) {
	this.dataStore[this.top++] = element;
}

function peek() {
	return this.dataStore[this.top-1];
}

function pop() {
	return this.dataStore[--this.top];
}

function length() {
	return this.top;
}
