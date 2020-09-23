/***************Sign Up  ************************/
function signUp() {

    var fName = document.getElementById('firstName').value;
    var x = verifLength(fName, 3);
    if (!x) {
        document.getElementById('firstNameMsg').innerHTML =
            'the first Name is not correct'
    }
    else {
        document.getElementById('firstNameMsg').innerHTML = '';
    }

    var lName = document.getElementById('lastName').value;
    var y = verifLength(lName, 3);
    if (!y) {
        document.getElementById('lasttNameMsg').innerHTML =
            'the last naùe is not correct';
    }
    else {
        document.getElementById('lasttNameMsg').innerHTML = ''
    }

    var email = document.getElementById('emailSign').value;
    var k = verifEmail(email);
    if (k) {
        document.getElementById('emailSign').innerHTML =
            "Email deja exsite"
    }
    else {
        document.getElementById('emailSign').innerHTML = '';
    }

    var psw = document.getElementById('pwdSign').value;
    if (psw.length < 8) {
        document.getElementById('pwdMsg').innerHTML =
            'password sup 8'
    }
    else {
        document.getElementById('pwdMsg').innerHTML = '';
    }
    var confpsw = document.getElementById('confirmPwd').value;
    if (confpsw != psw) {
        document.getElementById('confMsg').innerHTML =
            'password not confirm'
    }
    else {
        document.getElementById('confMsg').innerHTML = '';
    }
    var z = verifLength(psw, 8) && comparison(psw, confpsw);
    var tel = document.getElementById('tel').value;
    var w = verifNumber(tel);
    if (w) {
        document.getElementById('telMsg').innerHTML =
            'juste number correct'
    }
    else {
        document.getElementById('telMsg').innerHTML = '';
    }
    var userType = document.getElementById('userType').value;
    var idu = localStorage.getItem('idu') || '1';



    var user = {
        id: Number(idu),
        firstName: fName,
        lastName: lName,
        Email: email,
        pwd: psw,
        confirmPwd: confpsw,
        telN: tel,
        userType: userType


    }
    if (x && y && z && !w && !k) {
        var T = JSON.parse(localStorage.getItem('users') || '[]');
        T.push(user);
        localStorage.setItem('users', JSON.stringify(T))
        localStorage.setItem('idu', Number(idu) + 1);
        localStorage.setItem('connecteUser', JSON.stringify(T))

    };
}


/*************function login*************************/
function login() {
    i = 0;
    var email = document.getElementById('email').value;
    var pwd = document.getElementById('pwd').value;
    var T = JSON.parse(localStorage.getItem('users') || '[]');
    console.log(T);
    while (i < T.length && (T[i].email != email || T[i].pwd != pwd)) {
        i++;
    }
    if (i == T.length) {


        return null;
    }
    else {
        if (T[i].userType == '0') {
            localStorage.setItem('connecteUser', JSON.stringify(T[i]));

            location.replace('product.html')
        }
        else {
            localStorage.setItem('connecteUser', JSON.stringify(T[i]));

            location.replace('allProduct.html')
        }

        return (T[i])

    }

}

/***************declaration Function Add*************/
function Add() {
    var nom = document.getElementById('nom').value;
    var x = verifLength(nom, 5);
    if (!x) {
        document.getElementById('nomMsg').innerHTML =
            'your name is not correct';
    }
    else {
        document.getElementById('nomMsg').innerHTML = '';
    }


    var code = document.getElementById('code').value;
    var y = verifCode(code);
    if (!y) {
        document.getElementById('codeMsg').innerHTML =
            'the code is not correct';
    }
    else {
        document.getElementById('codeMsg').innerHTML = ''
    }

    var prix = document.getElementById('prix').value;
    var z = verifInteger(prix, 0);
    if (!z) {
        document.getElementById('prixMsg').innerHTML =
            'prix is not correct';
    }
    else {
        document.getElementById('prixMsg').innerHTML = '';
    }

    var stock = document.getElementById('stock').value;
    var w = verifInteger(stock, 9);
    if (!w) {
        document.getElementById('stockMsg').innerHTML =
            'code not correct';
    }
    else {
        document.getElementById('stockMsg').innerHTML = '';
    }

    var categorie = document.getElementById('categorie').value;
    var idL = localStorage.getItem('idL') || '1';

    var produits = {
        id: Number(idL),
        nom: nom,
        code: code,
        prix: prix,
        stock: stock,
        categorie: categorie

    }
    if (x && y && z && w) {
        var T = JSON.parse(localStorage.getItem('produit') || '[]');
        T.push(produits)
        localStorage.setItem('produit', JSON.stringify(T));
        localStorage.setItem('idL', Number(idL) + 1);

    }
}

