import React, {useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter,useHistory } from 'react-router';
import { Button, Container } from 'reactstrap';
import logo from '../../../assets/images/logo.png';
import {useSelector,useDispatch} from "react-redux";
import {logoutAction} from "../../../Store/ActionCreators/auth";
function Topbar (){
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [navLinks,setNavLinks] = useState ([
    { id: 1, title: 'Add New Guru', link: '/add-new-guru' },
    { id: 2, title: 'View All Gurus', link: '/view-all-guru' },
    { id: 3, title: 'Categories', link: '/add-category' },
    { id: 4, title: 'Keywords', link: '/add-keyword' },
    { id: 5, title: 'EA Filters', link: '/add-filter' },
  ]);
  const [isOpen,setIsOpen] = useState(false);
  const toggleLine = ()=>{
    setIsOpen(!isOpen);
  }
  const handleLogout = ()=>{
    dispatch(logoutAction()).then(()=>{
      history.push("/");
    })
  }
    return (
      <React.Fragment>
        <header id="topnav" className="defaultscroll sticky">
          <Container>
            <div>
              <Link
                className={'logo'}
                to="/"
              >
                <img
                  src={logo}
                  id="brandLogo"
                  height="50"
                  alt="Reset MSM Logo"
                />
              </Link>
            </div>
            <div className="menu-extras">
              <div className="menu-item">
                <Link
                  to="#"
                  onClick={toggleLine}
                  className={
                    isOpen ? 'navbar-toggle open' : 'navbar-toggle'
                  }
                >
                  <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
              </div>
            </div>

            <div
              id="navigation"
              style={{ display: isOpen ? 'block' : 'none' }}
            >
              <ul
                className='navigation-menu nav-light'
                id="top-menu"
              >
                {navLinks?navLinks.map((navLink, key) =>
                  <li key={key}>
                    <Link to={navLink.link}>{navLink.title}</Link>
                  </li>
                ):null}
                <li className="button-container">
                  {auth.idToken?
                    <Button color="primary" className="signout-btn" onClick={handleLogout}>Sign Out</Button>
                  :
                    <Button color="primary" className="account-btn" onClick={()=>{
                      history.push("/")
                    }}>Login</Button>
                  }
                  
                </li>
              </ul>
            </div>
          </Container>
        </header>
      </React.Fragment>
    );
}

export default withRouter(Topbar);
