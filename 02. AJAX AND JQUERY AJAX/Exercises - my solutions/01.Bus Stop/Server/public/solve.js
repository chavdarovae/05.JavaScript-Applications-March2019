function getInfo(e) {
    let stopId=$('#stopId').val();
    const baseURL=`https://judgetests.firebaseio.com/businfo/${stopId}.json`
    $.ajax({
        method: "GET",
        url: baseURL,
        success: onLoad,
        error: ()=>$('#stopName').text('Error')
    })

    function onLoad(data) {
        console.log(data.name);
        $('#stopName').text(data.name);
        Object.entries(data.buses).forEach(b=>{
            $li=$(`<li>Bus ${b[0]} arrives in ${b[1]} minutes</li>`)
            $('#buses').append($li);
        })
    }
}