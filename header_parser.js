'use strict';

var get_ipaddress = function(headers) {
    
    var xforfor = headers['x-forwarded-for'];
    var ip = xforfor.slice(0, xforfor.indexOf(','));
    
    return ip;
}

var get_language_preferences = function(headers) {
    
    var accept_lang = headers['accept-language'];
    var lang_array = accept_lang.split(',');
    
    var preferences = lang_array.map(function(entry) {
        var obj = {};
        var split = entry.indexOf(';');
        if (split == -1) {
            obj.lang = entry;
            obj.qual = 1;
        } else {
            obj.lang = entry.slice(0, split);
            obj.qual = Number(entry.slice(entry.indexOf('=') + 1));
        }
        return obj;
    });
    
    return preferences;
    
}

var get_first_language = function(headers) {
    
    var prefs = get_language_preferences(headers);
    
    var sorted = prefs.sort(function(a, b) {
        return b.qual - a.qual;
    });
    
    return sorted[0].lang;
}

var get_software = function(headers) {
    
    return headers['user-agent'];
    
}


var parse_header = function(header) {
    
    var info = {};
    
    info.ipaddress = get_ipaddress(header);
    info['language'] = get_first_language(header);
    info['language-full'] = get_language_preferences(header);
    info.software = get_software(header);
    
    return info;
    
}

module.exports.parse_header = parse_header;