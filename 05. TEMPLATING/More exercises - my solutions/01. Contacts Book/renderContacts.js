$(window).on('load', async function () {

    try {
        const contactListHTML = await $.get('./contact-list.hbs');
        const contactCardHTML = await $.get('./contact-card.hbs');

        Handlebars.registerPartial('contactCard', contactCardHTML);
        const template = Handlebars.compile(contactListHTML);
        const context = { contacts }
        const renderedHTML = template(context);
        $('.contacts').append(renderedHTML);
    } catch (err) {
        console.error(err)
    }

});


function showDetails(event) {
    let currParent = window.event.target.parentNode;
    divToToggle = $(currParent).find('div[class="details"]');
    $(divToToggle).toggle();
}