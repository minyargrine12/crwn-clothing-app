import { Fragment } from "react";
import { Outlet, Link} from "react-router-dom";

import { ReactComponent as CrwLogo} from "../../assets/083 crown.svg"; 

import "./navigation.styles.scss";



const Navigation = () => {
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
          </div>
        </div>
        <Outlet/>
        </Fragment>
  
     
    );
};
export default Navigation;