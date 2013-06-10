//http://blackbe.lt/safely-handling-json-hijacking-prevention-methods-with-jquery/
/*
test methods to stop execution:


any illegal characters
throw <anything that isnt nothing>;
throw("your message here");
throw false; = throw""; = throw(""); = throw 0; = throw(0); = throw(null); = throw(undefined);//no exception message but stops execution



throw 1;
for(;;);
while(true);
while(1);
//
*/

(function($)
{
	"use strict";//Should we use this?  jQuery itself doesn't due to bugs.

	if ($.jsonProtect)//Prevent double-loading.
		return;
	$.jsonProtect = true;

	$.fn.jsonProtect = function

	//Would it be better to do this using converters instead of dataFilter?
	//Setting another dataFilter kills this one.
	//Expose this funcionality and tell them to use it in the docs?
	$.ajaxSetup({
		dataFilter: function(data, type)
		{
			if (type === "json" || type === "jsonp")
				return data.replace(/^\s*(?:\/{2,}|(?:while\s*\(\s*(?:1|true)\s*\)|for\s*\(\s*;\s*;\s*\)|throw\s*[^;])\s*;)/g, "").trim();
			return data;
		}
	});
}(jQuery));