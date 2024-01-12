document.addEventListener('mouseover', function (e) {
    let hoveredElement = e.target;

    // Check if the hovered element is a text container
    if (hoveredElement instanceof HTMLElement) {
        // Event listener for keyboard shortcut (e.g., Ctrl+Q)
        async function onKeyPress(event) {
            if (event.ctrlKey && event.key === 'q') {
                console.log("converting")
                convertHtmlToBionic(hoveredElement)
            }
        }

        // Add keydown event listener
        document.addEventListener('keydown', onKeyPress);

        // Remove the border and keydown event listener when no longer hovering
        hoveredElement.addEventListener('mouseout', function () {
            document.removeEventListener('keydown', onKeyPress);
        }, { once: true });
    }
});

function convertHtmlToBionic(element) {
    browser.storage.local.get('apiKey', async function (items) {
        const apiKey = items.apiKey;
        console.log(apiKey)

        const url = 'https://bionic-reading1.p.rapidapi.com/convert';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'bionic-reading1.p.rapidapi.com'
            },
            body: new URLSearchParams({
                content: element.innerHTML,
                response_type: 'html',
                request_type: 'html',
                fixation: '1',
                saccade: '10'
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            element.innerHTML = result
        } catch (error) {
            console.error(error);
        }
    });
}