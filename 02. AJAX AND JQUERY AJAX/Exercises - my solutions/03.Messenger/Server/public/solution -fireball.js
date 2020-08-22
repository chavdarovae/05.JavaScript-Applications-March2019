function attachEvents() {
    let baseUrl = "https://messenger-e64f0.firebaseio.com/messenger/.json";
    $('#submit').click(send);
    $('#refresh').click(refresh);

    function send() {
        let author = $('#author').val()
        let content = $('#content').val()
        let timestamp = Date.now();

        $.ajax({
            method: "POST",
            url: baseUrl,
            data: JSON.stringify({author, content, timestamp}),
            success: (res) => console.log(res)
        });

        $('#author').val('');
        $('#content').val('');
    }

    function refresh() {
        $.ajax({
            method: "GET",
            url: baseUrl,
            success: listMessages
        })
    }

    function listMessages(data) {
        let textContent = '';
        Object.entries(data)
            .sort((a, b) => a[1].timestamp - b[1].timestamp)
            .forEach(x => {
                textContent += `${x[1].author}: ${x[1].content}\n`
            });
        $('#messages').text(textContent)
    }
}
