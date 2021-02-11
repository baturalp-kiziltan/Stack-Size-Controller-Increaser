document.getElementById('submit').addEventListener('click', () => {
    var file = document.getElementById('file').files[0];
    var fr = new FileReader();
    try {
        fr.readAsText(file, 'UTF-8');
        fr.onload = (event) => {
            let textData = event.target.result;
            var jsonData = JSON.parse(textData);
            
            let size = Object.keys(jsonData.itemlist).length;
    
            let multiplier = document.getElementById('mult').value;
            
            if (isNaN(parseInt(multiplier))) {
                alert('Invalid multiplier value!');
                return;
            }
    
            for (var index = 0; index < size; ++index)
            {
                let key = Object.keys(jsonData.itemlist)[index];
                let value = jsonData.itemlist[key];
            
                if (value != 1) {
                    jsonData.itemlist[key] *= multiplier;
                }    
            }
    
            let newTextData = JSON.stringify(jsonData, null, 2);
            var blob = new Blob([newTextData], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "StackSizeController.json");
    
            document.getElementById('file').value = '';
            document.getElementById('mult').value = '';
        }
    } catch (err) {
        alert("No file chosen!");
        document.getElementById('file').value = '';
        document.getElementById('mult').value = '';
    }
});
