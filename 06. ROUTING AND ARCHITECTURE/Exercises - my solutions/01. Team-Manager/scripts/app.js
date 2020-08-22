$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');
        //get
        this.get('#/home', function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs')
            })
        });

        this.get('#/about', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs')
            })
        });

        this.get('#/login', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs',
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs')
            })
        });

        this.get('#/logout', async function () {
            try {
                await auth.logout();
                sessionStorage.clear();
                auth.showInfo("You logged out successfully!");
                this.redirect('#/home');
            } catch (error) {
                console.error(error);
            }
        });

        this.get('#/register', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs',
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs')
            })
        });

        this.get('#/catalog', async function () {
            try {
                const teamCatalogHTML = await $.get('./templates/catalog/teamCatalog.hbs');
                const teamHTML = await $.get('./templates/catalog/team.hbs');
                const footerHTML = await $.get('./templates/common/footer.hbs');
                const headerHTML = await $.get('./templates/common/header.hbs');
                const teams = await teamsService.loadTeams();

                Handlebars.registerPartial('header', headerHTML);
                Handlebars.registerPartial('footer', footerHTML);
                Handlebars.registerPartial('team', teamHTML);

                const template = Handlebars.compile(teamCatalogHTML);
                const context = {
                    teams
                }
                const renderedHTML = template(context);
                const hasNoTeam=true;
                this.partial('./templates/catalog/teamCatalog.hbs');
            } catch (error) {
                console.error(error);
            }
        });

        this.get('#/create', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs',
            }).then(function () {
                this.partial('./templates/create/createPage.hbs')
            })
        });

        //post
        this.post('#/register', function (context) {
            let that = this;

            let { username, password, repeatPassword } = context.params;
            auth.register(username, password, repeatPassword)
                .then(function (res) {
                    auth.saveSession(res);
                    auth.showInfo("Registration successful!");
                    that.redirect('#/home');
                });
        });
    });

    app.run('#/home');
});