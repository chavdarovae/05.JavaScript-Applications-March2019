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
        let postsPromise = loadPosts();
        postsPromise
            .then(res => res.json())
            .then(posts => {
                posts.forEach(post => $postDropdown.append(`<option value="${post._id}">${post.title}</option>`));
            })
    });

    $renderPostBtn.on('click', ()=>{
        renderCurrentPostDetails();
    });

    function renderCurrentPostDetails() {
        postId = $postDropdown.find(':selected').val();
        renderCurrPost();
        renderCurrPostComments();
    }

    function renderCurrPost() {
        let currPostsPromise = loadCurrPost();
        currPostsPromise
            .then(res => res.json())
            .then(post => {
                $postTitleH1.text(post.title);
                $postBodyUl.text(post.body);
            });
    }

    function renderCurrPostComments() {
        $postCommentsUl.empty();
        let currPostCommentPromise = loadCurrPostComments();
        currPostCommentPromise
            .then(res => res.json())
            .then(comments => {
                comments.forEach(comment=>{
                    $postCommentsUl.append(`<li>${comment.text}</li>`);
                })
            });
    }

    function loadPosts() {
        return fetch(serviceUrl + '/posts', {
            method: "GET",
            headers: new Headers(authHeaders),
        });
    }

    function loadCurrPost() {
        return fetch(serviceUrl + `/posts/${postId}`, {
            method: "GET",
            headers: new Headers(authHeaders),
        });
    }

    function loadCurrPostComments() {
        return fetch(serviceUrl + `/comments/?query={"post_id":"${postId}"}`, {
            method: "GET",
            headers: new Headers(authHeaders),
        });
    }
}