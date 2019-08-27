//Importando Multer
const multer = require('multer');

//Configuração do Multer para armazenamento dos arquivos XLSX
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, 'file.xlsx');
    }
});

const upload = multer({storage});

module.exports = { storage, upload };