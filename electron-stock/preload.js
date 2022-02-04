// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {getterDB,CreateCategoria,UpdateStock,CreateProducto,getTotalVentas,getInformeVentas}=require("./database");
const {regexAntiSql,regexNameCat,regexDesc,regexPrice,regexStock,lengthNameCat,lengthDesc,validateInput}=require("./regex");

window.addEventListener('DOMContentLoaded', () => {
  const TotalVentas=document.getElementById("TotalVentas")
  var formularioAltaProducto = document.getElementById('formularioAltaProducto');
  //var errores=document.getElementById("error");
  //getterDB("get_categorias").then(s=>TotalVentas.innerHTML=s[0].nombre)
  //const TotalVentas=document.getElementById("TotalVentas").innerHTML="QDWWWWWW";
  
formularioAltaProducto.addEventListener('submit', function(e){
  e.preventDefault();  
  //console.log(formularioAltaProducto.nombre.value)
  var nombreProducto=formularioAltaProducto.nombreProducto.value;
  var precioProducto=formularioAltaProducto.precioProducto.value;
  var stock=formularioAltaProducto.stock.value;
  var selCategoria=formularioAltaProducto.selCategoria.value;
  
  //console.log(String(descri))
  //validateInput("NameCat",descri).then(a=>console.log(a.regexValidation));
  //validateInput("NameCat",nombre).then(s=>console.log(s.regexValidation));
  
  // console.log(validateInput("Desc",nombreProducto).regexValidation);
  // console.log(validateInput("Price",precioProducto).regexValidation);
  // console.log(validateInput("Stock",stock).regexValidation);
  // console.log(validateInput("NameCat",selCategoria).regexValidation);

  CreateProducto(nombreProducto,precioProducto,stock,selCategoria)
  formularioAltaProducto.reset()

  // if(validateInput("Desc",nombreProducto).regexValidation && 
  //   validateInput("Price",precioProducto).regexValidation &&
  //   validateInput("Stock",stock).regexValidation &&
  //   validateInput("NameCat",selCategoria).regexValidation  
  // ){
  //   console.log("todo bien por ahora");
    
  //     if(CreateProducto(nombreProducto,precioProducto,stock,selCategoria)){
  //       console.log("todo bien")
  //       // nombreProducto=null;
  //       // precioProducto=null;
  //       // stock=null;
  //       // selCategoria=null;



  //     alert("Producto insertado con éxito")
  //     //formularioAltaProducto.reset()
  //     //location.reload();
  //   }
  //   else{
  //     console.log("todo mal")
  //     //alert("Error: producto no insertado (insertar msjs de error de validacion)")
  //   }
  //}
  // else{
  //   for(let msjError of validateInput("Desc",nombreProducto).errorMsg)
  //   errores.innerHTML=msjError;
  // }
  //validateInput("Desc",descri);

})
})
