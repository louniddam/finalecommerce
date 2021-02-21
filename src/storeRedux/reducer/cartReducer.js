const initialState = {
    productCart: [],
    totalPrice: 0,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type){
        case "ADD-TO-CART":
          //Chercher le produit ajouté dans notre panier
          let newProduct = state.productCart.find(
            (product) => product.p.idproduct === action.payload.idproduct
          )
          //Chercher l'index du produit ajouté dans notre panier s'il existe
          let newProductIndex = state.productCart.findIndex(
            (product) => product.p.idproduct === action.payload.idproduct
          )
          //Si le produit n'existe pas déjà dans le panier, on l'ajoute
          if(!newProduct){
            return {
              ...state,
              totalPrice: state.totalPrice + action.payload.price,
              productCart: [
                ...state.productCart,
                {
                  p: action.payload,
                  qty: 1,
                },
              ],
            }
          } else if (newProduct) { //Si le produit existe déjà dans notre panier
            //[1,2,3,4, 5]
            //On insert un prduit qui est deja le num 3
            //On coupe le tableau comme suit [1,2]
            //On ajoute le produit "3" et on augmente la qty de 1 [1,2,3]
            //On ajoute le reste du tableau à ce nvx tableau [1,2,3] + [4,5]
            return {
              ...state,
              totalPrice: state.totalPrice + action.payload.price,
              productCart: [
                ...state.productCart.slice(0, newProductIndex), //De l'index 0 à celui du produit deja existant
                {
                  p: action.payload,
                  qty: state.productCart[newProductIndex].qty + 1,
                },
                ...state.productCart.slice(newProductIndex + 1) //Le reste du tableau après le produit deja existant
              ]
            }
          }

          case "EMPTY-CART":
            return initialState

          default:
              return state
    }
}

export default cartReducer