import React from 'react';
import {Row, Col} from "reactstrap";

const Footer = () => {
  const thisYear = ()=>{ //thisYear() 함수
      const year = new Date().getFullYear();
      return year;
  }

return ( //id-식별해주는 것
  <Row id="main-footer" className="text-center p-2">
    <Col>
      <p>
        Copyright &copy; <span>{thisYear()}</span>
      </p>
    </Col>
  </Row>
);

};

export default Footer;

/*
classname -> css 클래스 적용 

*m 
:margin, 네모 바깥쪽 부분
*m-auto
:
*p
:padding, 내용물 안에서 위 아래의 거리 

*/