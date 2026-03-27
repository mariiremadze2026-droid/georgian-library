function printText() {
    let text = document.getElementById("text").value;

    let win = window.open('', '', 'height=500,width=800');
    win.document.write('<html><head><title>ბეჭდვა</title></head><body>');
    win.document.write('<h1>' + text + '</h1>');
    win.document.write('</body></html>');
    win.document.close();
    win.print();
}