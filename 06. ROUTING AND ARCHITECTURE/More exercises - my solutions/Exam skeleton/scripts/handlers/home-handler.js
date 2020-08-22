handlers.getHome = function name(ctx) {
    ctx.loadPartials({
        header: '../../templates/common/header.hbs',
        footer: '../../templates/common/footer.hbs',
    }).then(function () {
        this.partial('../../templates/home.hbs');
    }).catch(err=>console.log(err));
}; 