import { Fragment, useContext } from "react";
import { Outlet, Link} from "react-router-dom";


import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwLogo} from "../../assets/083 crown.svg"; 
import { UserContext }  from "../../contexts/user.context";
import { CartContext, CartProvider } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";


import "./navigation.styles.scss";

const Navigation = () => {
   const { currentUser } = useContext(UserContext);
   const { isCartOpen } = useContext(CartContext);


   
    return(
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to="/" >
         
          
          <CrwLogo className="logo"/>
          </Link>
          <div className="nav-links-container">
             <Link className="nav-link" to="/shop">
                SHOP

             </Link>
             {
               currentUser ? (
                  <span className="nav-link" onClick={signOutUser}>
                     SIGN OUT</span>
               ) : (
                   <Link className="nav-link" to="/auth">
                     SIGN IN
     
                  </Link>
               )
             }
             <CartIcon />
             
          </div>
          { isCartOpen && <CartDropdown />}
        </div>
        <Outlet/>
        </Fragment>
  
     
    );
};
export default Navigation;