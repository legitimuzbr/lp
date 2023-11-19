function setGclidValue() {

  function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const gclidValue = getURLParameter('gclid');

  if (gclidValue) {
    document.getElementById('gclid').value = gclidValue;
  }
}

window.addEventListener('load', setGclidValue);