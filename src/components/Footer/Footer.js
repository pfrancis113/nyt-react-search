import React from "react";
import "./Footer.css";

const Footer = (props) => {
return (
<footer className="page-footer">

<div className="footer-copyright py-3 text-center">
{ props.children }
</div>

</footer>
)
}

export default Footer;