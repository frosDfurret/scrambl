urlParams = new URLSearchParams(window.location.search);
hash = urlParams.get("h")
combo = urlParams.get("c")
error = document.getElementById("error")
typeinfo = document.getElementById("typeinfo")
lockdiv = document.getElementById("lock")
keyinput = document.getElementById("keyinput")
content = document.getElementById("content")
textcontent = document.getElementById("textcontent")
urlcontent = document.getElementById("urlcontent")
filecontent = document.getElementById("filecontent")
textelement = document.getElementById("text")
urlelement = document.getElementById("url")
if (hash == null || combo == null) {
  error.innerHTML = "Error: Malformed URL parameters. (Hash and/or Combo)"
  throw new Error("Error: Malformed URL parameters. (Hash and/or Combo)");
}
if (CryptoJS.MD5(combo).toString() !== hash) {
  error.innerHTML = "Error: Pre-generated hash is not equal to hash of combo. (URL Parameters)"
  throw new Error("Error: Pre-generated hash is not equal to hash of combo. (URL Parameters)");
}
combo = JSON.parse(atob(combo))
if (combo['t'] == 't') {
  type = 'text'
} else if (combo['t'] == 'u') {
  type = 'url'
} else if (combo['t'] == 'f') {
  type = 'file'
}
typeinfo.innerHTML = "Enter the key to unlock the " + type + "."
lockdiv.style.display = "inline"

function verify() {
  if (CryptoJS.MD5(keyinput.value).toString() == combo['k']) {
    if (type == 'text') {
      lockdiv.style.display = "none"
      textcontent.style.display = "inline"
      textelement.innerHTML = CryptoJS.AES.decrypt(combo['e'],keyinput.value).toString(CryptoJS.enc.Utf8)
      content.style.display = "inline"
    } else if (type == 'url') {
      lockdiv.style.display = "none"
      urlcontent.style.display = "inline"
      urlelement.innerHTML = CryptoJS.AES.decrypt(combo['e'],keyinput.value).toString(CryptoJS.enc.Utf8)
      urlelement.href = CryptoJS.AES.decrypt(combo['e'],keyinput.value).toString(CryptoJS.enc.Utf8)
      content.style.display = "inline"
    }
    keyinput.value = ''
  } else {
    keyinput.value = ''
    alert('ERROR!\nThe key is incorrect!')
  }
}