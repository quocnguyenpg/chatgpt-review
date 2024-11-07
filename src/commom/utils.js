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

export {
  capitalize,
  toCamelCase,
  toKebabCase
}