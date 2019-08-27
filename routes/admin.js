//Importanto Express Router
const router = require('express').Router();

//Importando Middleware
const auth = require('../middlewares/auth');

//Importando Multer
const multer = require('multer');

//Importando Controller
const adminController = require('../controllers/admin');

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


//Rota geral Admin
router.get('/', adminController.getAdminIndex);

//Página para cadastro de informações
router.get('/cadastro', auth, adminController.getCadastro);

//Página de Cadastro de Informações pelo Excel
router.get('/cadastro-excel', auth, adminController.getCadastroExcel);

//Rota POST para inserir as informações no BD
router.post('/cadastro-excel', auth, upload.single('excel'), adminController.postCadastroExcel);

//Página para visualização de informações cadastradas
router.get('/registros', auth, adminController.getRegistros);

//Rota POST que insere as informações no BD
router.post('/cadastro', auth, adminController.postCadastro);

//Rota para deletar Registros
router.get('/delete/registro/:id', auth, adminController.getDeleteRegistro);

//Rota para deletar Indicadores
router.get('/delete/indicador/:id', auth, adminController.getDeleteIndicador);

//Rota Para Editar Períodos
router.post('/update/periodo', auth, adminController.postUpdatePeriodo);

//Rota Para Deletar Períodos
router.get('/delete/periodo/:id', adminController.getDeletePeriodo);


module.exports = router;