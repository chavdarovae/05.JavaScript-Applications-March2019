function solve() {
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_SyqEASfYV';
    let username = 'eva';
    let password = 'eva';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    }
    const countryCollection = 'Country';
    const townCollection = 'Town';

    $('#newCountry input[type="button"]').click(addNewCountry);
    listCountries();

    async function listCountries() {
        $('#countries').empty();

        let url = `${baseUrl}/appdata/${appKey}/${countryCollection}`;
        let countries = await $.ajax({
            url,
            headers,
            method: "GET",
        });

        url = `${baseUrl}/appdata/${appKey}/${townCollection}`;
        let towns = await $.ajax({
            url,
            headers,
            method: "GET",
        });

        for (let country of countries) {
            let $div = $(`
                    <div class="countries" id="${country._id}">
                    <h2>${country.name}</h2>
                    <br>
                    <label>List of towns:</label>
                    </div>
                    `);
            let $ul = $(`<ul class="towns"></ul>`);
            $($div).append($ul)

            let foundTowns = towns.filter(x => x.country === country.name);
            foundTowns.forEach(t => {
                let $li = $(`<li id="${t._id}">${t.name}   </li>`);
                let $hiddenBtn = $(`<input type="button" class="hiddenBtn" value="Delete" hidden></input>`);
                $hiddenBtn.click(deleteTown);
                $($li).append($hiddenBtn);
                $($ul).append($li);
            });
            let $updateBtn = $(`<input type="button" class="formBtn" value="Update"></input>`);
            $updateBtn.click(updateCurrCountry);
            let $deleteBtn = $(`<input type="button" class="formBtn" value="Delete"></input>`);
            $deleteBtn.click(deleteCurrCountry);
            $($div).append($updateBtn);
            $($div).append($deleteBtn);
            $('#countries').append($div);
        }

        function updateCurrCountry() {
            let countryID = $(this).parent().attr('id');

            if($(this).val()==='Save') {
                $(this).val('Update');
                $('input[value="Update"]').attr("disabled", false);
                $(`#${countryID} input.hiddenBtn`).hide();
                $(`#newTown`).remove();
                listCountries();
            }else{
                $(this).val('Save')
                $('input[value="Update"]').attr("disabled", true);
                $(`#${countryID} input.hiddenBtn`).show();
        
                let $addTownLi = $(`<li id="newTown"><input type="text" id="townInp"></input></li>`);
                let $addTownBtn = $(`<input type="button" value="Add town"></input>`);
                $addTownBtn.click(addNewTown);
                $addTownLi.append($addTownBtn);
                $(`#${countryID} ul`).append($addTownLi);
            }            
        }

        async function deleteCurrCountry() {
            let countryID = $(this).parent().attr('id');
            let url = `${baseUrl}/appdata/${appKey}/${countryCollection}/${countryID}`;
            await $.ajax({
                url,
                headers,
                method: "DELETE",
            });
            try {
                listCountries();
            } catch (error) {
                renderError(error);
            }
        }
           
        async function addNewTown() {
            let townToAdd = $('#townInp').val();
            let url = `${baseUrl}/appdata/${appKey}/${townCollection}`;
            let towns = await $.ajax({
                url,
                headers,
                method: "GET",
            });
            
            try {
                let foundTown = towns.find(x => x.name === townToAdd);
                if (!foundTown && townToAdd !== '') {
                    let currCountry = Array.from($('#townInp').parent().parent().parent().children())[0];
                    await $.ajax({
                        url,
                        headers,
                        method: "POST",
                        data: JSON.stringify({ 'name': townToAdd, 'country': $(currCountry).text()})
                    });
                }
                $(`<li>${townToAdd}   <input type="button" value="Delete"></input></li>`).insertBefore($('#townInp').parent());
                $('#townInp').val('');
            } catch (error) {
                renderError(error);
            }
        }

        async function deleteTown() {
            let townID=$(this).parent().attr('id');
            let url = `${baseUrl}/appdata/${appKey}/${townCollection}/${townID}`;
            await $.ajax({
                url,
                headers,
                method: "DELETE",
            });
            try {
                $(this).parent().remove();
            } catch (error) {
                renderError(error);
            }
        }
    }
    
    async function addNewCountry() {
        let countryToAdd = $('#newCountry input').val();
        let url = `${baseUrl}/appdata/${appKey}/${countryCollection}`;
        let countries = await $.ajax({
            url,
            headers,
            method: "GET",
        });
        try {
            let foundCountry = countries.find(x => x.name === countryToAdd);
            if (!foundCountry && countryToAdd !== '') {
                await $.ajax({
                    url,
                    headers,
                    method: "POST",
                    data: JSON.stringify({ 'name': countryToAdd })
                });
            }
        } catch (error) {
            renderError(error);
        }
        $('#newCountry input[type="text"]').val('');
        listCountries();
    }

    function renderError(error) {
        console.error('Something went wrong' + error.message);
    }
}




