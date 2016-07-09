var mail = function (emailPost) {
	var re = /\S+@\S+\.\S{2,8}/;
	return re.test(emailPost);
}

var pass = function (passwordPost) {
	var reAlphaMin = /[a-Z]/;
	var reSpe = /[,;:=?.]/;
	var reAlphaMaj = /[A-Z]/;
	var reNum = /[0-9]/;
	return (reNum.test(passwordPost));
}


exports.mail = mail;
exports.pass = pass;