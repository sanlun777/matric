var gm = new Map();
var gn = new Map();

gm.set("matrize", 2);
gm.set("baseA", 2);
gm.set("baseB", 2);
gm.set("gramsh", 2);
gm.set("cbase", 2);

gn.set("matrize", 2);
gn.set("baseA", 2);
gn.set("baseB", 2);
gn.set("gramsh", 2);
gn.set("cbase", 2);

var deti = 0;
var matglob = new Array(2 * 2);

//Bloque de manejo de arrastre y suelte

function manejoArrastre(event) {
    //Poner efecto que pase cuando todavía no se suelte el arrastre

    //Para que no lo abra el buscador como archivo
    event.preventDefault();

    console.log('Evento arrastro');

};

function manejoSuelta(event) {

    //Para que no lo abra el buscador como archivo
    event.preventDefault();
    console.log('Si sirve');
    tMatriz = document.getElementById("matrize");
    //Iterar los archivos, si existen 1 o más de 1 de ellos
    if (event.dataTransfer.items) {
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
            if (event.dataTransfer.items[i].kind === 'file') {
                var archivo = event.dataTransfer.items[i].getAsFile();
                var lector = new FileReader();
                //Cuando se cargue el archivo:
                lector.onload = function() {
                    //Quitar listeners, para que no se disparen cada ves que se ingrese un valor

                    cambiat(1, 1, "matrize");
                    //Dividir todo el string a filas
                    var filas = lector.result.split(/\r?\n/);
                    for (var e = filas.length - 1; e >= 0; e--)
                        if (filas[e] == '')
                            filas.splice(e, 1);
                    console.log('filas:');
                    console.log(filas);
                    //Checar que haya, por lo menos, una fila
                    if (filas.length >= 1) {
                        tMatriz.removeAttribute('onchange');
                        for (var i = 0; i < filas.length; i++) {
                            var columna = filas[i].split(' ');
                            console.log('columnas:');
                            console.log(columna);
                            var j = columna.length;
                            for (var e = columna.length - 1; e >= 0; e--)
                                if (columna[e] == '')
                                    columna.splice(e, 1);

                            if (columna.length > gm.get("matrize")) {
                                //Cambiar tamaño, si es que excede el máximo
                                cambiat(filas.length, columna.length, "matrize");
                            }
                            for (var k = 0; k < columna.length; k++) {
                                //Le asignamos el valor del string. Si es un valor inválido, se traducirá a un 0 al subirse al array interno
                                document.getElementById("matrize" + (i + 1) + ',' + (k + 1)).value = columna[k];
                            }
                        }

                        for (var i = 0; i < gm.get("matrize"); i++)
                            for (var j = 0; j < gn.get("matrize"); j++) {
                                var campo = document.getElementById("matrize" + (i + 1) + ',' + (j + 1));
                                if (campo.value == '')
                                    campo.value = '[V]';
                            }
                        calculaMat();
                        tMatriz.setAttribute('onchange', 'calculaMat();');
                    }
                    else {
                        //TODO: Mensaje de que el archivo es inválido (en HTML)
                        console.log("El archivo no es válido: Menos de una fila detectada");
                    }

                };

                //Leemos como texto
                lector.readAsText(archivo);
            }

            else console.log(i + 'no es un archivo.')
        }
    }

    else {
        for (var i = 0; i < event.dataTransfer.files.length; i++) {
            console.log('Acceder archivos')
        }
    }
};

function manejoSueltagr(event) {

    //Para que no lo abra el buscador como archivo
    event.preventDefault();
    console.log('Si sirve');
    var tGram = document.getElementById("gram");
    //Iterar los archivos, si existen 1 o más de 1 de ellos
    if (event.dataTransfer.items) {
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
            if (event.dataTransfer.items[i].kind === 'file') {
                var archivo = event.dataTransfer.items[i].getAsFile();
                var lector = new FileReader();
                //Cuando se cargue el archivo:
                lector.onload = function() {
                    //Quitar listeners, para que no se disparen cada ves que se ingrese un valor

                    cambiat(1, 1, "gramsh");
                    //Dividir todo el string a filas, por medio de espacios
                    var filas = lector.result.split(/\r?\n/);
                    for (var e = filas.length - 1; e >= 0; e--)
                        if (filas[e] == '')
                            filas.splice(e, 1);
                    console.log('filas:');
                    console.log(filas);
                    //Checar que haya, por lo menos, una vector(fila)
                    if (filas.length >= 1) {
                        tGram.removeAttribute('onchange');
                        for (var i = 0; i < filas.length; i++) {
                            var columna = filas[i].split(' ');
                            console.log('columnas:');
                            console.log(columna);
                            var j = columna.length;
                            //Tumbamos espacios vacios
                            for (var e = columna.length - 1; e >= 0; e--)
                                if (columna[e] == '')
                                    columna.splice(e, 1);

                            if (columna.length > gn.get("gramsh")) {
                                //Cambiar tamaño, si es que excede el máximo
                                cambiat(columna.length, filas.length, "gramsh");
                            }
                            for (var k = 0; k < columna.length; k++) {
                                //Le asignamos el valor del string. Si es un valor inválido, se traducirá a un 0 al subirse al array interno
                                //Valor de fila
                                document.getElementById("gramsh" + (k + 1) + ',' + (i + 1)).value = columna[k];
                            }
                        }

                        //Se toman los espacios vacios como erroneos
                        for (var i = 0; i < gm.get("gramsh"); i++)
                            for (var j = 0; j < gn.get("gramsh"); j++) {
                                var campo = document.getElementById("gramsh" + (i + 1) + ',' + (j + 1));
                                if (campo.value == '')
                                    campo.value = '[V]';
                            }
                        calculaGram();
                        tGram.setAttribute('onchange', 'calculaGram();');
                    }
                    else {
                        //TODO: Mensaje de que el archivo es inválido (en HTML)
                        console.log("El archivo no es válido: Menos de una fila detectada");
                    }

                };

                //Leemos como texto
                lector.readAsText(archivo);
            }

            else console.log(i + 'no es un archivo.')
        }
    }

    else {
        for (var i = 0; i < event.dataTransfer.files.length; i++) {
            console.log('Acceder archivos')
        }
    }
};

