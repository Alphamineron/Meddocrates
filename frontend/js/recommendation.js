let rec_meds

$(function() {
    fetch("http://localhost:1337/sales/recommendation")
        .then((response) => response.json())
        .then(function (data) {
            rec_meds = data;
            recMain()
        });
});

function recMain() {
    console.log(rec_meds);
    var data = rec_meds;
    $('#table-2').createTable(data, {
                // General Style for Table
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#DDDDDD',
                fontFamily: 'Verdana, Helvetica, Arial, FreeSans, sans-serif',

                // Table Header Style
                thBg: '#F3F3F3',
                thColor: '#0E0E0E',
                thHeight: '30px',
                thFontFamily: '"Open Sans Condensed", sans-serif',
                thFontSize: '14px',
                thTextTransform: 'capitalize',

                // Table Body/Row Style
                trBg: '#FFFFFF',
                trColor: '#0E0E0E',
                trHeight: '25px',
                trFontFamily: '"Open Sans", sans-serif',
                trFontSize: '13px',

                // Table Body's Column Style
                tdPaddingLeft: '10px',
                tdPaddingRight: '10px'
            });
}