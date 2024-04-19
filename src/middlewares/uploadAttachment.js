import multer from 'multer';

// on enregistre notre PJ dans un fichier à l'aide de Multer et de sa méthode .diskStorage()
const storage = multer.diskStorage({
  // Définition du chemin du répertoire où les fichiers seront sauvegardés
  destination: process.env.ATTACHMENT_FILE,
  filename(req, file, cb) {
    // On nomme le fichier en utilisant le nom d'origine, nous ajoutons un timestamp
    // pour rendre unique chaque fichier
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
    console.log('👆 file :', file);
  },
});

export default multer({ storage });