function manejoSueltacb(event) {

    //Para que no lo abra el buscador como archivo
    event.preventDefault();
    console.log('Si sirve');
    var tBaseA = document.getElementById("baseA");
    var tBaseB = document.getElementById("baseB");
    //Iterar los archivos, si existen 1 o más de 1 de ellos
    if (event.dataTransfer.items) {
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
            if (event.dataTransfer.items[i].kind === 'file') {
                var archivo = event.dataTransfer.items[i].getAsFile();
                var lector = new FileReader();
                //Cuando se cargue el archivo:
                lector.onload = function() {
                    //Quitar listeners, para que no se disparen cada ves que se ingrese un valor

                    cambiat(1, 1, "baseA");
                    cambiat(1, 1, "baseB");
                    //

                    //Dividir el string en 2 bases, por medio de #
                    var bases = lector.result.split('#');

                    //Dividir todo el string a filas, por medio de espacios
                    if(bases.length == 2){
                        var filasA = bases[0].split(/\r?\n/);
                        var filasB = bases[1].split(/\r?\n/);
                        for (var e = filasA.length - 1; e >= 0; e--)
                            if (filasA[e] == '')
                                filasA.splice(e, 1);
                        console.log('filasA:');
                        console.log(filasA);

                        for (var e = filasB.length - 1; e >= 0; e--)
                            if (filasB[e] == '')
                                filasB.splice(e, 1);
                        console.log('filasB:');
                        console.log(filasB);
                        //Checar que haya, por lo menos, una vector(fila)
                        if (filasA.length >= 1 && filasB.length >= 1) {
                            tBaseA.removeAttribute('onchange');
                            tBaseB.removeAttribute('onchange');

                            var tam = tablaPrint("baseA", filasA, 0);
                            tablaPrint("baseB", filasB, tam);

                            calculaBase();
                            tBaseA.setAttribute('onchange', 'calculaBase();');
                            tBaseB.setAttribute('onchange', 'calculaBase();');
                        }
                        else {
                            //TODO: Mensaje de que el archivo es inválido (en HTML)
                            console.log("El archivo no es válido: Menos de una fila detectada");
                        }
                    }

                };

                //Leemos como texto
                lector.readAsText(archivo);
            }

            else console.log(i + 'no es un archivo.')
        }
    }

    else {
        for (var i = 0; i < event.dataTransfer.files.length; i++) {
            console.log('Acceder archivos')
        }
    }
};

function tablaPrint(mutado, filas, maxCLen) {
    for (var i = 0; i < filas.length; i++) {
        var columna = filas[i].split(' ');
        console.log('columnas:');
        console.log(columna);
        var j = columna.length;
        //Tumbamos espacios vacios
        for (var e = columna.length - 1; e >= 0; e--)
            if (columna[e] == '')
                columna.splice(e, 1);

        if (columna.length > gn.get(mutado)) {
            maxCLen = (columna.length > maxCLen) ? (columna.length) : (maxCLen);
            //Cambiar tamaño, si es que excede el máximo
            cambiat(maxCLen, maxCLen, mutado);
        }
        if(maxCLen > i)
            for (var k = 0; k < maxCLen; k++) {
            //Le asignamos el valor del string. Si es un valor inválido, se traducirá a un 0 al subirse al array interno
            //Valor de fila
            document.getElementById(mutado + (k + 1) + ',' + (i + 1)).value = columna[k];
            }
    }

    //Se toman los espacios vacios como erroneos
    for (var i = 0; i < gm.get(mutado); i++)
        for (var j = 0; j < gn.get(mutado); j++) {
            var campo = document.getElementById(mutado + (i + 1) + ',' + (j + 1));
            if (campo.value == '')
                campo.value = '[V]';
        }

    return maxCLen;

};

function manejoSueltacba(event) {

    //Para que no lo abra el buscador como archivo
    event.preventDefault();
    console.log('Si sirve');
    var tBase = document.getElementById("cbaser");
    //Iterar los archivos, si existen 1 o más de 1 de ellos
    if (event.dataTransfer.items) {
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
            if (event.dataTransfer.items[i].kind === 'file') {
                var archivo = event.dataTransfer.items[i].getAsFile();
                var lector = new FileReader();
                //Cuando se cargue el archivo:
                lector.onload = function() {
                    //Quitar listeners, para que no se disparen cada ves que se ingrese un valor

                    cambiat(1, 1, "cbase");
                    //Dividir todo el string a filas, por medio de espacios
                    var filas = lector.result.split(/\r?\n/);
                    for (var e = filas.length - 1; e >= 0; e--)
                        if (filas[e] == '')
                            filas.splice(e, 1);
                    console.log('filas:');
                    console.log(filas);
                    //Checar que haya, por lo menos, una vector(fila)
                    if (filas.length >= 1) {
                        tBase.removeAttribute('onchange');
                        for (var i = 0; i < filas.length; i++) {
                            var columna = filas[i].split(' ');
                            console.log('columnas:');
                            console.log(columna);
                            var j = columna.length;
                            //Tumbamos espacios vacios
                            for (var e = columna.length - 1; e >= 0; e--)
                                if (columna[e] == '')
                                    columna.splice(e, 1);

                            if (columna.length > gn.get("cbase")) {
                                //Cambiar tamaño, si es que excede el máximo
                                cambiat(columna.length, filas.length, "cbase");
                            }
                            for (var k = 0; k < columna.length; k++) {
                                //Le asignamos el valor del string. Si es un valor inválido, se traducirá a un 0 al subirse al array interno
                                //Valor de fila
                                document.getElementById("cbase" + (k + 1) + ',' + (i + 1)).value = columna[k];
                            }
                        }

                        //Se toman los espacios vacios como erroneos
                        for (var i = 0; i < gm.get("cbase"); i++)
                            for (var j = 0; j < gn.get("cbase"); j++) {
                                var campo = document.getElementById("cbase" + (i + 1) + ',' + (j + 1));
                                if (campo.value == '')
                                    campo.value = '[V]';
                            }
                        calculaCbase();
                        tBase.setAttribute('onchange', 'calculaCbase();');
                    }
                    else {
                        //TODO: Mensaje de que el archivo es inválido (en HTML)
                        console.log("El archivo no es válido: Menos de una fila detectada");
                    }

                };

                //Leemos como texto
                lector.readAsText(archivo);
            }

            else console.log(i + 'no es un archivo.')
        }
    }

    else {
        for (var i = 0; i < event.dataTransfer.files.length; i++) {
            console.log('Acceder archivos')
        }
    }
};



