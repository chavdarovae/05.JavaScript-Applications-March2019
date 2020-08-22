function attachEvents() {
    $('#btnLoadTowns').click(getInput);

    function getInput() {
        $('#root').empty();

        const inputString = $('#towns').val();
        const towns = inputString.split(', ');
        const context = {
            towns
        };
        const townHTML = $('#towns-template').text();
        
        const template = Handlebars.compile(townHTML);
        const rendered = template(context);
        $('#root').append(rendered);
        $('#towns').val('');
    }
}