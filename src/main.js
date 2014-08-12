/***********************************************************************
Funciones para la multiplicacion de 2 matrices
***********************************************************************/
//Variables a usar para la multiplicación de 2 matrices
var mzAmult; 		//Matriz A 
var mzBmult; 		//Matriz B 
var mzRmult; 		//Matriz Resultante 
var flsAmult; 		//Filas Matriz A 
var colAmult;		//Columnas Matriz A 
var flsBmult;		//Filas Matriz B
var colBmult;		//Columnas Matriz B 

//Comprueba que las dimensiones de las matrices son correctas para poder multiplicarlas
function Comprobar() {
	flsAmult = parseInt(document.getElementById("flsAmult").value);
	colAmult = parseInt(document.getElementById("colAmult").value);
	flsBmult = parseInt(document.getElementById("flsBmult").value);
	colBmult = parseInt(document.getElementById("colBmult").value);
		
	if (isNaN(flsAmult) || isNaN(colAmult) || isNaN(flsBmult) || isNaN(colBmult)) {
		alert("Valores no v\u00e1lidos y/o espacios en blanco");
	}
	else if (colAmult != flsBmult) {
		alert("Dimensiones de las matrices no v\u00e1lidas.\nEl n\u00famero de columnas de A debe ser\nigual al n\u00famero de filas de B.");
	}
	else {
		//Administrar inputs
			var inputFA=document.getElementById("flsAmult");
				inputFA.setAttribute("disabled","disabled");
			var inputFB=document.getElementById("flsBmult");
				inputFB.setAttribute("disabled","disabled");
			var inputCA=document.getElementById("colAmult");
				inputCA.setAttribute("disabled","disabled");
			var inputCB=document.getElementById("colBmult");
				inputCB.setAttribute("disabled","disabled");
			
		//Administracion de los botones
			var crear=document.getElementById("crear");
				crear.setAttribute("disabled","disabled");
				crear.removeAttribute("enabled");
			var limpiar=document.getElementById("limpiar");
				limpiar.setAttribute("enabled","enabled");
				limpiar.removeAttribute("disabled");
			
		//Crear las matrices con los tamaños pasados por el usuario
			mzAmult = new CreaMatriz(flsAmult, colAmult);
			mzBmult = new CreaMatriz(flsBmult, colBmult);
			mzRmult = new CreaMatriz(flsAmult, colBmult);
		
		//Crear formularios para recibir los valores de la matrices
			var divMatrices=document.getElementById("matrices");
			divMatrices.setAttribute("style", "display: block;");
			//Matriz A
				var divMzA=document.getElementById("matrizA");
				CrearFormulario(divMzA,"mzAmult","am", true, flsAmult, colAmult);
			//Matriz B
				var divMzB=document.getElementById("matrizB");
				CrearFormulario(divMzB,"mzBmult","bm", true, flsBmult, colBmult);
			//Matriz Resultante
				var divMzR=document.getElementById("matrizRmult");
				CrearFormulario(divMzR,"mzRmult","rm", false, flsAmult, colBmult);
				matrizCeros(mzRmult,flsAmult,colBmult);
	}
}

//Funcion para crear una matriz
function CreaMatriz(n, m) {
	//DEFINIMOS EL TAMAÑO DE LA MATRIZ
	this.length = n;
	for (var i=0; i<n; i++) {
		this[i] = new Array(m);
	}
	return this;
}

//Funcion que crea los formularios para ingresar los valores de las matrices
function CrearFormulario(divPadre, idDivHijo, prefijo, editable, numFilas, numCols) {
	var divHijo = document.createElement("div");
	divHijo.setAttribute("id",idDivHijo );
	divHijo.setAttribute("style", "textAlign: center;");
	for(i=0;i<numFilas;i++){
		for(j=0;j<numCols;j++){
			var celda=document.createElement("input");
			celda.setAttribute("type","text");
			celda.setAttribute("id", prefijo+i+""+j);
			celda.setAttribute("size","4");
			if(!editable){
				celda.setAttribute("disabled","disabled");
			}
			divHijo.appendChild(celda);
		}
		var salto=document.createElement("br");
		divHijo.appendChild(salto);
	}
	divPadre.appendChild(divHijo);
}

//Funcion que llena matriz en ceros
function matrizCeros(matriz, numFilas, numCols){
		for(i=0;i<numFilas;i++){
			for(j=0;j<numCols;j++){
				matriz[i][j]=0;
			}
		}
	}

