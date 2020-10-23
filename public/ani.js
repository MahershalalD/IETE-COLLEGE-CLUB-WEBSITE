// const jsPDF = require('jspdf') // // typescript without esModuleInterop flag
// // import jsPDF from 'yworks-pdf' // using yworks fork
// // import jsPDF from 'jspdf/dist/jspdf.node.debug' // for nodejs
// const autoTable =require('jspdf-autotable');

// const doc = new jsPDF()


// $('#cmd').click(function () {
//     autoTable(doc, { html: '#my-table' })
//     doc.save('table.pdf')
// });
const event = $('.eventN').text();
const comp = $('.compN').text();
$("#cmd").on("click", function () {
    html2canvas($('.table')[0], {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 450,
                    height:220,
                }],
            };
            pdfMake.createPdf(docDefinition).download(event+"_"+comp+".pdf");
        }
    });
});
