const Footer = ({props}: any) => {
  return (
    <footer
      id="Footer"
      className="footer"
      {...props}
    >
      <p>&copy; {new Date().getFullYear()} Vennew | Made with &hearts; by Olli Paust</p>
    </footer>
  );
};

export default Footer;
