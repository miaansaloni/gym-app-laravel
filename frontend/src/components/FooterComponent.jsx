const FooterComponent = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>Copyright &copy; {year} | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
