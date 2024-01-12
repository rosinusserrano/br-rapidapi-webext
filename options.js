document.getElementById('optionsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const apiKey = document.getElementById('apiKey').value;
    browser.storage.local.set({ apiKey: apiKey });
});