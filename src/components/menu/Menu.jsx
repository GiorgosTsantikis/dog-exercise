/*
MENU{
    “_id”:INT,
    “restaurant_id”:INT,
    “user_id”:INT,
    Menu(garides,saganaki,cola)
    “Menu_items”:[
    menu_item_id:INT
    name: STRING
    photo: string (optional)
    category:ENUM
    description:STRING
    Price: float
    ],
    “Prosfores”:[
    prosfora_id:INT
    name_prosforas:STRING
    photo:string(optional)
    price:float
    [“menu_item_id”,”menu_item_id”,...]:Menu_items
    ]
    }
    select * from menu, select * from menu_items

    <Store info Component/>
    Category/Menu 
    menu_items

*/

import MenuItem from "./MenuItem";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../css/Menu.css';
import img from'../../assets/freepik__expand__89124.png';

    
export default function Menu({  menu = [
    {
      id: 1,
      name: "French Fries",
      category: "Sides",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",  // French Fries image
      description: "Crispy golden fries with a side of ketchup.",
      is_combo: false,
      attributes: [
    {
      "name": "Size",
      "type": "select",
      "options": ["Small", "Medium", "Large"]
    },
    {
      "name": "Toppings",
      "type": "multi-select",
      "options": ["Mushrooms", "Pepperoni", "Olives"]
    }
  ]
    },
    {
      id: 2,
      name: "Coca-Cola",
      category: "Drinks",
      price: 1.99,
      image: img,  // Coca-Cola image
      description: "Refreshing Coca-Cola served chilled.",
      is_combo: false,
      attributes:[]
    },
    {
      id: 3,
      name: "Cheeseburger",
      category: "Mains",
      price: 4.99,
      image:"https://img.freepik.com/free-psd/card-template-restaurant-branding-concept_23-2148129092.jpg?t=st=1738445918~exp=1738449518~hmac=9eafe65c25178a38dcbc09f8a26312b8b8a52043f42d0d614f891f65ddf57235&w=740",
      description: "Juicy beef patty with melted cheese, lettuce, and tomato.",
      is_combo: false,
      attributes:[],
    },
    {
      id: 4,
      name: "Chicken Nuggets",
      category: "Sides",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1599794362722-5eaa61f82a0d",  // Chicken Nuggets image
      description: "Crispy chicken nuggets served with a choice of dipping sauce.",
      is_combo: false,
      attributes:[],
    },
    {
      id: 5,
      name: "Burger Combo",
      category: "Combos",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1564673151-c513a3e14ef2",  // Burger Combo image
      description: "Includes a cheeseburger, fries, and a drink.",
      is_combo: true,
      items: [1, 2, 3], // French Fries, Coca-Cola, Cheeseburger
      attributes:[],
    },
    {
      id: 6,
      name: "Family Meal",
      category: "Combos",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1560225107-e2cc1950a81e",  // Family Meal image
      description: "A big meal for the family, includes 2 cheeseburgers, 2 fries, and 2 drinks.",
      is_combo: true,
      items: [1, 2, 3, 1, 2, 3], // French Fries, Coca-Cola, Cheeseburger, etc.
      attributes:[],
    }
  ]}){
        console.log(menu);
        let display=menu.map(item=>(
           // <Link to={`/cart/${item.id}`} key={item.id}>
                <MenuItem it={item} key={item.id}/>
           // </Link>
            ));
        return (
            <div className="py-4 container">
                
            {display}

               
                <Container className="shopping-cart">
                <Link to="/cart">
                <Button>Go to cart</Button>
                </Link>

                </Container>
                
                Menu works!</div>
        ) 
}

