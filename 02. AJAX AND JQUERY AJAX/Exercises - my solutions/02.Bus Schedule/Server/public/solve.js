function solve() {
    let nextStopId = '';
    let currStopName ='';

    function depart() {
        $('#depart').attr("disabled", true);
        $('#arrive').attr("disabled", false);
       
        if (nextStopId === '') nextStopId = 'depot';
        let currUrl = `https://judgetests.firebaseio.com/schedule/${nextStopId}.json`;
        $.ajax({
            method: "GET",
            url: currUrl,
            success: onLoad
        })
    }

    function arrive() {
        $('#depart').attr("disabled", false);
        $('#arrive').attr("disabled", true);
        $('#info .info').text(`Arriving at ${currStopName}`);
    }

    function onLoad(data) {
        currStopName = data.name;
        nextStopId = data.next;
        $('#info .info').text(`Next stop ${currStopName}`);
    }

    return {
        depart,
        arrive
    };
}
let result = solve();