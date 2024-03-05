let hidden = document.querySelector('#carousel')
let hiddenTwo = document.querySelector('#hidden')
let startButton = document.querySelector('#html5-qrcode-button-camera-start')
let loginPanel = document.querySelector('.login_panel')
let scanPanel = document.querySelector('.scan_panel')
function login() {
    self.window.location.href = 'table.html?id=' + document.querySelector('#inputTextLogo').value + '&password=' + document.querySelector("#inputPassword").value
    console.log('hi')
}
function route(decodedText) {
    self.window.location.href = 'table.html?id=' + decodedText

}
function onScanSuccess(decodedText, decodedResult) {
    loginPanel.classList.add('hidden')
    scanPanel.classList.remove('col-md-6')
    scanPanel.classList.add('col-md-12')
    // dec = decodedText
    route(decodedText)
    console.log(`Scan result: ${decodedText}`, decodedResult);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);
