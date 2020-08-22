function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_HynJvIMtE';
    let username = 'eva';
    let password = 'eva';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    }
    const collection = 'players';
    $('#addPlayer').click(addPlayer);

    listPlayers();

    async function listPlayers() {
        $('#players').empty();
        let url = `https://baas.kinvey.com/appdata/${appKey}/${collection}`;
        let players = await $.ajax({
            url,
            headers,
            method: "GET"
        });
        try {
            players.forEach(player => {
                let $playerDiv = $(`
                <div class="player" data-id="${player._id}">
                    <div class="row">
                        <label>Name:</label>
                        <label class="name">${player.name}</label>
                    </div>
                    <div class="row">
                        <label>Money:</label>
                        <label class="money">${+player.money}</label>
                    </div>
                    <div class="row">
                        <label>Bullets:</label>
                        <label class="bullets">${+player.bullets}</label>
                    </div>                     
                </div>
                `);
                let $playBtn = $(`<button class="play">Play</button>`);
                $playBtn.click(palyerPlays);
                let $deleteBtn = $(`<button class="delete">Delete</button>`);
                $deleteBtn.click(deletePlayer);
                $playerDiv.append($playBtn);
                $playerDiv.append($deleteBtn);
                $('#players').append($playerDiv);

            });
        } catch (error) {
            console.error(error);
        }
    }

    async function addPlayer() {
        ;
        let playerObj = {
            'bullets': 6,
            'money': 500,
            'name': $('#addName').val(),
        }
        let url = `https://baas.kinvey.com/appdata/${appKey}/${collection}`;
        let addedPlayer = await $.ajax({
            url,
            headers,
            method: "POST",
            data: JSON.stringify(playerObj)
        });

        try {            
            listPlayers();
        } catch (error) {
            console.error(error);
        }
    }


    async function palyerPlays() {
        console.log($(this).parent());
        $('#save').click();
        $('#canvas').show();
        $('#buttons').show();
        loadCanvas();
    }

    async function deletePlayer() {
        let itemId = $(this).parent().attr('data-id');
        let url = `https://baas.kinvey.com/appdata/${appKey}/${collection}/${itemId}`;
        let deletedPlayer = await $.ajax({
            url,
            headers,
            method: "DELETE"
        });
        try {
            listPlayers();
        } catch (error) {
            console.error(error);
        }
    }
}