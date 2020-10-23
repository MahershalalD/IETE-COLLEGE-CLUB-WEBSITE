// const jsPDF = require('jspdf') // // typescript without esModuleInterop flag
// // import jsPDF from 'yworks-pdf' // using yworks fork
// // import jsPDF from 'jspdf/dist/jspdf.node.debug' // for nodejs
// const autoTable =require('jspdf-autotable');

// const doc = new jsPDF()


// $('#cmd').click(function () {
//     autoTable(doc, { html: '#my-table' })
//     doc.save('table.pdf')
// });

const event = document.querySelectorAll('.eventN');
const comp = document.querySelectorAll('.compN');
const btn = document.querySelectorAll('#cmd')
const table = document.querySelectorAll('.table')
console.log(table);
btn.forEach((item,index)=>{
    console.log(item);
    $(item).on("click", function () {
        html2canvas($(table[index]), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500,
                    height:220,
                }],
            };
                pdfMake.createPdf(docDefinition).download(event[index].textContent+"_"+comp[index].textContent+".pdf");
        }
    });
});
})