//Bloque de manejo de entradas a la matriz

function agregaColumna(mutado) {
    for (var i = 1; i < gm.get(mutado) + 1; i++) {
        //Búsqueda de la fila i de la matriz
        var ultFila = document.getElementById(mutado + i.toString());

        //Creación de una de las celdas de la nueva columna
        var nuevaColumna = document.createElement('th');
        nuevaColumna.setAttribute('id', mutado + i + '.' + (gn.get(mutado) + 1));

        //Creación de la entrada de la celda
        var elementoEntrada = document.createElement('input');
        elementoEntrada.setAttribute('id', mutado + i + ',' + (gn.get(mutado) + 1));
        elementoEntrada.setAttribute('placeholder', '0');

        nuevaColumna.appendChild(elementoEntrada);

        ultFila.appendChild(nuevaColumna);

    }
    gn.set(mutado, gn.get(mutado) + 1);
    try {
        document.getElementById(mutado + 'redcol').removeAttribute('hidden');
    }
    catch (ex) { }
    calculaMat();
};

function agregaFila(mutado) {
    //Búsqueda de la tabla, para agregar última fila
    var matr = document.getElementById(mutado + 'mat');
    var nuevaFila = document.createElement('tr');
    nuevaFila.setAttribute('id', mutado + (gm.get(mutado) + 1).toString());

    for (var j = 1; j < gn.get(mutado) + 1; j++) {

        //Creación de una de las celdas de la nueva columna
        var nuevaColumna = document.createElement('th');
        nuevaColumna.setAttribute('id', mutado + (gm.get(mutado) + 1) + '.' + j);

        //Creación de la entrada de la celda
        var elementoEntrada = document.createElement('input');
        elementoEntrada.setAttribute('id', mutado + (gm.get(mutado) + 1) + ',' + j);
        elementoEntrada.setAttribute('placeholder', '0');

        nuevaColumna.appendChild(elementoEntrada);

        nuevaFila.appendChild(nuevaColumna);

    }

    //Agregando la fila creada
    matr.appendChild(nuevaFila);
    gm.set(mutado, gm.get(mutado) + 1);
    try {
        document.getElementById(mutado + 'redfil').removeAttribute('hidden');
    }
    catch (ex) { }
    calculaMat();
};

function reduceFila(mutado) {
    var quita = document.getElementById(mutado + gm.get(mutado));
    quita.parentNode.removeChild(quita);
    gm.set(mutado, gm.get(mutado) - 1);
    if (gm.get(mutado) == 1)
        try {
            document.getElementById(mutado + 'redfil').setAttribute('hidden', true);
        }
        catch (ex) { }
    calculaMat();
};

function reduceColumna(mutado) {
    var mutobj = document.getElementById(mutado);
    for (var i = 1; i < gm.get(mutado) + 1; i++) {
        var quita = document.getElementById(mutado + i + '.' + gn.get(mutado));
        quita.parentNode.removeChild(quita);
    }

    gn.set(mutado, gn.get(mutado) - 1);

    if (gn.get(mutado) == 1)
        try {
            document.getElementById(mutado + 'redcol').setAttribute('hidden', true);
        }
        catch (ex) { }

    calculaMat();
};

function cambiat(mn, nn, mutado) {
    if (mn > gm.get(mutado)) {
        for (var i = gm.get(mutado); i < mn; i++)
            agregaFila(mutado);
    }
    else if (mn < gm.get(mutado)) {
        for (var i = mn; i < gm.get(mutado); i++)
            reduceFila(mutado);
    }

    if (nn > gn.get(mutado)) {
        for (var i = gn.get(mutado); i < nn; i++)
            agregaColumna(mutado);
    }
    else if (nn < gn.get(mutado)) {
        for (var i = nn; i < gn.get(mutado); i++)
            reduceColumna(mutado);
    }
};

function recogeMat(mutado) {
    matglob = new Array(gm.get(mutado) * gn.get(mutado));
    var success = true;
    for (var i = 0; i < gm.get(mutado); i++)
        for (var j = 0; j < gn.get(mutado); j++) {
            var campo = document.getElementById(mutado + (i + 1) + ',' + (j + 1));
            var entrada;
            if (campo.value == '') {
                entrada = new Fraction(0);
            }
            else {
                try {
                    entrada = new Fraction(campo.value);
                }
                catch (ex) {
                    campo.setAttribute('error', 'true');
                    entrada = new Fraction(0);
                    success = false;
                    console.log(ex.message);

                }
            }
            matglob[i * gn.get(mutado) + j] = entrada;
        }
    return success;
};

