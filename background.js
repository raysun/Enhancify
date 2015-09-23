chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {  
    var headers = details.requestHeaders;
    var refererExists = false;
    var refererUrl;
    var isNYT = false;

    if (details.url.match(/nytimes/g) == null) {
        refererUrl = "https://www.google.com";
    } else {
        refererUrl = "https://www.twitter.com";
        isNYT = true;
    }

    for (var i = 0; i < headers.length; i++) {        
        if (!isNYT && headers[i].name == "Cookie") {
            headers[i].value = '';
        }
        if (headers[i].name == "Referer") {
            headers[i].value = refererUrl;
            refererExists = true;
        }
    }

    if (!refererExists) {
        headers.push({
            name: "Referer",
            value: refererUrl
        });
    }

    return {
        requestHeaders: headers
    };
}, {
    urls: ["<all_urls>"]
}, ["requestHeaders", "blocking"]);
