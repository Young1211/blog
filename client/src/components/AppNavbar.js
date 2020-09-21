import React, {Fragment} from "react";
import {Navbar, Container, NavbarToggler, Collapse, Nav} from "reactstrap";
import {Link} from "react-router-dom";


const AppNavbar = () => {
    return (
      <Fragment>
        <Navbar color="dark" dark expand="lg" className="sticky-top"> 
          <Container>
            <Link to="/" className="text-white text-decoration-none">
              Sid Project's Blog(young 블로그)
            </Link>
            <NavbarToggler />
            <Collapse isOpen={true} navbar>
              <Nav className="ml-auto d-flex justify-content-around" navbar>
                {false ? ( //인증 여부 확인
                  <h1 className="text-white">authLink</h1>
                ) : (
                  <h1 className="text-white">guestLink</h1>
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
    );
};

export default AppNavbar;

/*
Fragment
-불필요한 div 랜더링 생략 가능

Container
-대부분의 내용을 컨테이너에 담게 됨 

text-decoration-none
-

NavbarToggler
-

d-flex


*/