function limpiaError(mutado) {
    for (var i = 0; i < gm.get(mutado); i++)
        for (var j = 0; j < gn.get(mutado); j++) {
            var campo = document.getElementById(mutado + (i + 1) + ',' + (j + 1));
            campo.removeAttribute('error');
        }
}

function limpiaMat(mutado) {
    matglob = new Array(gm.get(mutado) * gn.get(mutado));
    for (var i = 0; i < gm.get(mutado); i++)
        for (var j = 0; j < gn.get(mutado); j++) {
            document.getElementById(mutado + (i + 1) + ',' + (j + 1)).value = '';
            matglob[i * gn.get(mutado) + j] = 0;
        }
    document.getElementById('entrada').onchange();
};

function muestraMat(mat, m, n, loc) {
    var matr = document.getElementById(loc);
    matr.innerHTML = '';

    var disp = 0;
    for (var i = 0; i < m; i++) {
        var nuevaFila = document.createElement('tr');
        for (var j = 0; j < n; j++) {
            var celda = document.createElement('th');
            var val = mat[disp + j];
            if (val['d'] == 1)
                celda.appendChild(document.createTextNode(val.toString()));
            else if (val['s'] == -1) {
                var tablae = document.createElement('table');
                var tabla = document.createElement('tbody');


                var fila1 = document.createElement('tr');

                var ele1 = document.createElement('th');
                ele1.appendChild(document.createTextNode(''));
                fila1.appendChild(ele1);

                var ele2 = document.createElement('th');
                ele2.appendChild(document.createTextNode(val['n'].toString()));
                fila1.appendChild(ele2);
                tabla.appendChild(fila1);


                var fila2 = document.createElement('tr');

                var ele3 = document.createElement('th');
                ele3.appendChild(document.createTextNode('-'));
                fila2.appendChild(ele3);

                var ele4 = document.createElement('th');
                ele4.appendChild(document.createElement('hr'));
                fila2.appendChild(ele4);
                tabla.appendChild(fila2);


                var fila3 = document.createElement('tr');

                var ele5 = document.createElement('th');
                ele5.appendChild(document.createTextNode(''));
                fila3.appendChild(ele5);

                var ele6 = document.createElement('th');
                ele6.appendChild(document.createTextNode(val['d'].toString()));
                fila3.appendChild(ele6);
                tabla.appendChild(fila3);

                tablae.appendChild(tabla);
                celda.appendChild(tablae);
            }
            else {
                var tablae = document.createElement('table');
                var tabla = document.createElement('tbody');
                var fila1 = document.createElement('tr');
                fila1.appendChild(document.createElement('th').appendChild(document.createTextNode(val['n'].toString())));
                tabla.appendChild(fila1);

                var fila2 = document.createElement('tr');
                fila2.appendChild(document.createElement('th').appendChild(document.createElement('hr')));
                tabla.appendChild(fila2);

                var fila3 = document.createElement('tr');
                fila3.appendChild(document.createElement('th').appendChild(document.createTextNode(val['d'].toString())));
                tabla.appendChild(fila3);
                tablae.appendChild(tabla);
                celda.appendChild(tabla);
            }
            nuevaFila.appendChild(celda);
        }
        matr.appendChild(nuevaFila);
        disp += n;
    }
};

function calculaMat() {
    var jordana = document.getElementById('jordana').checked;
    var inversada = document.getElementById('inversada').checked;
    var determinada = document.getElementById('determinada').checked;
    limpiaError("matrize");
    if (recogeMat("matrize")) {
        document.getElementById('error').setAttribute('hidden', true);
        if (gm.get("matrize") == gn.get("matrize")) {
            var matinv = invers(matglob, gm.get("matrize"));
            //gaussJordan(matglob, gm, gn);
            if (identestc(matglob, gm.get("matrize"), gn.get("matrize"))) {
                //No queremos gauss, únicamente obtendremos la matriz identidad
                if (jordana) {
                    muestraMat(matglob, gm.get("matrize"), gn.get("matrize"), 'res');
                    document.getElementById('gauss').removeAttribute('hidden');
                }

                else {
                    document.getElementById('gauss').setAttribute('hidden', true);
                }
                //Como obtuvimos la matriz identidad, significa que es invertible
                if (inversada) {
                    muestraMat(matinv, gm.get("matrize"), gn.get("matrize"), 'ies');
                    document.getElementById('inv').removeAttribute('hidden');
                }
                else {
                    document.getElementById('inv').setAttribute('hidden', true);
                }
            }
            else {
                //No queremos matriz inversa
                document.getElementById('inv').setAttribute('hidden', true);
                //pero si Gauss(?)
                if (jordana) {
                    muestraMat(matglob, gm.get("matrize"), gn.get("matrize"), 'res');
                    document.getElementById('gauss').removeAttribute('hidden');
                }

                else {
                    document.getElementById('gauss').setAttribute('hidden', true);
                }
            }
            if (determinada) {
                var deta = new Array();
                deta.push(deti);
                muestraMat(deta, 1, 1, 'des');
                document.getElementById('det').removeAttribute('hidden');
            }
            else {
                document.getElementById('det').setAttribute('hidden', true);
            }

        }
        else {
            //Si queremos Gauss
            gaussJordan(matglob, gm.get("matrize"), gn.get("matrize"));
            muestraMat(matglob, gm.get("matrize"), gn.get("matrize"), 'res');
            document.getElementById('gauss').removeAttribute('hidden');

            //No queremos inversa, no es matriz cuadrada
            document.getElementById('inv').setAttribute('hidden', true);
            document.getElementById('det').setAttribute('hidden', true);
        }
    }
    else {
        document.getElementById('error').removeAttribute('hidden');
    }
};

function muestraGJ() {
    document.getElementById("matriz-container").removeAttribute('hidden');
    document.getElementById("cambio-container").setAttribute('hidden', true);
    document.getElementById("grammsh-container").setAttribute('hidden', true);
    document.getElementById("cbase-container").setAttribute('hidden', true);
}

