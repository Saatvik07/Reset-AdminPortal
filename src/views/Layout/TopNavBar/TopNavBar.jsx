import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Button, Container } from 'reactstrap';
import logo from '../../../assets/images/logo.png';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpenShop: false,
      isAccountLink: false,
      navLinks: [
        //Note : each child and nested child must have unique id
        { id: 1, title: 'Add New Guru', link: '/add-new-guru' },
        { id: 2, title: 'View All Gurus', link: '/view-all-guru' },
        { id: 3, title: 'Categories', link: '/add-category' },
        { id: 4, title: 'Keywords', link: '/add-keyword' },
        { id: 5, title: 'EA Filters', link: '/add-filter' },
      ],
      wishlistModal: false,
      dropdownIsOpen: false
    };
    this.toggleLine = this.toggleLine.bind(this);
    this.openBlock.bind(this);
    this.openNestedBlock.bind(this);
    this.toggleDropdownShop.bind(this);
    this.toggleWishlistModal.bind(this);
    this.toggleDropdownIsOpen.bind(this);
  }

  toggleWishlistModal = () => {
    this.setState((prevState) => ({
      wishlistModal: !prevState.wishlistModal
    }));
  };

  toggleDropdownShop = () => {
    this.setState({
      dropdownOpenShop: !this.state.dropdownOpenShop
    });
  };
  toggleDropdownIsOpen = () => {
    this.setState({
      dropdownIsOpen: !this.state.dropdownIsOpen
    });
  };

  toggleLine() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }
  //TODO REdirect to 404
  componentDidMount() {
    var matchingMenuItem = null;
    var ul = document.getElementById('top-menu');
    var items = ul.getElementsByTagName('a');
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }

    if (/\/account/.test(this.props.location.pathname)) {
      this.setState({ isAccountLink: true });
    }
    if (this.props.location.pathname === '/checkout') {
      this.setState({ isAccountLink: true });
    }
  }

  activateParentDropdown = (item) => {
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add('active'); // li
      const parent1 = parent.parentElement;
      parent1.classList.add('active'); // li
      if (parent1) {
        const parent2 = parent1.parentElement;
        parent2.classList.add('active'); // li
        if (parent2) {
          const parent3 = parent2.parentElement;
          parent3.classList.add('active'); // li
          if (parent3) {
            const parent4 = parent3.parentElement;
            parent4.classList.add('active'); // li
          }
        }
      }
    }
  };

  openBlock = (level2_id) => {
    var tmpLinks = this.state.navLinks;
    tmpLinks.map((tmpLink) =>
      //Match level 2 id
      tmpLink.id === level2_id
        ? (tmpLink.isOpenSubMenu = !tmpLink.isOpenSubMenu)
        : false
    );
    this.setState({ navLinks: tmpLinks });
  };

  openNestedBlock = (level2_id, level3_id) => {
    var tmpLinks = this.state.navLinks;
    tmpLinks.map((tmpLink) =>
      //Match level 2 id
      tmpLink.id === level2_id
        ? tmpLink.child.map((tmpchild) =>
            //if level1 id is matched then match level 3 id
            tmpchild.id === level3_id
              ? //if id is matched then update status(level 3 sub menu will be open)
                (tmpchild.isOpenNestedSubMenu = !tmpchild.isOpenNestedSubMenu)
              : (tmpchild.isOpenNestedSubMenu = false)
          )
        : false
    );
    this.setState({ navLinks: tmpLinks });
  };

  render() {
    const { isAccountLink } = this.state;
    return (
      <React.Fragment>
        <header id="topnav" className="defaultscroll sticky">
          <Container>
            <div>
              <Link
                className={isAccountLink ? 'logo logo-dark' : 'logo'}
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
                  onClick={this.toggleLine}
                  className={
                    this.state.isOpen ? 'navbar-toggle open' : 'navbar-toggle'
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
              style={{ display: this.state.isOpen ? 'block' : 'none' }}
            >
              <ul
                className={
                  isAccountLink
                    ? 'navigation-menu nav-dark'
                    : 'navigation-menu nav-light'
                }
                id="top-menu"
              >
                {this.state.navLinks.map((navLink, key) =>
                  navLink.child ? (
                    <li className="navbar-link has-submenu" key={key}>
                      {/* child item(menu Item) - Level 1 */}
                      <Link
                        to={navLink.link}
                        onClick={(event) => {
                          event.preventDefault();
                          this.openBlock(navLink.id);
                        }}
                        id="navbar-link"
                      >
                        {navLink.title}
                      </Link>
                    </li>
                  ) : (
                    <li key={key}>
                      <Link to={navLink.link}>{navLink.title}</Link>
                    </li>
                  )
                )}
                <li>
                  <NavLink to="/account">
                    <Button color="primary">Account</Button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </Container>
        </header>
      </React.Fragment>
    );
  }
}

export default withRouter(Topbar);
