function attachEvents() {
    let $locationInp = $('#location');
    let $submitBtn = $('#submit');
    let $forecastDiv = $('#forecast');
    let $current = $('#current');
    let $upcoming = $('#upcoming');
    let baseUrl = 'https://judgetests.firebaseio.com/locations';

    let symbols = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂
        'Degrees': '&#176',   // °       
    }

    $submitBtn.on('click', () => {
        $.get(baseUrl + '.json')
            .then(handleResult)
            .catch(renderError);
    })

    function handleResult(data) {
        let foundLocation = data.find(x => x.name === $locationInp.val());
        if (!foundLocation) {
            renderError();
        } else {
            $forecastDiv.show();
            let currUrl = `https://judgetests.firebaseio.com/forecast/today/${foundLocation.code}.json`
            $.get(currUrl)
                .then(renderCurrentCondition)
                .catch(renderError);

            currUrl = `https://judgetests.firebaseio.com/forecast/upcoming/${foundLocation.code}.json`
            $.get(currUrl)
                .then(renderUpcomingCondition)
                .catch(renderError);
        }
    }

    function renderCurrentCondition(obj) {
        $current.empty();
        $current.append($('<div class="label">Current conditions</div>'));

        $current.append(`<span class="condition symbol">${symbols[obj.forecast.condition]}</span>`);
        $span = $(`<span class="condition"></span>`);
        $span.html(`<span class="forecast-data">${obj.name}</span>
                    <span class="forecast-data">${obj.forecast.low}&#176/${obj.forecast.high}&#176</span>
                    <span class="forecast-data">${obj.forecast.condition}</span>`);
        $current.append($span);
    }

    function renderUpcomingCondition(obj) {
        $upcoming.empty();
        $upcoming.append($('<div class="label">Three-day forecast</div>'));
        obj.forecast.forEach(f => {
            $span = $(`<span class="upcoming"></span>`);
            $span.html(`<span class="symbol">${symbols[f.condition]}</span>
                        <span class="forecast-data">${f.low}&#176/${f.high}&#176</span>
                        <span class="forecast-data">${f.condition}</span>`);
            $upcoming.append($span);
        })

    }

    function renderError(error) {
        $forecastDiv.show();
        $forecastDiv.text('Error');
        console.log('Something went wrong' + error.message);
    }
}