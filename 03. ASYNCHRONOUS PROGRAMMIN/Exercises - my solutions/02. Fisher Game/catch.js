function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_HJREoAgY4';
    let username = 'emilia';
    let password = 'emi';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    }
    const collection = 'biggestCatches';

    $('.add').click(createNewCatch);
    $('.load').click(listAllCatches);

    async function listAllCatches() {
        $('#catches').empty();
        let url = `https://baas.kinvey.com/appdata/${appKey}/biggestCatches`;
        let catches = await $.ajax({
            url,
            headers,
            method: "GET"
        });

        for (let c of catches) {
            let $div = $(`
                <div class="catch" data-id="${c._id}">
                    <label>Angler</label>
                    <input type="text" class="angler" value="${c.angler}"/>
                    <label>Weight</label>
                    <input type="number" class="weight" value="${c.weight}"/>
                    <label>Species</label>
                    <input type="text" class="species" value="${c.species}"/>
                    <label>Location</label>
                    <input type="text" class="location" value="${c.location}"/>
                    <label>Bait</label>
                    <input type="text" class="bait" value="${c.bait}"/>
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${c.captureTime}"/>                    
                </div>
        `);
            let $updateBtn = $(`<button class="update">Update</button>`);
            $updateBtn.click(updateCurrCatch);
            let $deleteBtn = $(`<button class="delete">Delete</button>`);
            $deleteBtn.click(deleteCurrCatch);
            $($div).append($updateBtn);
            $($div).append($deleteBtn);
            $('#catches').append($div);
        }

    }

    async function createNewCatch(params) {
        let url = `https://baas.kinvey.com/appdata/${appKey}/biggestCatches`;
        let currCatch = {
            "angler": $('#addForm .angler').val(),
            "weight": +$('#addForm .weight').val(),
            "species": $('#addForm .species').val(),
            "location": $('#addForm .location').val(),
            "bait": $('#addForm .bait').val(),
            "captureTime": +$('#addForm .captureTime').val()
        }
        await $.ajax({
            url,
            headers,
            method: "POST",
            data: JSON.stringify(currCatch)
        });
        listAllCatches();
        $('#addForm .angler').val(''),
        $('#addForm .weight').val(''),
        $('#addForm .species').val(''),
        $('#addForm .location').val(''),
        $('#addForm .bait').val(''),
        $('#addForm .captureTime').val('')
    }

    async function updateCurrCatch() {
        let $currDiv = $(this).parent();
        let catchId = $currDiv.attr('data-id');
        let updatedCatch = {
            "angler": $(`div[data-id="${catchId}"] .angler`).val(),
            "weight": +$(`div[data-id="${catchId}"] .weight`).val(),
            "species": $(`div[data-id="${catchId}"] .species`).val(),
            "location": $(`div[data-id="${catchId}"] .location`).val(),
            "bait": $(`div[data-id="${catchId}"] .bait`).val(),
            "captureTime": +$(`div[data-id="${catchId}"] .captureTime`).val()
        }
        let url = `https://baas.kinvey.com/appdata/${appKey}/biggestCatches/${catchId}`;
        await $.ajax({
            url,
            headers,
            method: "PUT",
            data: JSON.stringify(updatedCatch)
        });
        listAllCatches();
    }

    async function deleteCurrCatch() {
        let $currDiv = $(this).parent();
        let catchId = $currDiv.attr('data-id');
        let url = `https://baas.kinvey.com/appdata/${appKey}/biggestCatches/${catchId}`;
        await $.ajax({
            url,
            headers,
            method: "DELETE",
        });
        listAllCatches();
    }
}

