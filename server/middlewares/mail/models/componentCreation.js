const APP_DOMAIN = process.env.APP_DOMAIN

module.exports = (compUrl, username) => {
  return `
    <div
      style="
        color: #22273A;
        font-family: 'poppins', sans-serif;
      "
    >
      <div style="font-family: 'poppins', sans-serif;">
          <p style="margin-bottom:0">Nouveau composant créé par ${username}</p>
      </div>
      <a
        href="${APP_DOMAIN + compUrl}"
        style="
          font-family: 'poppins', sans-serif;
          font-size: 15px;
          border-radius: 5px;
          display: inline-block;
          padding: 10px 15px;
          background-color: #304DB2;
          color: white;
          text-decoration:none;
          margin-top: 30px;
          font-weight: 500;"
        >
          Voir le composant
      </a>
    </div>
  `
}