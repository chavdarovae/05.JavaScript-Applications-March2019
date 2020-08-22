handlers.getRegister = function (ctx) {
    ctx.loadPartials({
        header: '../../templates/common/header.hbs',
        footer: '../../templates/common/footer.hbs',
    }).then(function () {
        this.partial('../../templates/register.hbs');
    }).catch(err => console.log(err));
};

handlers.getLogin = function (ctx) {
    ctx.loadPartials({
        header: '../../templates/common/header.hbs',
        footer: '../../templates/common/footer.hbs',
    }).then(function () {
        this.partial('../../templates/login.hbs');
    }).catch(err => console.log(err));
};

handlers.registerUser = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;
    let repeatPassword = ctx.params.repeatPassword;
    userService.register(username, password)
    .then(res=>console.log(res));    
};