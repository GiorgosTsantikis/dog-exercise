
import applicationLogger from "./logger";

export default function addToCart(item){
    try{
        applicationLogger.debug("Cart.addToCart(",item,")");
        var cart=localStorage.getObj('cart') || [];
        cart.push(item);
        localStorage.setObj('cart',cart);
    }catch(error){
        applicationLogger.error('error saving item',error);
    }
}