//Funcion que multiplica 2 matrices
function Multiplicar(){
	obtenerDatos(mzAmult,"am",flsAmult,colAmult);
	obtenerDatos(mzBmult,"bm",flsBmult,colBmult);
	for (i=0; i < flsAmult; i++){
		for (j=0; j < colBmult; j++){
			for (k=0; k < colAmult; k++){
				mzRmult[i][j] = mzRmult[i][j] + (mzAmult[i][k] * mzBmult[k][j]);
			}
			var celda=document.getElementById("rm"+i+""+j);
			celda.setAttribute("value",mzRmult[i][j]);
		}
	}
}

//Funcion para obtener datos de un formulario
function obtenerDatos(matriz,prefijo,numFilas, numCols){
	for(i=0;i<numFilas;i++){
		for(j=0;j<numCols;j++){
			var celda=parseInt(document.getElementById(prefijo+i+""+j).value);
			if(isNaN(celda)){
				alert("Valores no v\u00e1lidos y/o espacios en blanco")
				throw new Error("Error: Hay espacios vacios y/o valores invalidos");
			}else{
				matriz[i][j]=celda;
			}
		}
	}
}

//Funcion para limpiar la pantalla
function Limpiar(){
	//Administrar inputs
		var inputFA=document.getElementById("flsAmult");
			inputFA.setAttribute("enabled","enabled");
			inputFA.removeAttribute("disabled");
		var inputFB=document.getElementById("flsBmult");
			inputFB.setAttribute("enabled","enabled");
			inputFB.removeAttribute("disabled");
		var inputCA=document.getElementById("colAmult");
			inputCA.setAttribute("enabled","enabled");
			inputCA.removeAttribute("disabled");
		var inputCB=document.getElementById("colBmult");
			inputCB.setAttribute("enabled","enabled");
			inputCB.removeAttribute("disabled");
	//Administrar Botones
		var crear=document.getElementById("crear");
			crear.setAttribute("enabled","enabled");
			crear.removeAttribute("disabled");
		var limpiar=document.getElementById("limpiar");
			limpiar.setAttribute("disabled","disabled");
			limpiar.removeAttribute("enabled");
	
	//Administrar formularios
	var mR=document.getElementById("mzRmult");
		mR.parentNode.removeChild(mR);
	var mA=document.getElementById("mzAmult");
		mA.parentNode.removeChild(mA);
	var mB=document.getElementById("mzBmult");
		mB.parentNode.removeChild(mB);
	var inpFA=document.getElementById("flsAmult");
		inpFA.value="";
	var inpFB=document.getElementById("flsBmult");
		inpFB.value="";
	var inpCA=document.getElementById("colAmult");
		inpCA.value="";
	var inpCB=document.getElementById("colBmult");
		inpCB.value="";
	var divM=document.getElementById("matrices");
		divM.setAttribute("style","display: none;");
}

/***********************************************************************
Funciones para Sumar, Restar, Multiplicar por Escalar 2 matrices
***********************************************************************/
//Variables a usar para las operaciones de 2 matrices
var mzA; 			//Matriz A 
var mzB; 			//Matriz B 
var mzRSuma; 		//Matriz Resultante Suma
var mzRResta; 		//Matriz Resultante Resta
var mzREscalarA;	//Matriz A Resultante Multipliación por un escalar
var mzREscalarB;	//Matriz B Resultante Multipliación por un escalar
var filas; 			//Filas Matriz
var columnas;		//Columnas Matriz 
var escalar;		//Numero a multiplicar la Matriz

