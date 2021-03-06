import React from "react";
import Offer from "../Offer";
import "./index.css";

const Main = ({ data }) => {
  // Le fetch a déjà été exécuté dans le composant parent
  console.log(data);

  // Affichage des offres
  let renderOffers;
  if (data) {
    renderOffers = data.map((offer, index) => {
      let taille;
      for (let i = 0; i < offer.product_details.length; i++) {
        if (offer.product_details[i].TAILLE) {
          taille = offer.product_details[i].TAILLE;
          break;
        }
      }
      return (
        <Offer
          profile_image={
            offer.owner.account?.avatar ? offer.owner.account.avatar.url : null
          }
          username={offer.owner.account?.username}
          product_image={offer.product_image.url}
          price={offer.product_price}
          size={taille ? taille : null}
          name={offer.product_name}
          id={offer._id}
          key={index}
        />
      );
    });
  }

  return (
    <div className="super-container-main">
      <div className="container-main">
        <div className="streamline-main">
          <h2>Fil d'actu</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {!data ? "En cours de chargement" : renderOffers}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
