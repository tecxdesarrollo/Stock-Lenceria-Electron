const mysql=require("promise-mysql");
const {regexAntiSql,regexNameCat,regexDesc,regexPrice,regexStock,lengthNameCat,lengthDesc,validateInput}=require("./regex");


//const x="asd";
// const idCliente=1;
// const idModoPago=1
// const LSObj=[
//     {
//         "IdProductoCart": "2",
//         "CantidadCart": "1",
//         "DescripcionCart": "mouse",
//         "PrecioCart": "800.00"
//     },
//     {
//         "IdProductoCart": "1",
//         "CantidadCart": "2",
//         "DescripcionCart": "monitor 14in",
//         "PrecioCart": "12000.00"
//     }
// ]


const getConnection=async function(){
  const connection = await mysql.createConnection({
            host:"localhost",
            user: 'root',
            password: '',
            database: 'facturacion'
        });  

    return connection
}
    
//obtiene consultas selects dependiendo del prodedimiento que se le pasa////////
const getterDB=async function(procedure) {
    
    conn=await getConnection();

    const result = await conn.query("CALL "+procedure);
    conn.end();
    //console.log(result[0]);
    return result[0];
    
}
//////////////////////////////////////////////////////////////////////////////


//devuelve el total de ventas entre fechas//////////////////////////////////////////
const getTotalVentas=async function(fechaDesde,fechaHasta) {
    
    conn=await getConnection();

    const result = await conn.query("CALL get_total('"+fechaDesde+"','"+fechaHasta+"')");
    conn.end();
    //console.log(result[0]);
    return result[0];
    
}
///////////////////////////////////////////////////////////////////////////////////////

//devuelve el informe de ventas entre fechas/////////////////////////////////////////
const getInformeVentas=async function(fechaDesde,fechaHasta) {
    
    conn=await getConnection();

    const result = await conn.query("CALL get_informe('"+fechaDesde+"','"+fechaHasta+"')");
    conn.end();
    //console.log(result[0]);
    return result[0];
    
}
/////////////////////////////////////////////////////////////////////////////////////////



//alta categoria//////////////////////////////////////////////////////////////////
const CreateCategoria=async function(nombreCategoria, descripcionCategoria) {
    
    conn=await getConnection();

    const result = await conn.query("CALL insert_categoria('"+nombreCategoria+"','"+descripcionCategoria+"')");
    conn.end();
    console.log(result.protocol41);
    //return result;
    
}
////////////////////////////////////////////////////////////////////////////////


//alta producto//////////////////////////////////////////////////////////////////
const CreateProducto=async function(descripcionProducto, precio,stock,categoria) {
    //precio=12.12
    console.log(precio)
    
    if(validateInput("Desc",descripcionProducto).regexValidation && 
      validateInput("Price",precio).regexValidation &&
      validateInput("Stock",stock).regexValidation &&
      validateInput("NameCat",categoria).regexValidation  ) {

        conn=await getConnection();

        const result = await conn.query("CALL insert_producto('"+descripcionProducto+"','"+precio+"','"+stock+"','"+categoria+"')");
        conn.end();
        console.log(result.protocol41);
        //return result;

      }else{
        console.log("No inserte")
      }
    
}
////////////////////////////////////////////////////////////////////////////////

//funciones que Crean la nueva entrada en facturacion y detalles y actualiza la tabla productos//////////
const InsertFactura=async function(idCliente,idModoPago){
    conn=await getConnection();

    const queryInsert = await conn.query("CALL insert_factura("+idCliente+","+idModoPago+")");
    const queryGetLastFactura=await conn.query("CALL get_last_factura()");
    conn.end();
    //console.log(queryGetLastFactura[0][0].idFactura);
    return queryGetLastFactura[0][0].idFactura;
}

const InsertDetalle=async function(lastFactura,LSObj){
    let state=false

    conn=await getConnection();
    for(let Obj of LSObj){
        
        //console.log(Obj.DescripcionCart);
        var query1 = await conn.query("CALL update_stock("+lastFactura+","+Obj.IdProductoCart+","+Obj.CantidadCart+","+Obj.PrecioCart+")");
        state=true        
        
    }
    conn.end();
    return state
    
}

const UpdateStock=async function(idCliente,idModoPago,LSObj){
    
    conn=await getConnection();
    const lastFactura= await InsertFactura(idCliente,idModoPago);

    if(lastFactura){
        await InsertDetalle(lastFactura,LSObj);
    }
    conn.end();
    
}

module.exports={getterDB,CreateCategoria,UpdateStock,CreateProducto,getTotalVentas,getInformeVentas};

//////////////////////////////////////////////////////////////////////////////


//UpdateStock(idCliente,idModoPago,LSObj);
//CreateCategoria('qwdqwdqwdqw','dqwdqwddqwd2022' );
// getterDB("get_productos").then(x=>console.log(x));

// desde = '2018-08-23';
// hasta = '2022-08-23';
// getTotalVentas(desde,hasta).then(z=>console.log(z));
// getInformeVentas(desde,hasta).then(x=>console.log(x));

// getterDB("get_categorias").then(s=>console.log(s));
//getterDB("test").then(s=>console.log(s));
//CreateProducto("testeoDeAltaProductoNode22", 12,5,2);