//Funcion para comprobar los valores ingresados para crear las matrices
function Operaciones(){
	filas = parseInt(document.getElementById("filas").value);
	columnas = parseInt(document.getElementById("columnas").value);
	escalar = parseInt(document.getElementById("escalar").value);
		
	if (isNaN(filas) || isNaN(columnas) || isNaN(escalar)) {
		alert("Valores no v\u00e1lidos y/o espacios en blanco");
	}else{
		//Administrar inputs
			var inputFilas=document.getElementById("filas");
				inputFilas.setAttribute("disabled","disabled");
			var inputColumnas=document.getElementById("columnas");
				inputColumnas.setAttribute("disabled","disabled");
			var inputEscalar=document.getElementById("escalar");
				inputEscalar.setAttribute("disabled","disabled");
		//Administracion de los botones
			var crear2=document.getElementById("crear2");
				crear2.setAttribute("disabled","disabled");
				crear2.removeAttribute("enabled");
			var limpiar2=document.getElementById("limpiar2");
				limpiar2.setAttribute("enabled","enabled");
				limpiar2.removeAttribute("disabled");
		//Crear las matrices con los tamaños pasados por el usuario
			mzA = new CreaMatriz(filas, columnas);
			mzB = new CreaMatriz(filas, columnas);
			mzRSuma = new CreaMatriz(filas, columnas);
			mzRResta = new CreaMatriz(filas, columnas);
			mzREscalarA = new CreaMatriz(filas, columnas);
			mzREscalarB = new CreaMatriz(filas, columnas);
		//Crear formularios para recibir los valores de la matrices
			var divMatrices2=document.getElementById("matrices2");
			divMatrices2.setAttribute("style", "display: block;");
			//Matriz A
				var divMzA=document.getElementById("matrizA2");
				CrearFormulario(divMzA,"mzA","ao", true, filas, columnas);
			//Matriz B
				var divMzB=document.getElementById("matrizB2");
				CrearFormulario(divMzB,"mzB","bo", true, filas, columnas);
			//Matriz Suma Resultante
				var divMzRs=document.getElementById("mzSuma");
				CrearFormulario(divMzRs,"mzRSuma","sr", false, filas, columnas);
				matrizCeros(mzRSuma,filas,columnas);
			//Matriz Resta Resultante
				var divMzRr=document.getElementById("mzResta");
				CrearFormulario(divMzRr,"mzRResta","rr", false, filas, columnas);
				matrizCeros(mzRResta,filas,columnas);
			//Matriz A Escalar Resultante
				var divMzARe=document.getElementById("mzEscalarA");
				CrearFormulario(divMzARe,"mzREscalarA","ear", false, filas, columnas);
				matrizCeros(mzREscalarA,filas,columnas);
			//Matriz B Escalar Resultante
				var divMzBRe=document.getElementById("mzEscalarB");
				CrearFormulario(divMzBRe,"mzREscalarB","ebr", false, filas, columnas);
				matrizCeros(mzREscalarB,filas,columnas);
	}
}

//Funcion para realizar las sumas, restas y multiplicaciones por escalar
function Calcular(){
	obtenerDatos(mzA,"ao",filas,columnas);
	obtenerDatos(mzB,"bo",filas,columnas);
	
	for (i=0; i < filas; i++){
		for (j=0; j < columnas; j++){
			//Calculo suma de dos matrices
				mzRSuma[i][j] = mzA[i][j] + mzB[i][j];
				var celda=document.getElementById("sr"+i+""+j);
				celda.setAttribute("value",mzRSuma[i][j]);
			//Calculo resta de dos matrices
				mzRResta[i][j] = mzA[i][j] - mzB[i][j];
				var celda=document.getElementById("rr"+i+""+j);
				celda.setAttribute("value",mzRResta[i][j]);
			//Calculo multiplicacion matriz A por un escalar
				mzREscalarA[i][j] = mzA[i][j] * escalar;
				var celda=document.getElementById("ear"+i+""+j);
				celda.setAttribute("value",mzREscalarA[i][j]);
			//Calculo multiplicacion matriz B por un escalar
				mzREscalarB[i][j] = mzB[i][j] * escalar;
				var celda=document.getElementById("ebr"+i+""+j);
				celda.setAttribute("value",mzREscalarB[i][j]);
		}
	}
}

//Funcion para limpiar la pantalla
function Limpiar2(){
	//Administrar inputs
		var inputFilas=document.getElementById("filas");
			inputFilas.setAttribute("enabled","enabled");
			inputFilas.removeAttribute("disabled");
		var inputColumnas=document.getElementById("columnas");
			inputColumnas.setAttribute("enabled","enabled");
			inputColumnas.removeAttribute("disabled");
		var inputEscalar=document.getElementById("escalar");
			inputEscalar.setAttribute("enabled","enabled");
			inputEscalar.removeAttribute("disabled");
	//Administrar Botones
		var crear2=document.getElementById("crear2");
			crear2.setAttribute("enabled","enabled");
			crear2.removeAttribute("disabled");
		var limpiar2=document.getElementById("limpiar2");
			limpiar2.setAttribute("disabled","disabled");
			limpiar2.removeAttribute("enabled");
	
	//Administrar formularios
	var mReA=document.getElementById("mzREscalarA");
		mReA.parentNode.removeChild(mReA);
	var mReB=document.getElementById("mzREscalarB");
		mReB.parentNode.removeChild(mReB);
	var mRr=document.getElementById("mzRResta");
		mRr.parentNode.removeChild(mRr);
	var mRs=document.getElementById("mzRSuma");
		mRs.parentNode.removeChild(mRs);
	var mA=document.getElementById("mzA");
		mA.parentNode.removeChild(mA);
	var mB=document.getElementById("mzB");
		mB.parentNode.removeChild(mB);
	
	var inpFilas=document.getElementById("filas");
		inpFilas.value="";
	var inpColumnas=document.getElementById("columnas");
		inpColumnas.value="";
	var inpEscalar=document.getElementById("escalar");
		inpEscalar.value="";
	var divM=document.getElementById("matrices2");
		divM.setAttribute("style","display: none;");
}

