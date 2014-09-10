/*
 Component: Form Validator
 Version: 0.1
 */
function onFormSubmit(oForm) {
  var nErrorForm = 0,
      nError = 0,
      oFocusElement = null;
  for (var i = 0; i < oForm.elements.length; i++) {
    nError = formValidateElement(oForm.elements[i]);
    if (nError < 0 && !oFocusElement) {
      oFocusElement = oForm.elements[i];
      oFocusElement.focus();
    }
    nErrorForm += nError;
  }
  return nErrorForm >= 0;
}

function formValidateElement(oElement) {
  var nError = 0,
      sPreset = oElement.getAttribute("preset"),
      bRequired = oElement.getAttribute("required") == "true",
      sValue;

  switch (oElement.tagName) {
    case "INPUT":
      sValue = oElement.value;
      switch (oElement.type) {
        case "text":
        case "password":
          if (sValue == "") {
            if (bRequired) {
              nError = -1;
            }
          } else {
            if (!formValidateElementValue(sValue, sPreset)) {
              nError = -2;
            }
          }
          formElementHighlight(nError, oElement);
          break;

        case "radio":
          if (bRequired) {

          }
          break;

        case "file":
          if (bRequired) {
            if (sValue == "") {
              nError = -1;
            }
          }
          formElementHighlight(nError, oElement);
          break;

        case "checkbox":
        case "hidden":
        case "button":
        case "image":
        case "reset":
        case "submit":
        default:
          // no actions
          break;
      }
      break;

    case "SELECT":
      if (bRequired) {
        if (oElement.value == "0" || oElement.value == "") {
          nError = -1;
        }
      }
      break;

    case "TEXTAREA":
      sValue = oElement.value;
      if (sValue == "") {
        if (bRequired) {
          nError = -1;
        }
      } else {
        if (!formValidateElementValue(sValue, sPreset)) {
          nError = -2;
        }
      }
      formElementHighlight(nError, oElement);
      break;

    case "BUTTON":
    default:
      break;
  }

  return nError;
}

function formValidateElementValue(sValue, sPreset) {
  sValue = sValue.toString();

  var oMask = null,
      bValid = true;

  switch (sPreset) {
    case "decimal":
    case "numeric":
      oMask = /(\-?)([0-9]+\.?[0-9]*)/;
      break;
    case "integer":
      oMask = /([0-9]+)/;
      break;
    case "email":
      oMask = /(([\.a-z0-9_\-]+)+@[\.a-z0-9_\-]+[a-z0-9]{1,})/i;
      break;
    case "url":
      oMask = /([\.a-z0-9_\-]+)/i;
      break;
    case "login":
      oMask = /([\.a-z0-9_]+)/i;
      break;
    case "file-flash":
      oMask = /(.+\.swf)$/i;
      break;
    case "file-image":
      oMask = /(.+\.(jpg|jpeg|gif|png))$/i;
      break;
    case "file-html":
      oMask = /(.+\.(html|htm))$/i;
      break;
  }
  if (oMask) {
    bValid = false;
    var aRes = oMask.exec(sValue);
    if (aRes) {
      if (sValue.length == aRes[0].length) {
        bValid = true;
      }
    }
  }
  return bValid;
}

function formElementHighlight(nError, oElement) {
  if (nError == -1) {
    oElement.className = "wrong-required";
  } else
    if (nError == -2) {
      oElement.className = "wrong-preset";
    } else {
      oElement.className = "form";
    }
}