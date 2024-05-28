// Formater les noms "bob" ou "BOB" => "Bob"
export default (name) => name[0].toUpperCase() + name.slice(1).toLowerCase();
