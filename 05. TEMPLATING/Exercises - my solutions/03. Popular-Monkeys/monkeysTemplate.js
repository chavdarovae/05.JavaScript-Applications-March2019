$(window).on('load', async function renderMonkeyCards() {
    try {
        const monkeyCardHTML = await $.get('./monkey-card.hbs');
        const monkeyListHTML = $('#monkey-template').text();
        const context = {
            monkeys
        };

        Handlebars.registerPartial('monkeyCard', monkeyCardHTML);
        const template = Handlebars.compile(monkeyListHTML);
        const renderedCard = template(context);
        $('.monkeys').append(renderedCard);
    } catch (error) {
        console.error(error);
    }
});

function toggleInfo(id) {
    $(`#${id}`).toggle();
}