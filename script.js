type = "text"
options = document.getElementById("options")
textoptions = document.getElementById("textoptions")
urloptions = document.getElementById("urloptions")
fileoptions = document.getElementById("fileoptions")
textinput = document.getElementById("textinput")
urlinput = document.getElementById("urlinput")
keyinput = document.getElementById("keyinput")
submitbutton = document.getElementById("submit")
regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/

function changetype(selecttype) {
	type = selecttype
	update()
}

function update() {
	if (type == "text") {
		textoptions.style.display = "inline"
		urloptions.style.display = "none"
		fileoptions.style.display = "none"
	} else if (type == "url") {
		textoptions.style.display = "none"
		urloptions.style.display = "inline"
		fileoptions.style.display = "none"
	} else if (type == "file") {
		textoptions.style.display = "none"
		urloptions.style.display = "none"
		fileoptions.style.display = "inline"
	} else {
		options.innerHTML = "Malformed type."
	}
}

function copy() {
	canCopy = true
	errors = '';
	text = null;
	key = null;
	combo = {}
	if (keyinput.value == '') {
		canCopy = false
		errors += '- Key input is empty.\n'
	}
	if (keyinput.value.length < 12) {
		canCopy = false
		errors += '- Key length is less than 12.\n'
	}
	if (type == "text") {
		typesmall = "t"
		if (textinput.value == '') {
			canCopy = false
			errors += '- Text input is empty.\n'
		}
		if (canCopy == true) {
			text = CryptoJS.AES.encrypt(textinput.value, keyinput.value).toString()
		}
	} else if (type == "url") {
		typesmall = "u"
		if (urlinput.value == '') {
			canCopy = false
			errors += '- URL input is empty.\n'
		}
		if (!regex.test(urlinput.value)) {
			canCopy = false
			errors += '- URL is not valid.\n'
		}
		if (canCopy == true) {
			text = CryptoJS.AES.encrypt(urlinput.value, keyinput.value).toString()
		}
	} else if (type == "file") {
		typesmall = "f"
		alert('Error!\n- File scrambl is coming soon.')
		return
	} else {
		canCopy = false
		errors += "- Malformed Type.\n"
	}
	if (canCopy == true) {
		key = CryptoJS.MD5(keyinput.value).toString()
		combo['t'] = typesmall
		combo['e'] = text
		combo['k'] = key
		combo = btoa(JSON.stringify(combo))
		url = window.location['href'] + 'unscrambl/?h=' + CryptoJS.MD5(combo).toString() + '&c=' + combo
		navigator.clipboard.writeText(url);
		console.log(url)
    keyinput.value = ''
    submit.style.backgroundColor = "green"
setTimeout(function(){submit.style.backgroundColor = ""},250)
	} else {
    keyinput.value = ''
		alert("Error!\n" + errors)
    submit.style.backgroundColor = "red"
setTimeout(function(){submit.style.backgroundColor = ""},250)
	}
}

update()

/*
  if (type == "text") {
  } else if (type == "url") {
  } else if (type == "file") {
  } else {
  }
*/