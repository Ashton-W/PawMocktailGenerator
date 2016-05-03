var Mocktail = function() {

	this.generate = function(context) {
		var exchange = context.getCurrentRequest().getLastExchange();

		if (exchange == undefined) {
			return "No Reponse to convert.";
		}

		var result = "";
		var httpMethod = /[A-Z]+\b/.exec(exchange.requestHeaderString);
		result += httpMethod + "\n";
		var urlComponents = this.parseUrl(exchange.requestUrl);
		result += urlComponents.path;
		if (urlComponents.query !== undefined) {
			result += "?" + urlComponents.query;
		}
		if (urlComponents.hash !== undefined) {
			result += "#"
		}
		result += "\n";
		result += exchange.responseStatusCode + "\n";
		result += "\n" + exchange.responseBody;

		return result;
	};

	/* URL parser taken from JavaScript: The Good Parts by Douglas Crockford */
	this.parseUrl = function(url) {
		var urlRegex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
		var result = urlRegex.exec(url);
		var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
		var components = {};
		var i;
		for (i = 0; i < names.length; i += 1) {
			components[names[i]] = result[i];
		}
		return components;
	};
};

Mocktail.identifier = "net.Ashton-W.Mocktail";
Mocktail.title = "Mocktail";
Mocktail.fileExtension = "tail";

registerCodeGenerator(Mocktail);
