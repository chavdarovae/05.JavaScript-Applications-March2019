const select = {
    usernameInp: '#username',
    repoInp: '#repo',
    loadBtn: '#loadBtn',
    commitsUl: '#commits',
}

class GithubCommits {
    init() {
        this.registerEventHandlers()
    };

    registerEventHandlers() {
        this.handleUsernameInput();
        this.handleRepoInput();
        this.handleLoadBtnClick();
    }

    handleUsernameInput() {
        $(select.usernameInp).on('change', (e) => {
            this.username = e.target.value;
        })
    };

    handleRepoInput() {
        $(select.repoInp).on('change', (e) => {
            this.repo = e.target.value;
        })
    };

    handleLoadBtnClick() {
        $(select.loadBtn).on('click',()=>{
            this.loadCommits();
        });
    };

    loadCommits() {
        let url = `https://api.github.com/repos/${this.username}/${this.repo}/commits`;
        $.get(url)
            .then((data)=>this.renderData(data))
            .catch((error) => this.renderError(error));
    };

    renderData(data){
        data.forEach(commit=>{
            $(select.commitsUl).append(`<li>${commit.commit.author.name}: ${commit.commit.message}</li>`)
        })
    };

    renderError(error){
        $(select.commitsUl).append(`<li>Error: ${error.status} (${error.statusText})</li>`)
    }
}