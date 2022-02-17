const APP_DOMAIN = process.env.APP_DOMAIN

module.exports = () => {
  return `
    <div
      style="
        text-align: center;
        color: #22273A;
        font-family: 'poppins', sans-serif;
      "
    >
      <h1 style="font-size: 40px;margin:0">
        <a
          href="${APP_DOMAIN}"
          style="
            margin: 0;
            color: #22273A;
            text-decoration: none;
          "
        >
          Genely
        </a>
      </h1>
      <p style="font-size: 18px;margin:0">Bienvenu chez Genely !</p>
      <p style="margin-bottom:0;margin-top: 50px;">Merci d'avoir créé un compte sur notre plateforme.<br>Vous trouverez ci-dessous un bouton pour vous connecter.</p>
      <a
        href="${APP_DOMAIN}"
        style="
          font-family: 'poppins', sans-serif;
          font-size: 15px;
          border-radius: 5px;
          display: inline-block;
          padding: 10px 15px;
          background-color: #304DB2;
          color: white;
          text-decoration:none;
          margin-top: 50px;
          font-weight: 500;"
        >
          Accéder au site
      </a>
    </div>
  `
}