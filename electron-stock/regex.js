
const regexAntiSql = new RegExp(/\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b/) 

// Regex Categoria
const regexNameCat = new RegExp(/^[ñÑA-Za-z0-9\s]+$/); //Nombre categoria

const lengthNameCat = 45


// Regex Producto
const regexDesc = new RegExp(/^[ñÑA-Za-z0-9\s]+$/); //deberia admitir mas caracteres
const regexPrice = new RegExp(/^-?\d{1,14}(\.\d{1,2})?$/); //ver si . o , aca
const regexStock = new RegExp(/^[0-9]*$|^null$/);

const lengthDesc = 45


// Inputs de testeo (borrar o comentar)
//console.log(validateInput("Stock", "32"))
//console.log(validateInput("Desc", "descINSERTINSERTINSERTINSERTINSERTINSERTINSERTINSERTINSERTINSERTljlaskdjhaslkjdhakljsdhklajsdhklajhsdklajsd"))

 
function validateInput(regexType, regexInput) {
    inputValJson = {
        regexValidation: false,
        errorMsg: []
    } // coloco aca para asegurar q siempre se reinice

    if (regexInput.length == 0) {
        inputValJson.errorMsg.push('Complete todos los campos')
    }
    else if (regexAntiSql.test(regexInput.toUpperCase())) {
        inputValJson.errorMsg.push('SQL injection')
    }
    else {

        switch (regexType) {
            case "NameCat":
                if (regexInput.length > lengthNameCat) {
                    inputValJson.errorMsg.push('Categoría: Parámetros muy largos, debe ingresar menos de '+ lengthNameCat + ' caracteres')
                }
                if (!regexNameCat.test(regexInput)) {
                    inputValJson.errorMsg.push('Categoria: Caracteres no permitidos')
                }
                break;
        
            case "Desc":

                if (regexInput.length > lengthDesc) {
                    inputValJson.errorMsg.push('Descripción: Parámetros muy largos, debe ingresar menos de '+ lengthDesc + ' caracteres')
                }
                if (!regexDesc.test(regexInput)) {
                    inputValJson.errorMsg.push('Descripción: Caracteres no permitidos')
                }
                
                break;

            case "Price":
                if (!regexPrice.test(regexInput)) {
                    inputValJson.errorMsg.push('Precio: debe ingresar solo números en la forma 123.45');
                }
                break;
        
            case "Stock":
                if (!regexStock.test(regexInput)) {
                    inputValJson.errorMsg.push('Stock: debe ingresar solo números');
                }
                break;

            default:
                break;
        }
    }

    if (inputValJson.errorMsg.length == 0) {
        inputValJson.regexValidation = true
    }
    //inputValJson.regexValidation = true
    return inputValJson

}

module.exports={regexAntiSql,regexNameCat,regexDesc,regexPrice,regexStock,lengthNameCat,lengthDesc,validateInput};