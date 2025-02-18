window.onload = function() {
    document.getElementById("decryptBtn").addEventListener('click', function() {
        const fileInput = document.getElementById("file");
        const file = fileInput.files[0];
        
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;

            try {
                const decrypted = CryptoJS.AES.decrypt(fileContent, "x0i2O7WRiANTqPmZ"); 
                const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
                
                const jsonContent = JSON.parse(plaintext);

                const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: "application/json" });

                const filename = file.name.startsWith('data_') ? 'data_Guest.json' : (file.name.startsWith('sessionData_') ? 'sessionData_Guest.json' : 'decrypted_data.json');

                const downloadLink = document.createElement("a");
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.download = filename;
                downloadLink.click();
            } catch (e) {
                alert("Error: Failed to decrypt or parse JSON.");
            }
        };

        reader.readAsText(file);
    });

    document.getElementById("encryptBtn").addEventListener('click', function() {
        const fileInput = document.getElementById("file");
        const file = fileInput.files[0];
        
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;

            try {
    
                const ciphertext = CryptoJS.AES.encrypt(CryptoJS.enc.Latin1.parse(fileContent), "x0i2O7WRiANTqPmZ").toString();

                const blob = new Blob([ciphertext], { type: "application/octet-stream" });

                const extension = file.name.endsWith('.json') ? 'prsv' : 'json';
                const filename = file.name.replace(/\.[^/.]+$/, `.${extension}`);

                const downloadLink = document.createElement("a");
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.download = filename;
                downloadLink.click();
            } catch (e) {
                alert("Error: Failed to encrypt.");
            }
        };

        // Read the file as binary data
        reader.readAsBinaryString(file);
    });
};
