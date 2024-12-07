import React from "react";

export default function AdminFooter() {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          Wings Cafe // <i>&nbsp;Fill Your Belly Up!!</i>
          <div className="copyright ml-auto">
            Copyright &copy;&nbsp;
            {new Date().getFullYear()}, made with <i className="la la-heart heart text-danger"></i>{" "}
            by{" "}
            <a href="#">Relebohile Molapo</a>
          </div>
        </div>
      </footer>
    </>
  );
}