function muestraCB() {
    document.getElementById("matriz-container").setAttribute('hidden', true);
    document.getElementById("cambio-container").removeAttribute('hidden');
    document.getElementById("grammsh-container").setAttribute('hidden', true);
    document.getElementById("cbase-container").setAttribute('hidden', true);
}

function muestraGS() {
    document.getElementById("matriz-container").setAttribute('hidden', true);
    document.getElementById("cambio-container").setAttribute('hidden', true);
    document.getElementById("grammsh-container").removeAttribute('hidden');
    document.getElementById("cbase-container").setAttribute('hidden', true);
}

function muestraComB() {
    document.getElementById("matriz-container").setAttribute('hidden', true);
    document.getElementById("cambio-container").setAttribute('hidden', true);
    document.getElementById("grammsh-container").setAttribute('hidden', true);
    document.getElementById("cbase-container").removeAttribute('hidden');
}

function hide(id) {
    document.getElementById(id).setAttribute("hidden", true);
}

function unhide(id) {
    document.getElementById(id).removeAttribute("hidden");
}

function calculaBase() {
    var baseA;
    var baseB;

    var mm = gm.get("baseA");

    hide("alertald");
    hide("errorld");
    hide("errorrec");

    if (recogeMat("baseA")) {
        baseA = matglob.slice();
        if (recogeMat("baseB"))
            baseB = matglob.slice();
        else {
            unhide("errorrec");
            return false;
        }
    }
    else {
        unhide("errorrec");
        return false;
    }

    var aInv = baseA.slice();

    //Sacamos la transpuesta y le hacemos gauss para determinar dimension, puede justificarse por la naturaleza de las operaciones que se realizan en las operaciones de Gauss-Jordan

    transpose2(aInv, mm, mm);
    gaussJordan(aInv, mm, mm);


    var bInv = baseB.slice();

    transpose2(bInv, mm, mm);
    gaussJordan(bInv, mm, mm);

    var print;
    //Si son de la misma dimensión,

    var res1 = identestn(aInv, mm, mm);
    var res2 = identestn(bInv, mm, mm);

    if (res1 == res2) {
        print = cambiobase(baseA, baseB, mm);
        //Imprimimos matriz de cambio de base, gg

        muestraMat(print, mm, mm, 'ces');

        if (res1 = ! -1)
            //Alertald si es de menor dimensión
            unhide("alertald");

    }

    else {
        unhide("errorld");
        return false;
    }

}

function calculaGram() {
    var mm = gm.get("gramsh");
    var nn = gn.get("gramsh");
    hide("advld");
    //hide("gramsh");

    if (!recogeMat("gramsh")) {
        unhide("errorparsg");
        return false;
    }

    var mod = transpose(matglob, mm, nn);
    //La matriz se modifica por referencia, recordemos que es transpuesta
    var nVec = grammsh2(mod, nn, mm, 1);

    //Si hay menos vectores de los que al principio, entonces es ld
    if (nVec != nn)
        unhide("advld");

    //Preparamos para presentar las bases encontradas en vertical
    var print = transpose(mod, nVec, mm);
    muestraMat(print, mm, nVec, "ges");
}

function calculaCbase() {
    var mm = gm.get("cbase");
    var nn = gn.get("cbase");
    hide("advld");
    //hide("cbase");

    if (!recogeMat("cbase")) {
        unhide("errorparsg");
        return false;
    }

    var mod = transpose(matglob, mm, nn);
    //La matriz se modifica por referencia, recordemos que es transpuesta
    var bases = completaBase(mod, nn, mm, false);
    var print = transpose(bases, mm, mm);
    muestraMat(print, mm, mm, "bes");

    mod = transpose(matglob, mm, nn);
    bases = completaBase(mod, nn, mm, true);
    print = transpose(bases, mm, mm);
    muestraMat(print, mm, mm, "oes");

}

function calculaBase() {
    var baseA;
    var baseB;

    var mm = gm.get("baseA");

    hide("alertald");
    hide("errorld");
    hide("errorrec");

    if (recogeMat("baseA")) {
        baseA = matglob.slice();
        if (recogeMat("baseB"))
            baseB = matglob.slice();
        else {
            unhide("errorrec");
            return false;
        }
    }
    else {
        unhide("errorrec");
        return false;
    }

    var aInv = baseA.slice();

    //Sacamos la transpuesta y le hacemos gauss para determinar dimension, puede justificarse por la naturaleza de las operaciones que se realizan en las operaciones de Gauss-Jordan

    transpose2(aInv, mm, mm);
    gaussJordan(aInv, mm, mm);


    var bInv = baseB.slice();

    transpose2(bInv, mm, mm);
    gaussJordan(bInv, mm, mm);

    var print;
    //Si son de la misma dimensión,

    var res1 = identestn(aInv, mm, mm);
    var res2 = identestn(bInv, mm, mm);

    if (res1 == res2) {
        print = cambiobase(baseA, baseB, mm);
        //Imprimimos matriz de cambio de base, gg

        muestraMat(print, mm, mm, 'ces');

        if (res1 = ! -1)
            //Alertald si es de menor dimensión
            unhide("alertald");

    }

    else {
        unhide("errorld");
        return false;
    }

}

//Bloque de manejo de Gauss Jordan

function identestc(mat, m, n) {
    for (var i = 0; i < m * n; i += (n + 1)) {
        if (!mat[i].equals(new Fraction(1))) return false;
    }

    return true;
}

//Retorna número de unos, -1 si todos son unos
function identestn(mat, m, n) {
    var k = 0;
    for (var i = 0; i < m * n; i += (n + 1)) {
        if (!mat[i].equals(new Fraction(1))) return k;
        k++;
    }

    return -1;
}

