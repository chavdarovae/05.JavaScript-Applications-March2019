$(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        try {
            const catListHTML = await $.get('./cat-list.hbs');
            const catCardHTML = await $.get('./cat-card.hbs');
            const context = {
                cats
            };

            Handlebars.registerPartial('catCard', catCardHTML);
            const template = Handlebars.compile(catListHTML);
            const renderedCard = template(context);
            $('#allCats').append(renderedCard);
        } catch (error) {
            console.error(error);
        }
    }
})

function toggleStatusInfo(id) {
    const $divToToggle = $(`#${id}`);
    const $btnToChange = $divToToggle.parent().find('button');

    if ($divToToggle.is(':hidden')) {
        $btnToChange.text('Hide status code');
        $divToToggle.show();
    } else if ($divToToggle.is(':visible')) {
        $btnToChange.text('Show status code');
        $divToToggle.hide();
    }
}
