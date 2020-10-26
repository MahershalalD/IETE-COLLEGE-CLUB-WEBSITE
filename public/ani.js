const doc = new jsPDF();
const event = document.querySelectorAll('.eventN');
const comp = document.querySelectorAll('.compN');
const btn = document.querySelectorAll('#cmd')
const table = document.querySelectorAll('.table')
console.log(table);
btn.forEach((item,index)=>{
    console.log(item);
    $(item).on("click", function () {
        doc.autoTable({
            html: table[index],
            theme: 'grid'
        })
        // Or use javascript directly
        doc.save(event[index].textContent + "_" + comp[index].textContent + ".pdf");
        location.reload();
});
})