//Los elementos de la fila i se multiplican por el flotante s
function iMultiplica(mat, m, n, i, s) {
    //Calculamos el desplazamiento requerido para acceder a los elementos de la fila i
    var desp = i * n;
    for (var j = 0; j < n; j++)
        mat[desp + j] = mat[desp + j].mul(s);
};

function vMultiplica(v, s) {
    for (var i = 0; i < v.length; i++)
        v[i] *= s;
}

//Multiplica los elementos de la fila i de tal modo que m<i,j> = 1


//Elimina vector i de mat
function vecCrop(mat, m, n, i) {
    //var ret = new Array((m-1)*n);
    //for(var k = 0; k < i*n; k++){
    //  ret[k] = mat[k];
    //}

    var desp = i * n;
    var desp2 = (i + 1) * n;

    for (var k = 0; k < (m - (i + 1)) * n; k++) {
        mat[desp + k] = mat[desp2 + k];
    }

    //Eliminando espacio de uno de los vectores
    for (var k = 0; k < n; k++)
        mat.pop();

    //return ret;
}

function vecZ(mat, m, n, i) {
    var disp1 = i * n;
    for (var k = disp1; k < disp1 + n; k++)
        if (!mat[k].equals(new Fraction(0)))
            return false;
    return true;
}

function iMultJ(mat, m, n, i, j) {
    //Calculamos el desplazamiento requerido para acceder a los elementos de la fila i
    var desp = i * n;

    //Calculamos el escalar necesario para que m<i,j> = 1
    var multiplo = new Fraction(1).div(mat[desp + j]);

    //Multiplicamos la fila i por multiplo
    iMultiplica(mat, m, n, i, multiplo);
    //mat[desp + j] = new Fraction(1);
};

//Se intercambian las filas i1 e i2
function iIntercambio(mat, m, n, i1, i2) {
    //Calculamos el desplazamiento requerido para acceder a cada fila
    var desp1 = i1 * n;
    var desp2 = i2 * n;
    for (var j = 0; j < n; j++) {
        //Intercambio de elemento a elemento, guardando en un auxiliar al momento del intercambio
        var temp = mat[desp2 + j];
        mat[desp2 + j] = mat[desp1 + j];
        mat[desp1 + j] = temp;
    }
};

//Se resta i2 a la fila i1
function iResta(mat, m, n, i1, i2) {
    //Calculamos los desplazamientos para acceder a cada fila
    var desp1 = i1 * n;
    var desp2 = i2 * n;

    for (var j = 0; j < n; j++)
        //Restamos elemento a elemento
        mat[desp1 + j] = mat[desp1 + j].sub(mat[desp2 + j]);
};

function iCopiaV(mat, m, n, i) {
    var ret = new Array(n);
    var desp = i * n;
    for (var k = 0; k < n; k++)
        ret[k] = mat[desp + k];
    return ret;
}

function iRestaV(mat, m, n, i, vec) {
    //Calculamos los desplazamientos para acceder a cada fila
    var desp = i * n;

    for (var j = 0; j < n; j++)
        //Restamos elemento a elemento
        mat[desp + j] = mat[desp + j].sub(vec[j]);
};

function nVec(n, iniv) {
    var ret = new Array(n);
    for (var i = 0; i < n; i++) {
        ret[i] = iniv;
    }
    return ret;
}

function VRestaV(v1, v2, dim) {
    //Calculamos los desplazamientos para acceder a cada fila

    for (var j = 0; j < dim; j++)
        //Restamos elemento a elemento
        v1[j] = v1[j].sub(v2[j]);
};


//Se resta un múltiplo de i2 a i1, de tal forma que m<i1,j> = 0
//Se asume que i2 ya está en forma escalonada, y tiene su 1 principal al frente
function iRestaJ(mat, m, n, i1, i2, j) {
    //Calculamos los desplazamientos para acceder a cada fila
    var desp1 = i1 * n;
    var desp2 = i2 * n;

    var s = mat[desp1 + j].neg();
    for (var jo = 0; jo < n; jo++)
        mat[desp1 + jo] = mat[desp1 + jo].add(mat[desp2 + jo].mul(s));

    //Para corregir error del flotante
    //mat[desp1 + j] = new Fraction(0);
};

function transpose(mat, m, n) {
    var matnew = new Array(m * n);
    for (var i = 0; i < m; i++)
        for (var j = 0; j < n; j++) {
            matnew[j * m + i] = mat[i * n + j];
        }
    return matnew;
}


//Solo funciona para m > n
function transpose2(mat, m, n) {
    var k = 1;
    for (var i = 1; i < m; i++) {
        for (var j = 0; j < k; j++) {
            //swap
            tmp = mat[i * n + j];
            mat[i * n + j] = mat[j * m + i];
            mat[j * m + i] = tmp;
        }
        if (k < n) k++;
    }
}

function dot(mat, m, n, i1, i2) {
    var offi1 = i1 * n;
    var offi2 = i2 * n;
    var res = new Fraction(0);

    for (var k = 0; k < n; k++) {
        //multiplicación componente a componente
        var mult = mat[offi1 + k].mul(mat[offi2 + k])
        res = res.add(mult);
    }
    return res;
}

//function grammsh(mat, m, n){
//m es el número de vectores, n corresponde a las dimensiones
//tomaremos el primer vector como la base de inicio.
//for(var i = 1; i < m;){
//Operamos con todos los vectores anteriores al actual, que ya deberan ser base.
// var vtmp = new Array(n);
//iCopiaV(mat, m, n, i);
//Del primer vector, al anterior al actual
//for(var k = 0; k < i; k++){
//calculamos el factor c
//    var c = dot(mat, m, n, k, i);
//    c = c.div(dot(mat, m, n, k, k));
//Uno de los vectores que restaremos al vector actual
//   var vresta = iCopiaV(mat, m, n, k);
//    iMultiplica(vresta, 1, n, 0, c);
//    iRestaV(vtmp, vresta, n);
// }

