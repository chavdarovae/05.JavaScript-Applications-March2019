function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_BJ_Ke8hZg';
    let username = 'guest';
    let password = 'pass';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    }
    const collection = '';

    $('#getVenues').click(getVenues);

    async function getVenues() {
        let date = $('#venueDate').val();
        let url = `${baseUrl}/rpc/${appKey}/custom/calendar?query=${date}`;
        try {
            let venueIds = await $.ajax({
                url,
                headers,
                method: "POST",
            });
            console.log(venueIds);
            venueIds.forEach(id => {
                listVenue(id);
            });
        } catch (error) {
            renderError(error);
        }
    }

    async function listVenue(id) {
        url = `${baseUrl}/appdata/${appKey}/venues/${id}`;
        try {
            let venueObj = await $.ajax({
                url,
                headers,
                method: "GET",
            });
            console.log(venueObj);
            $('#venue-info').append(createVenueDiv(venueObj));
        } catch (error) {
            renderError(error);
        }
    }

    function createVenueDiv(venue) {
        let $moreInfoBtn = $(`<input class="info" type="button" value="More info">`);
        $moreInfoBtn.click(toggleInfoBlock);
        let $span = $(`<span class="venue-name">${venue.name}</span>`);
        $span.prepend($moreInfoBtn);
        let $div = $(`
        <div class="venue" id="${venue._id}">
            <div class="venue-details" style="display: none;">
                <table>
                <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
                <tr>
                    <td class="venue-price">${venue.price} lv</td>
                    <td><select class="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select></td>
                    <td><input class="purchase" type="button" value="Purchase" onclick="purchaseTickets()"></td>
                </tr>
                </table>
                <span class="head">Venue description:</span>
                <p class="description">${venue.description}</p>
                <p class="description">Starting time: ${venue.startingHour}</p>
            </div>
        </div>
        `);
        $div.prepend($span);
        return $div;
    }

    function toggleInfoBlock() {
        let currVenueId = $(this).parent().parent().attr('id');
        let isExpanded = $(`#${currVenueId} .venue-details`).css("display") === 'block';
        if (isExpanded) {
            $(`#${currVenueId} .venue-details`).css("display", "none");
        } else {
            $(`#${currVenueId} .venue-details`).css("display", "block");
        }

    }
 
    function renderError(error) {
        console.log('Something went terribly wrong' + error.message);
    }
}



function purchaseTickets() {
    let parent=window.event.target.parentNode.parentNode.parentNode;
    $(parent).empty();
    $(parent).html(`
                    <span class="head">Confirm purchase</span>
                    <div class="purchase-info">
                    <span>{name}</span>
                    <span>{qty} x {price}</span>
                    <span>Total: {qty * price} lv</span>
                    <input type="button" value="Confirm">
                    </div>
                    `);
}


