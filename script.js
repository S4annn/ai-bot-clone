document.getElementById('search-button').addEventListener('click', function () {
    const userInput = document.getElementById('userInput').value.toLowerCase(); 
    const apiKey = 'AIzaSyDYNkc6Lv4eW1ZMZosIjE_o81Q37yG9WHY'; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    if (userInput.includes('developer') || userInput.includes('siapa yang membuat program ini') || userInput.includes('siapa yang membuat ini')) {
        const responseElement = document.getElementById('response');
        responseElement.innerText = 'Program ini dibuat oleh [Sandy Teuku Pranata].'; 
        return; 
    }

    const requestBody = {
        contents: [{
            parts: [{
                text: userInput
            }]
        }]
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const responseText = data.candidates[0].content.parts[0].text;
        const responseElement = document.getElementById('response');
        responseElement.innerText = responseText; 

        const container = document.querySelector('.container');
        container.style.height = 'auto'; 
        container.style.maxWidth = '90%'; 
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'Error: Failed to fetch response.';
    });
});