//Si obtenemos el vector 0,
//if(vecZ(vtmp, 1, n, i))
//  vecCrop(mat, m, n, 1);
//else{
//Copiar resultado a bases
// }

//}
//}

function grammsh2(mat, m, n, iInicial) {
    //m es el número de vectores, n corresponde a las dimensiones
    //tomaremos el primer vector como la base de inicio, por tanto iniciamos con el segundo vector (si es especificado así en iInicial, para hacer a todos los vectores ortogonales)
    while (m > 0)
        if (vecZ(mat, m, n, 0)) {
            vecCrop(mat, m, n, 0);
            m--;
        }
        else
            break;

    for (var i = iInicial; i < m;) {
        //Operamos con todos los vectores anteriores al actual, que ya deberan ser base.
        //Del primer vector, al anterior al actual (todos estos base)
        for (var k = 0; k < i; k++) {
            //calculamos el factor c
            var c = dot(mat, m, n, k, i);
            c = c.div(dot(mat, m, n, k, k));
            //Uno de los vectores que restaremos al vector actual
            var vresta = iCopiaV(mat, m, n, k);
            //Solo es un vector
            vMultiplica(vresta, c);
            //Restamos a la base actual,
            iRestaV(mat, m, n, i, vresta);
        }

        //Si obtenemos el vector 0,
        if (vecZ(mat, m, n, i)) {
            //Lo eliminamos de la base, la modificacion se hace por referencia
            vecCrop(mat, m, n, i);
            //Tendremos un vector menos, pero nos mantendremos en la misma posicion i
            m--;
        }
        else
            //Avanzamos a la siguiente base de la forma convencional
            i++;

        //Para que la función que invoca conozca la dimension del e.v. formado por la base ortogonal que encontramos
    }
    return m;
}

//Intercambia i1 por i2
function swap(st, i1, i2) {
    var temp = i1;
    st[i1] = st[i2];
    st[i2] = temp;
}

function vecUnoGen(mat, dim, unoloc) {
    for (var i = 0; i < unoloc; i++)
        mat.push(new Fraction(0));
    mat.push(new Fraction(1));
    for (var i = unoloc + 1; i < dim; i++)
        mat.push(new Fraction(0));
}


//Gauss-Jordan modificado, propone vectores si no encuentra un elemento no nulo en un renglon, y mantiene la ubicación de las bases no reducidas (?)
function completaBase(mat, m, n, tOrtogonal) {
    //Hacemos una copia de la matriz original, para tener las bases no alteradas
    var mOrig = [...mat];

    //Hacemos Gauss-Jordan para identificar posibles vectores
    //Esto funciona, debido a que las operaciones de Gauss-Jordan son válidas dentro de un espacio vectorial, considerando que cada fila fuese un vector.
    //Gauss-Jordan nos ayuda a identificar columnas irreducibles, con las cuales podemos sugerir un vector

    //En donde se interrumpe la diagonal de 1's, podemos sugerir vectores de la forma (0, ... , 0, 1, 0, ... , 0);
    //Estos vectores pueden completar la base, y son l.i.

    var previ = 0;
    var pos = new Array();
    for (var i = 0; i < m; i++)
        pos.push(i);
    var vSugeridos = new Array();
    //console.log("En escalonado");
    for (var j = 0; j < n; j++) {
        //Sólo necesitamos contar desde la posición mínima posible del siguiente 1 principal
        //Recordamos si se encontró un elemento no nulo
        var c = false;
        for (var i = previ; i < m; i++) {
            if (!mat[i * n + j].equals(new Fraction(0))) {

                //Elemento no nulo encontrado
                c = true;
                //De estar el primer elemento no nulo en una posición distinta de previ(contador de 1 principal), lo movemos a previ
                if (previ != i) {
                    iIntercambio(mat, m, n, i, previ);
                    swap(pos, i, previ);
                }

                //Multiplica los elementos de la fila del contador de 1 principal de tal modo que m<i,j> = 1
                iMultJ(mat, m, n, previ, j);

                //Terminamos con el resto de la columna i, convirtiendo los elementos posteriores a 0
                //Incrementamos i, para ir con la columna siguiente a la del 1 principal
                for (++i; i < m; i++)
                    //Restamos a i la fila del 1 principal, de tal modo que mat<i,j> = 0;
                    if (!mat[i * n + j].equals(new Fraction(0)))
                        //Restamos un múltiplo de la fila del 1 principal a la fila debajo de ella, de tal modo que m<i,j> = 0
                        iRestaJ(mat, m, n, i, previ, j);

                //Aumentamos el contador del 1 principal.
                previ++;

                //TODO: Aquí se podría hacer la prueba previ == m; de ser así, habríamos cubierto todos los unos principales, y podemos salir del proceso de escalonado.
            }
        }
        //Si no se encontró,
        if (!c) {
            //Agregamos una sugerencia de vector con j actual.
            vecUnoGen(vSugeridos, n, j);
        }
        //console.log(mat);
    }

    //Puede ser necesaria retrosustitución aca (?)

    //Eliminamos bases reducidas a 0
    var mAnt = m;

    //Estamos recorriendo en orden inverso. Recordemos que los vectores cero irán a la parte inferior. Por lo tanto, cuando no encontremos uno, podemos terminar.
    for (var i = (m - 1); i >= 0; i--) {
        if (!vecZ(mat, m, n, i))
            break;
        //Quitamos vector
        vecCrop(mat, m, n, i);
        //Quitamos su identificación
        pos.splice(i, 1);
        m--;
    }

    //Identificamos si existen vectores l.d. en la base proporcionada, en cuyo caso fueron completados. Proseguimos a proponer vectores faltantes.
    for (var i = mAnt + 1; i < n; i++)
        vecUnoGen(vSugeridos, n, i);

    var mSchmid = new Array();
    //Copiemos los vectores propuestos y las bases a un solo arreglo
    pos.forEach((loc) => {
        //Agregamos los vectores no reducidos
        var disp = loc * n;
        for (var i = disp; i < disp + n; i++)
            mSchmid.push(mOrig[i]);
    });

    //Unimos las bases con los vectores sugeridos
    mSchmid = mSchmid.concat(vSugeridos);

    if (!tOrtogonal)
        return mSchmid;

    //Aplicamos Gramm Schmidt
    grammsh2(mSchmid, n, n, 1);

    //La función que invoque a mShmid sabe que la dimensión será de n x n, debido a que se "completa" la base.
    //Intentos de usar matrices donde m > n resultarán en el colapso a una matriz n x n en Gauss Jordan, debido a teoremas.
    return mSchmid;

}


