
import fs from 'fs';

//writeFile sincrono
// fs.writeFileSync('Saludo.txt','Hola Mundo!','utf8');

//writeFile asincrono
fs.writeFile('Saludo.txt','Hola Mundo!','utf8',(err)=>{
  if(err) throw err;
});

//readFile sincrono
// const data = fs.readFileSync('./Saludo.txt', 'utf8');
// console.log(data);

//readFile asincrono
fs.readFile('Saludo.txt','utf8',(err, data) => {
  if(err) throw err;
  console.log('data leida:', data);
});

//rename sincrono
// fs.renameSync('Saludo.txt','NuevoSaludo.txt');

//rename asincrono
fs.rename('Saludo.txt','NuevoSaludo.txt',(err)=>{
  if(err) throw err;
});

//unlink sincrono
// fs.unlinkSync('Saludo.txt')
// console.log('Archivo eliminado.');

//unlink asincrono
// fs.unlink('Saludo.txt',(err)=>{
//   if(err) throw err;
//   console.log('Archivo eliminado.');
// });