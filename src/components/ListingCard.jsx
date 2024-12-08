import React from "react";
import house from '../assets/house.jpg'
import { Link } from "react-router-dom";
export default function ListingCard(props){
    const {name,city,state,id}=props.listing;

    return (
        <section className="card" >
            <Link to={`listing/${id}`} className="nav-link">
            <img src={house} className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                 <p className="card-text">{city}, {state}</p>
            </div>
            </Link>


        </section>
    )

}