function gaussJordan(mat, m, n) {
    //Iniciar multiplicador de la determinante
    var det = new Fraction(1);

    //Forma escalonada
    //Contador del 1 principal, a lo largo de i
    var previ = 0;
    //console.log("En escalonado");
    for (var j = 0; j < n; j++) {
        //Sólo necesitamos contar desde la posición mínima posible del siguiente 1 principal
        for (var i = previ; i < m; i++) {
            if (!mat[i * n + j].equals(new Fraction(0))) {

                //De estar el primer elemento no nulo en una posición distinta de previ(contador de 1 principal), lo movemos a previ
                if (previ != i) {
                    iIntercambio(mat, m, n, i, previ);
                    //Multiplicamos a la determinante por -1, ya que realizamos un cambio de renglón
                    det = det.mul(new Fraction(-1));
                }


                //Multiplicamos a la determinante por el escalar en mat<previ, j>, ya que lo factorizaremos de la matriz en el siguiente paso
                det = det.mul(mat[previ * n + j]);
                //Multiplica los elementos de la fila del contador de 1 principal de tal modo que m<i,j> = 1
                iMultJ(mat, m, n, previ, j);

                //Terminamos con el resto de la columna i, convirtiendo los elementos posteriores a 0
                //Incrementamos i, para ir con la columna siguiente a la del 1 principal
                for (++i; i < m; i++)
                    //Restamos a i la fila del 1 principal, de tal modo que mat<i,j> = 0;
                    if (!mat[i * n + j].equals(new Fraction(0)))
                        //Restamos un múltiplo de la fila del 1 principal a la fila debajo de ella, de tal modo que m<i,j> = 0
                        iRestaJ(mat, m, n, i, previ, j);

                //Aumentamos el contador del 1 principal.
                previ++;

                //TODO: Aquí se podría hacer la prueba previ == m; de ser así, habríamos cubierto todos los unos principales, y podemos salir del proceso de escalonado.
            }
        }
        //console.log(mat);
    }

    //En este punto, la determinante ya fue obtenida
    //Nota: Solo es válida si la matriz es cuadrada
    for (var i = 0; i < m * n; i += (n + 1))
        det = det.mul(mat[i]);

    //Forma escalonada reducida
    //Guardamos la posición del último 1 principal encontrado
    //console.log("En reducido");
    var izq = 0;

    //Comenzamos en la segunda fila
    for (var i = 1; i < m; i++) {
        for (var j = izq; j < n; j++)
            //Si encontramos el primer elemento j no nulo, que debe ser el 1 principal,
            if (mat[i * n + j].equals(new Fraction(1))) {
                //Iniciamos un ciclo para restar i a todas las filas anteriores
                for (var k = i - 1; k >= 0; k--)
                    iRestaJ(mat, m, n, k, i, j);

                //El siguente 1 principal esta, a lo menos, en esta posición
                izq = ++j;

                //Rompemos ciclo j
                break;
            }
        //console.log(mat);
    }
    return det;

};

function cambiobase(mata, matb, m) {
    var matinv = new Array(2 * m * m);
    //Ponemos B en la izquierda y A en la derecha
    for (var i = 0; i < m * m; i += m) {
        for (var j = 0; j < m; j++) {
            matinv[i * 2 + j] = matb[i + j];
            matinv[i * 2 + m + j] = mata[i + j];
        }
        //for(var j = 0; j < m; j++){
        //  matinv[i*2 + m + j] = mata[i + j];
        //}
    }


    //Jordanazo
    gaussJordan(matinv, m, 2 * m);

    //Matriz de retorno
    var ret = new Array(m * m);

    for (var i = 0; i < m * m; i += m)
        for (var j = 0; j < m; j++)
            ret[i + j] = matinv[i * 2 + m + j];


    return ret;
}


//Atención: Esta función muta la matriz que recibe
function invers(mat, m) {
    var invarr = new Array(m * m * 2);
    //Crear matriz para calcular la inversa
    for (var i = 0; i < m; i++) {
        var dispn = i * m
        var dispi = dispn * 2;
        for (var j = 0; j < m; j++)
            invarr[dispi + j] = mat[dispn + j];
        for (var j = 0; j < m; j++)
            invarr[dispi + m + j] = (i == j) ? (new Fraction(1)) : (new Fraction(0));
    }

    //Hacer Gauss Jordan, guardar determinante
    deti = gaussJordan(invarr, m, m * 2)

    //El resultado se guardará aqui
    var newarr = new Array(m * m);

    for (var i = 0; i < m; i++) {
        var dispt = i * m;
        var dispi = dispt * 2 + m;

        for (var j = 0; j < m; j++) {
            //Parte Inversa
            newarr[dispt + j] = invarr[dispi + j];
            //Parte Gauss
            mat[dispt + j] = invarr[dispi - m + j];
        }
    }

    return newarr;
};
