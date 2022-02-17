const APP_DOMAIN = process.env.APP_DOMAIN

module.exports = token => {
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
      <p style="font-size: 18px;margin:0">Oubli du mot de passe</p>
      <p style="margin-bottom:0;margin-top: 50px;">Vous avez fait une demande de réinitialisation de votre mot de passe.<br>Pour définir un nouveau mot de passe, cliquez sur le bouton ci-dessous.</p>
      <a
        href="${APP_DOMAIN}/reset/password/${token}"
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
          Réinitialiser mon mot de passe
      </a>
    </div>
  `
}