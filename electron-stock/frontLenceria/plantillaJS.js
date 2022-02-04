//--------------------------- ventana Modal -----------------------------------------------
const modal = document.getElementById('ventanaModal')
const modalActualizar = document.getElementById('ventanaModal2')
const modalAgregarProducto = document.getElementById('ventanaModal3')
const btnCerrar = document.getElementById("cerrar")
var checkeado = document.getElementById('checkeado')

function abrirVentana() 
{
  document.getElementById('ventanaModal').classList.add('show')
    
    
};

function cerrarVentana() 
{
	document.getElementById('ventanaModal').classList.remove('show')
      
      
};

//-----------------------------------------------------------------------------------------------------------


//--------------------------Marcar y Desmarcar Checkbox y funcion btm eliminar----------------------------------------------------

function marcarDesmarcar(cb) 
{
	checkboxes=document.getElementsByTagName('input'); 
	for(i=0;i<checkboxes.length;i++)
	{
		if(checkboxes[i].type == "checkbox") 
		{
			checkboxes[i].checked=cb.checked
			
			if(checkboxes[i].checked==true)
			{
				document.getElementById('elim').value = document.getElementById('elim').classList.add('show')
				
			}
			else{
				document.getElementById('elim').value = document.getElementById('elim').classList.remove('show')
				
			}
		}
		

	}
}




//-------------------------- Modal Para Actualizar producto ------------------------
function abrirVentanaActualizar()
{
	modalActualizar.value = document.getElementById('ventanaModal2').classList.add('show')
}

function cerrarVentana2() 
{
  btnCerrar.value = document.getElementById('ventanaModal2').classList.remove('show')
      
      
};

//-------------------------- Modal Para Agregar Producto ------------------------
function abrirVentanaAddProduct()
{
	modalAgregarProducto.value = document.getElementById('ventanaModal3').classList.add('show')
}

function cerrarVentana3() 
{
  btnCerrar.value = document.getElementById('ventanaModal3').classList.remove('show')
      
      
};

//------------------------------------------------------------------------------------
// checkeado.addEventListener('click', function() {

// 	if(checkeado.checked) {
// 		document.getElementById('elim').value = document.getElementById('elim').classList.add('show')
// 	  } 
// 	  else {
// 		document.getElementById('elim').value = document.getElementById('elim').classList.remove('show')
// 	  }
	  
//   })

//-------------------------------------------------- pendiente --------------------------------------

function marcarDeaUno()
{
	if(checkeado.checked) {
		document.getElementById('elim').value = document.getElementById('elim').classList.add('show')
	  } 
	  else {
		document.getElementById('elim').value = document.getElementById('elim').classList.remove('show')
	  }
}

// ------------------------------------popover stock disponible----------------------------------------------------

$(document).ready(function(){
	$('[data-toggle="popover"]').popover();   
});