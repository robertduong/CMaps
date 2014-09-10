function fAmpleSDK_comOnLoad() {
	// prettify
	prettyPrint();
};

if (window.attachEvent)
	window.attachEvent("onload", fAmpleSDK_comOnLoad);
else
	window.addEventListener("load", fAmpleSDK_comOnLoad, false);