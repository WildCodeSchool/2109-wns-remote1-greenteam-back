// Tester config ESLint/Airbnb pour Node.js
// 2 ERREURS :
// @typescript-eslint/no-unused-vars :  variable déclarée mais jamais utilisée,
// prefer-const : devrait être déclarée en const car jamais réaffectée
let name = 'john';

function addLastName(name: string): string {
  // ERREUR : ne pas réassigner les paramètres
  name += ' Abitbol';
  // WARNING no-console : l'usage de console.log|error|warn est découragé
  console.log(name);
  return name;
}
