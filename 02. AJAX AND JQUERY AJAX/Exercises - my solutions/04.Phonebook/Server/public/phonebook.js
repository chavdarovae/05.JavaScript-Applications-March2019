function attachEvents() {
    let basisUrl = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
    $('#btnCreate').click(appendContact);
    $('#btnLoad').click(listContacts);

    function appendContact() {
        let person = $('#person').val();
        let phone = $('#phone').val();
        $.ajax({
            method: "POST",
            url: basisUrl,
            data: JSON.stringify({ person, phone }),
            success: listContacts
        });
        $('#person').val('');
        $('#phone').val('')
    }

    function listContacts() {
        $.ajax({
            method: "GET",
            url: basisUrl,
            success: list
        });
    }

    function list(data) {
        $('#phonebook').empty();
        Object.entries(data).forEach(c => {
            $li = $(`<li>${c[1].person}: ${c[1].phone}</li>`);
            $btnDelete = $('<button>Delete</button>');
            $btnDelete.click(() => {
                let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${c[0]}.json`;
                $.ajax({
                    method: "DELETE",
                    url: deleteUrl,
                    success: listContacts
                });
            });
            $li.append($btnDelete)
            $('#phonebook').append($li);
        });
    }
}
