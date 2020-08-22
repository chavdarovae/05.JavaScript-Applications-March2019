function attachEvents() {
    const $loadPostsBtn = $('#btnLoadPosts');
    const $postDropdown = $('#posts');
    const $postTitleH1 = $('#post-title');
    const $postBodyUl = $('#post-body');
    const $postCommentsUl = $('#post-comments');
    const $renderPostBtn = $('#btnViewPost');
    let postId;


    const kinveyAppId = "kid_S1htVfcmm";
    const serviceUrl = "https://baas.kinvey.com/appdata/" +
        kinveyAppId;
    const kinveyUsername = "peter";
    const kinveyPassword = "p";
    const base64auth = btoa(kinveyUsername + ":" +
        kinveyPassword);
    const authHeaders = {
        "Authorization": "Basic " + base64auth
    };

    $loadPostsBtn.on('click', () => {
        loadPosts();
    });

    $renderPostBtn.on('click', () => {
        renderCurrentPostDetails();
    });

    function renderCurrentPostDetails() {
        postId = $postDropdown.find(':selected').val();
        loadCurrPost();
        loadComments();
    }

    function loadPosts() {
        $.ajax({
            url: serviceUrl + '/posts',
            headers: authHeaders,
        })
            .then(renderPosts)
            .catch(renderError);
    }

    function loadCurrPost() {
        $.ajax({
            url: serviceUrl + `/posts/${postId}`,
            headers: authHeaders,
        })
            .then(renderCurrPost)
            .catch(renderError);
    }

    function loadComments() {
        $postCommentsUl.empty();
        $.ajax({
            url: serviceUrl + `/comments/?query={"post_id":"${postId}"}`,
            headers: authHeaders,
        })
            .then(renderCurrPostsComments)
            .catch(renderError);
    }

    function renderPosts(posts) {
        posts.forEach(post => $postDropdown.append(`<option value="${post._id}">${post.title}</option>`));
    }

    function renderCurrPost(post) {
        $postTitleH1.text(post.title);
        $postBodyUl.text(post.body);
    }

    function renderCurrPostsComments(comments) {
        comments.forEach(comment => $postCommentsUl.append(`<li>${comment.text}</li>`));
    }

    function renderError(error) {
        console.log('Something went wrong:' + error.message);
    }
}