/***********************************************************************
Funciones para operaciones con vectores
***********************************************************************/
//Variables a usar para la operar de 2 vectores
var xA; 			//X vector A 
var yA; 			//Y vector A 
var zA; 			//Z vector A 
var xB; 			//X vector B 
var yB; 			//Y vector B 
var zB; 			//Z vector B  
var vectorA; 		//Vector A 
var vectorB;		//Vector B 
var vtrRSuma; 		//Vector Resultante Suma 
var vtrRResta;		//Vector Resultante Resta
var vtrAREscalar; 	//Vector A Resultante Multiplicación por Escalar 
var vtrBREscalar; 	//Vector B Resultante Multiplicación por Escalar 
var vtrRPEscalar=0;	//Resultante Producto Escalar
var vtrRPCruz; 		//Vector Resultante Producto Cruz 
var vrEscalar;		//Escalar a multiplicar

function Operar(){
	//Valores vector A
			xa=document.getElementById("xA");
		xA = parseInt(xa.value);
			ya=document.getElementById("yA");
		yA = parseInt(ya.value);
			za=document.getElementById("zA");
		zA = parseInt(za.value);
	//Valores vector B
			xb=document.getElementById("xB");
		xB = parseInt(xb.value);
			yb=document.getElementById("yB");
		yB = parseInt(yb.value);
			zb=document.getElementById("zB");
		zB = parseInt(zb.value);
	//Valor escalar	
		vrEsc=document.getElementById("vrEscalar");
	vrEscalar = parseInt(vrEsc.value);
	
	if (isNaN(xA) || isNaN(yA) || isNaN(zA)|| isNaN(xB) || isNaN(yB)|| isNaN(zB) || isNaN(vrEscalar)) {
		alert("Valores no v\u00e1lidos y/o espacios en blanco");
	}else{
		//Div Vectores
			var divVectores=document.getElementById("vectores");
				divVectores.setAttribute("style","display: block;");
		//Administracion de inputs
			xa.setAttribute("disabled","disabled");
			ya.setAttribute("disabled","disabled");
			za.setAttribute("disabled","disabled");
			xb.setAttribute("disabled","disabled");
			yb.setAttribute("disabled","disabled");
			zb.setAttribute("disabled","disabled");
			vrEsc.setAttribute("disabled","disabled");
		//Administracion de botones
			var crear3=document.getElementById("crear3");
				crear3.setAttribute("disabled","disabled");
			var limpiar3=document.getElementById("limpiar3");
				limpiar3.setAttribute("enabled","enabled");
				limpiar3.removeAttribute("disabled");
		//Crear Formularios
			//Vector Suma
			var vrSuma=document.getElementById("vrSuma");
				CrearFormulario(vrSuma, "vtrRSuma", "vrs", false, 1, 3);
			//Vector Resta
			var vrResta=document.getElementById("vrResta");
				CrearFormulario(vrResta, "vtrRResta", "vrr", false, 1, 3);
			//Vector A Multiplicacion por escalar
			var vrEscalarA=document.getElementById("vrEscalarA");
				CrearFormulario(vrEscalarA, "vtrAREscalar", "vrae", false, 1, 3);
			//Vector B multiplicacion por escalar
			var vrEscalarB=document.getElementById("vrEscalarB");
				CrearFormulario(vrEscalarB, "vtrBREscalar", "vrbe", false, 1, 3);
			//Vector Producto Cruz
			var vrPtoCruz=document.getElementById("vrPtoCruz");
				CrearFormulario(vrPtoCruz, "vtrRPCruz", "vrpc", false, 1, 3);			
			//Vector Producto Escalar
			var vrPtoEscalar=document.getElementById("vrPtoEscalar");
				CrearFormulario(vrPtoEscalar, "vtrRPEscalar", "vrpe", false, 1, 1);

		//Creacion de los vectores 
			vectorA=new Array(xA,yA,zA);
			vectorB=new Array(xB,yB,zB);
			vtrRSuma= new Array(3);
			vtrRResta= new Array(3);
			vtrAREscalar= new Array(3);
			vtrBREscalar= new Array(3);
			vtrRPCruz= new Array(3);
		
		for(i=0;i<3;i++){
			//Vector Suma
				vtrRSuma[i]= vectorA[i] + vectorB[i];
				var sum= document.getElementById("vrs0"+""+i);
				sum.value=vtrRSuma[i];
			//Vector Resta
				vtrRResta[i]= vectorA[i] - vectorB[i];
				var rest= document.getElementById("vrr0"+""+i);
				rest.value=vtrRResta[i];
			//Vector A multiplicacion por escalar
				vtrAREscalar[i]= vectorA[i] * vrEscalar;
				var aEsc= document.getElementById("vrae0"+""+i);
				aEsc.value=vtrAREscalar[i];
			//Vector B multiplicacion por escalar	
				vtrBREscalar[i]= vectorB[i] * vrEscalar;
				var bEsc= document.getElementById("vrbe0"+""+i);
				bEsc.value=vtrBREscalar[i];
			//Vector Producto Escalar
				vtrRPEscalar= vtrRPEscalar + (vectorA[i]*vectorB[i]);
		}
		
		//Datos Vector Producto Escalar
			var pEsc= document.getElementById("vrpe00");
				pEsc.value=vtrRPEscalar;
		
		//Producto Cruz
		vtrRPCruz[0]=(vectorA[1]*vectorB[2])-(vectorA[2]*vectorB[1]);
		vtrRPCruz[1]=(vectorA[0]*vectorB[2])-(vectorA[2]*vectorB[0]);
		vtrRPCruz[2]=(vectorA[0]*vectorB[1])-(vectorA[1]*vectorB[0]);
		//Datos Vector Producto Cruz
		var vrpc0= document.getElementById("vrpc00");
			vrpc0.value=vtrRPCruz[0];
		var vrpc1= document.getElementById("vrpc01");
			vrpc1.value=vtrRPCruz[1];
		var vrpc2= document.getElementById("vrpc02");
			vrpc2.value=vtrRPCruz[2];
		
	}
}