/************************Disply Products ***********************/
function displayProducts() {
    var T = JSON.parse(localStorage.getItem('produit') || '[]');
    var render = `
            <table class="table table-striped " id="myTable">
              <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Code</th>
                      <th scope="col">Prix</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Categorie</th>
                      <th scope="col">Action</th>

                  </tr>
              </thead>
              <tbody>`;
    for (var i = 0; i < T.length; i++) {
        render += `
                  <tr>
                      <th scope="row">${T[i].id}</th>
                      <td>${T[i].nom}</td>
                      <td>${T[i].code}</td>
                      <td>${T[i].prix}</td>
                      <td>${T[i].stock}</td>
                      <td>${T[i].categorie}</td>
                      <td><button type="button" class="btn btn-success" onclick="displayProd(${T[i].id})">Display</button>
                      <button type="button" class="btn btn-primary" onclick="editProduct(${T[i].id})" >Edit</button>
                      <button type="button" class="btn btn-danger" onclick="deletProd(${T[i].id})">Delete</button></td>
                     
                  </tr>
      `;
    }

    render += `</tbody> </table>`;
    document.getElementById('productsTable').innerHTML = render;
}

/*******************Search By Id **************************/
function searchProductById(id) {
    var T = JSON.parse(localStorage.getItem('produit') || '[]');
    var product;
    for (var i = 0; i < T.length; i++) {
        if (T[i].id == id) {
            product = T[i];
        }
    }
    return product;
}

