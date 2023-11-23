function fetchInitialSettings() {
    fetch('/sensitivity', { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            var sensitivityValue = parseInt(data, 10);
            sensitivitySlider.value = sensitivityValue; // Update the slider's value
        })
        .catch(error => {
            console.error('Error fetching initial sensitivity:', error);
        });

    fetch('/brightness', { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            var brightnessValue = parseInt(data, 10);
            brightnessSlider.value = brightnessValue; // Update the slider's value
        })
        .catch(error => {
            console.error('Error fetching initial brightness:', error);
        });
}

function fetchBirdSettings() {
    fetch('/birds', { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            var settings = data.split('\n');
            settings.forEach(setting => {
                var parts = setting.split('=');
                var key = parts[0];
                var value = parts[1];
                switch (key) {
                    case 'max_velocity':
                        document.getElementById('maxVelocity').value = value;
                        break;
                    case 'min_velocity':
                        document.getElementById('minVelocity').value = value;
                        break;
                    case 'num_birds':
                        document.getElementById('numBirds').value = value;
                        break;
                    case 'alignment':
                        document.getElementById('alignment').value = value;
                        break;
                    case 'cohesion':
                        document.getElementById('cohesion').value = value;
                        break;
                    case 'separation':
                        document.getElementById('separation').value = value;
                        break;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching bird settings:', error);
        });
}

window.onload = function () {
    fetchInitialSettings();
    fetchBirdSettings();
}

document.querySelectorAll('.toggle-check').forEach(function (check) {
    var contentId = check.id;
    // Load the saved state
    check.checked = localStorage.getItem(contentId) === 'true';
    // Save state on change
    check.addEventListener('change', function () {
        localStorage.setItem(contentId, check.checked);
    });
});

var sensitivitySlider = document.getElementById('sensitivityValue');

sensitivitySlider.addEventListener('input', function () {
    sensitivityValue.textContent = sensitivitySlider.value;
});

sensitivitySlider.addEventListener('change', function () {
    var formData = new FormData();
    formData.append('value', sensitivitySlider.value);
    fetch('/sensitivity', { method: 'POST', body: formData })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error setting sensitivity:', error);
        });
});

var brightnessSlider = document.getElementById('brightnessValue');

brightnessSlider.addEventListener('input', function () {
    brightnessValue.textContent = brightnessSlider.value;
});

brightnessSlider.addEventListener('change', function () {
    // brightnessPopup.style.display = 'none';
    var formData = new FormData();
    formData.append('value', brightnessSlider.value);
    fetch('/brightness', { method: 'POST', body: formData })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error setting brightness:', error);
        });
});

var visualizationSelect = document.getElementById('visualizationSelect');
var birdSettingsDiv = document.getElementById('bird-settings');

visualizationSelect.addEventListener('change', function () {
    var selectedValue = visualizationSelect.value;
    setVisualization(selectedValue);

    // Show bird settings only if "Birds" is selected
    if (selectedValue === '2') { // Assuming '2' is the value for Birds visualization
        birdSettingsDiv.style.display = 'block';
    } else {
        birdSettingsDiv.style.display = 'none';
    }
});

function setVisualization(mode) {
    fetch('/visualization?mode=' + mode, { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error setting visualization mode:', error);
        });
}

document.getElementById('sendText').addEventListener('click', function () {
    var text = document.getElementById('customText').value;
    fetch('/scrollText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'text=' + encodeURIComponent(text)
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
});

document.getElementById('textColor').addEventListener('change', function () {
    var color = this.value;
    fetch('/setTextColor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'color=' + encodeURIComponent(color)
    });
    console.log(color);
    console.log(encodeURIComponent(color));
});

document.getElementById('speedControl').addEventListener('change', function () {
    var speed = this.value;
    fetch('/setSpeed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'speed=' + encodeURIComponent(speed)
    });
});

document.getElementById('updateBirds').addEventListener('click', function () {
    var maxVelocity = document.getElementById('maxVelocity').value;
    var minVelocity = document.getElementById('minVelocity').value;
    var numBirds = document.getElementById('numBirds').value;
    var alignment = document.getElementById('alignment').value;
    var cohesion = document.getElementById('cohesion').value;
    var separation = document.getElementById('separation').value;

    fetch('/birds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'max_velocity=' + maxVelocity
            + '&min_velocity=' + minVelocity
            + '&num_birds=' + numBirds
            + '&alignment=' + alignment
            + '&cohesion=' + cohesion
            + '&separation=' + separation
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
});

document.getElementById('wifiSetup').addEventListener('click', function () {
    window.location.href = '/setup';
});

document.getElementById('wifiErase').addEventListener('click', function () {
    window.location.href = '/erase';
});


