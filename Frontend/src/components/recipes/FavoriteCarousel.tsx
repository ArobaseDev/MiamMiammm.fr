

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../header/Header';
import Recipe from './Recipe';


const FavoriteCarousel = () => {
 // const { favorites } = useFavorites();
 const favorites = JSON.parse(localStorage.getItem('Miam-Miammm-favorites'))

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <Header/>
    <div className="favorite-carousel container mx-auto p-4">
      <h2 className="text-2xl mb-4">Recettes Favorites</h2>


      {!favorites ? (
        <p>Aucune recette favorite pour le moment.</p>
        ) : (
          <div {...settings}>
          {favorites.map((recipe) => (
            <div key={recipe.id} className="p-2">
            <Recipe recipe={recipe} />
            </div>
            ))}
            </div>
            )}
    </div>
            </>
  );
};

export default FavoriteCarousel;