/******************Edit Product *************************/
function editProduct(id) {
    var product = searchProductById(id);
    var render = `
          <div class="form-row">
              <div class="form-group col-md-6">
                  <label>Product Name</label>
                  <input type="text" class="form-control" id="productNameEdit" value=${product.nom} >
              </div>
              <div class="form-group col-md-6">
                  <label>Product Price</label>
                  <input type="text" class="form-control" id="productPriceEdit" value=${product.prix} >
              </div>
              <div class="form-group col-md-6">
                  <label>Stock</label>
                  <input type="number" class="form-control" id="productStockEdit" value=${product.stock} >
              </div>
              <div class="center">
                <button type="submit" class="btn btn-primary" onclick="validateEdit(${product.id})" >Edit Product</button>
              </div>
          </div>
    `
    document.getElementById('editProductDiv').innerHTML = render;
}
/*****************Validate Edit *****************************/
function validateEdit(id) {
    var product = searchProductById(id);
    var newName = document.getElementById('productNameEdit').value;
    var newPrice = document.getElementById('productPriceEdit').value;
    var newStock = document.getElementById('productStockEdit').value;
    var newPr = {
        id: product.id,
        nom: newName,
        code: product.code,
        prix: newPrice,
        stock: newStock,
        categorie: product.categorie
    }
    var allProducts = JSON.parse(localStorage.getItem('produit'));
    var index = searchById(id);
    allProducts.splice(index, 1);
    allProducts.splice(index, 0, newPr);
    localStorage.setItem('produit', JSON.stringify(allProducts));
    location.reload();
}
/*************** Display Product ***********************/
function displayProd(id) {
    var product = searchProductById(id);
    localStorage.setItem('searchedPr', JSON.stringify(product))
    location.replace('displayProduct.html');
}
/*********************Display *************************/
function display() {
    var searchedPr = JSON.parse(localStorage.getItem("searchedPr"));
    document.getElementById("displayPrName").innerHTML = searchedPr.nom;
    document.getElementById("displayPrPrice").innerHTML = searchedPr.prix;
    document.getElementById("displayPrStock").innerHTML = searchedPr.stock;
    document.getElementById("displayPrCategory").innerHTML = searchedPr.categorie;

}
/***********************All Products ***********************/
function allProd() {
    var T = JSON.parse(localStorage.getItem('produit') || '[]')
    var render = `<div class="card-deck row">`;
    for (var i = 0; i < T.length; i++) {
        var pr = T[i];
        render += `<div class="col-md-3">
        <div class="card">
        <img src="img/pannier.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${pr.nom}</h5>
          <p class="card-text">${pr.prix} TND</p>
          <p class="card-text">${pr.stock} pieces</p>
          <button class="btn btn-primary" onclick="displayProd(${pr.id})">View</button>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="displayModal(${pr.id})">
          Reserve
        </button>  </div>
      </div></div>
         `;
    }
    render += `</div> `;
    document.getElementById('productCard').innerHTML = render;
}
/***********************Display User Parames *************************/
function displayUserParames() {
    var connecteUser = JSON.parse(localStorage.getItem('connecteUser'));
    document.getElementById('navFirstName').innerHTML = connecteUser.firstName;
    document.getElementById('navLastName').innerHTML = connecteUser.lastName;

}
/**************Display Model **************************/
function displayModal(id) {
    var product = searchProductById(id);
    var render = `
      
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Command</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <label>Quantity</label>
            <input type="text" id="qtyToCmd" class='form-control'>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="validateCmd(${id})">Validate</button>
            </div>
          </div>
        </div>
      </div>`;
    document.getElementById("modalId").innerHTML = render;
}
/********************Validate Command ********************/
function validateCmd(id) {
    var idC = localStorage.getItem("idC") || "1";
    var qty = document.getElementById("qtyToCmd").value;
    var user = JSON.parse(localStorage.getItem("connecteUser"));
    console.log(user);
    var product = searchProductById(id);

    if (Number(qty) > product.stock || qty <= 0) {
        alert("Stock Indisponible");
    } else {
        var cmd = {
            id: Number(idC),
            qty: Number(qty),
            price: product.prix,
            idProduct: product.id,
            idUser: user.id,
        };
        // MAJ product
        var newPr = {
            id: product.id,
            nom: product.nom,
            code: product.code,
            prix: product.prix,
            stock: Number(product.stock) - Number(qty),
            categorie: product.categorie,
        };

        var allProducts = JSON.parse(localStorage.getItem("produit"));
        var index = searchById(id);
        allProducts.splice(index, 1);
        allProducts.splice(index, 0, newPr);
        localStorage.setItem("produit", JSON.stringify(allProducts));

        var T = JSON.parse(localStorage.getItem("myCommands") || "[]");
        T.push(cmd);
        localStorage.setItem("myCommands", JSON.stringify(T));
        localStorage.setItem("idC", Number(idC) + 1);
        location.reload();

    }
}
/**************** Display Command ****************/
function displayCommand(idUser) {
    var T = JSON.parse(localStorage.getItem('myCommands') || '[]');
    var userCmd = Array();
    for (var i = 0; i < T.length; i++) {
        if (T[i].idUser == idUser) {

            userCmd.push(T[i]);

        }

    }
    var render = `
            <table class="table table-striped " >
              <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Total Price HT</th>
                      <th scope="col">Total Price TTC</th>

                    
                      <th scope="col">Action</th>
                    

                  </tr>
              </thead>
              <tbody>`;
    for (var i = 0; i < userCmd.length; i++) {

        cmd = userCmd[i];

        render += `
                  <tr>
                      <th scope="row">${cmd.id}</th>
                     
                    
                      <td>${searchProductById(cmd.idUser).nom}</td>
                       <td>${cmd.qty}</td>
                      <td>${cmd.price}</td>
                      <td>${Number(cmd.price) * Number(cmd.qty)}</td>
                      <td>${Number(cmd.price) * Number(cmd.qty) * 1.19}</td>
                      
                      <td><button type="button" class="btn btn-danger" onclick="deletCmd(${cmd.id})">Delete</button></td>
                     
                  </tr>
      `;
    }

    render += `</tbody> </table>`;
    document.getElementById('commandsTable').innerHTML = render;
}
/***************Delete Command **********************/
function deletCmd(id) {
    var T = JSON.parse(localStorage.getItem('myCommands') || '[]')
    var index = searchById(id, T);
    T.splice(index, 1);
    localStorage.setItem('myCommands', JSON.stringify(T));
    location.reload();
}
function comment() {
    var comment = document.getElementById("comment").value;
    var idk = localStorage.getItem('idk' || '1');

    var commenter = {
        id: Number(idk),
        comment: comment
    }
    var T = JSON.parse(localStorage.getItem('comment') || '[]');
    T.push(commenter);
    localStorage.setItem('comment', JSON.stringify(T))
    localStorage.setItem('idk', Number(idk) + 1);
}





//All Function

function comparison(ch1, ch2) {

    return (ch1 == ch2)
}

function verifLength(ch, n) {
    return (ch.length > n);
}
function verifNumber(n) {
    return (isNaN(n));
}
function verifEmail(email) {
    var i = 0;
    var T = JSON.parse(localStorage.getItem('clients') || '[]')
    while ((i < T.length) && (T[i].email != email)) {
        i++;
    }
    if (i == T.length) {
        return false;
    }
    else {
        return T[i].email == email;
    }

}
function verifCode(ch) {
    return (ch.startsWith('#'));


}

function  verifInteger(a, n) {
    return (a > n);
}

/*function delete****************************************/
function deletProd(id) {
    var T = JSON.parse(localStorage.getItem('produit') || '[]');


    var produit = searchById(id);
    var index = searchById(id);
    T.splice(index, 1);
    localStorage.setItem('produit', JSON.stringify(T));
    location.reload();


}
function searchById(id) {
    var T = JSON.parse(localStorage.getItem('produit') || '[]');
    var index;
    for (var i = 0; i < T.length; i++) {
        if (T[i].id == id) {
            index = i;
        }
    }
    return (index)
}






