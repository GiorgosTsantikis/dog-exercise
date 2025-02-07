import {  Card, Button } from "react-bootstrap";
import { useState } from "react";
import MenuItemModal from "./MenuItemModal";
import  localStorageCart from "../../services/Cart";

//pop up will have a form asking for details like?
//ingredients add/remove tomato, add sauce, choose size
//where does this data come from
export default function MenuItem({it}){
    
    const {name, price, image, description, is_combo, items, attributes} = it;

    const[addToCartPopup,setAddToCartPopup]=useState(false);
    console.log(attributes);
  
      const togglePopup=()=>{
          setAddToCartPopup(!addToCartPopup);
      }

      function addToCart(data){
        console.log("add to cart ",data);
        localStorageCart(data);
      }
  
 
    
    return (
        <Card className="menu-item-card" style={{ width: '18rem' }}>
          <Card.Body>
            <div className="d-flex flex-row">
              {/* Left Side: Menu Item Details */}
              <div className="text-left">
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                  {description}
                </Card.Text>
                <Card.Text className="price">
                  Από {price}€
                </Card.Text>
              </div>
              
              {/* Right Side: Image */}
              <div className="menu-item-image">
                <img src={image} alt={name} />
              </div>
            </div>
            <Button variant="outline-primary" onClick={togglePopup}>Add to Cart</Button>
           <MenuItemModal show={addToCartPopup} hide={togglePopup} attr={attributes} onSubmit={addToCart}/>
          </Card.Body>
        </Card>
      )
}

