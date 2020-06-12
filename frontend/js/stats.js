if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded",statsMain_)
}
else {
    statsMain_()
}

$( "form" ).submit(function( event ) {
    event.preventDefault();
});


function statsMain_() {
    var roedBtn = document.getElementsByClassName('btn-roed')
    for(var i=0 ;i<roedBtn.length; i++){
        var button = roedBtn[i]
        button.addEventListener('click', handleROED)
    }

    var chartBtn = document.getElementsByClassName('btn-chart')
    for(var i=0 ;i<chartBtn.length; i++){
        var button = chartBtn[i]
        button.addEventListener('click' , handleChart)
    }
}

function handleROED(e) {
    var formData = $('form.1').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});

    if (formData["MedUID"] === "") formData["MedUID"] = -1;

    console.log(formData);

    fetch("http://localhost:1337/sales/roed/" + formData["Date"] + "/" + formData["MedUID"])
        .then((response) => response.json())
        .then(function (data) {
            renderROED(data);
        });
}

function handleChart(e) {
    var formData = $('form.2').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});

    if (formData["MedUID"] === "") formData["MedUID"] = -1;
    
    fetch("http://localhost:1337/sales/tsalesdom/" + formData["MedUID"])
        .then((response) => response.json())
        .then(function (data) {
            tsalesdom_data = data;
            // statsMain()
            chart.updateSeries( [{
                                    name: 'Total Sales',
                                    data: tsalesdom_data
                                }]);
        });
    // chartReady(formData["MedUID"])

}


function renderROED(data) {
    $(".amt").text(data);
}