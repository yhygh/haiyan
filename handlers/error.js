function errorHandler(error, request, response, next) {
	console.log(`errorHandler server side: error: ${error}`);
	// console.log(error);
	// console.log(error.stack);
	return response.status(error.status || 500).json({
		error: {
			message: error.message || 'Oops! Something went wrong on the server side.'
		}
	});
}

module.exports = errorHandler;
