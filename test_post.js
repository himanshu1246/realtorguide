const url = 'https://script.google.com/macros/s/AKfycbwnbZm3q7t9sAEJCrSO6jWgwded7KOwRe9LF1i5yA0mQb3qYMLc7iWFSn2Sp0pqqM3Zpw/exec';

const formData = new URLSearchParams();
formData.append('Name', 'Antigravity AI Test');
formData.append('Phone', '1234567890');
formData.append('Company', 'AI Inc');
formData.append('Location', 'Cloud');
formData.append('Budget', 'Unlimited');
formData.append('Message', 'This is a test enquiry from the AI assistant to verify the Google Apps Script endpoint.');

console.log('Sending request to', url);

fetch(url, {
  method: 'POST',
  body: formData,
})
.then(response => {
  console.log('Status:', response.status);
  return response.text();
})
.then(text => {
  console.log('Response:', text);
})
.catch(error => {
  console.error('Fetch error:', error);
});