function Limpiar3(){
	//Administrar inputs
		var xa=document.getElementById("xA");
			xa.setAttribute("enabled","enabled");
			xa.removeAttribute("disabled");
			xa.value="";
		var ya=document.getElementById("yA");
			ya.setAttribute("enabled","enabled");
			ya.removeAttribute("disabled");
			ya.value="";
		var za=document.getElementById("zA");
			za.setAttribute("enabled","enabled");
			za.removeAttribute("disabled");
			za.value="";
		var xb=document.getElementById("xB");
			xb.setAttribute("enabled","enabled");
			xb.removeAttribute("disabled");
			xb.value="";
		var yb=document.getElementById("yB");
			yb.setAttribute("enabled","enabled");
			yb.removeAttribute("disabled");
			yb.value="";
		var zb=document.getElementById("zB");
			zb.setAttribute("enabled","enabled");
			zb.removeAttribute("disabled");
			zb.value="";
		var  vrEsc=document.getElementById("vrEscalar");
			vrEsc.setAttribute("enabled","enabled");
			vrEsc.removeAttribute("disabled");
			vrEsc.value="";

	//Administrar Botones
		var crear3=document.getElementById("crear3");
			crear3.setAttribute("enabled","enabled");
			crear3.removeAttribute("disabled");
		var limpiar3=document.getElementById("limpiar3");
			limpiar3.setAttribute("disabled","disabled");
			limpiar3.removeAttribute("enabled");
	
	//Administrar Formularios
		var vrSuma=document.getElementById("vtrRSuma");
			vrSuma.parentNode.removeChild(vrSuma);
		var vrResta=document.getElementById("vtrRResta");
			vrResta.parentNode.removeChild(vrResta);
		var vrEscalarA=document.getElementById("vtrAREscalar");
			vrEscalarA.parentNode.removeChild(vrEscalarA);
		var vrEscalarB=document.getElementById("vtrBREscalar");
			vrEscalarB.parentNode.removeChild(vrEscalarB);
		var vrPtoCruz=document.getElementById("vtrRPCruz");
			vrPtoCruz.parentNode.removeChild(vrPtoCruz);		
		var vrPtoEscalar=document.getElementById("vtrRPEscalar");
			vrPtoEscalar.parentNode.removeChild(vrPtoEscalar);
	
	var divVectores=document.getElementById("vectores");
		divVectores.setAttribute("style","display: none;");
}