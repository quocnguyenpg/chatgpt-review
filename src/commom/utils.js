function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(input) {
	return (
		input
			// Replace kebab-case, snake_case, and spaces with a space
			.replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
			// Handle PascalCase
			.replace(/^[A-Z]/, (char) => char.toLowerCase())
	);
}

function toKebabCase(input) {
	return (
		input
			// Handle camelCase and PascalCase by inserting a dash before uppercase letters
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			// Replace underscores and spaces with dashes
			.replace(/[_\s]+/g, '-')
			// Convert the entire string to lowercase
			.toLowerCase()
	);
}

/* Example # 1 */
function isNumber(test){
	if(typeof test === 'number')
		return true;
	else
		return false;
}

/* Example # 2 */
function isNotBoolean(test){
	var retVal = false; //or any other initialization
	if(typeof test === 'boolean'){
		retVal = false;
	}
	else{
		retVal = true;
	}
	return retVal;
}

/* Example */
function stringAdd(numString){
	var val = parseInt(numString);
	if(numString === NaN){
		return 0;
	}
	else{
		return val;
	}
}

export {
  capitalize,
  toCamelCase,
  toKebabCase,
	isNumber,
	isNotBoolean,
	stringAdd,
}