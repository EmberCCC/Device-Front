export default function decodeHtml(text) { 
  var temp = document.createElement("div"); 
  temp.innerHTML = text; 
  var output = temp.innerText || temp.textContent; 
  temp = null; 
  return output; 
} 