const APP_DOMAIN = process.env.APP_DOMAIN

module.exports = user => {
  return `
    <div
      style="
        color: #22273A;
        font-family: 'poppins', sans-serif;
      "
    >
      <div style="font-family: 'poppins', sans-serif;">
          <p style="margin-bottom:0;font-weight:500;font-size:17px">Nouveau compte créé</p>
          <p style="margin-bottom: 0;">Fullname : ${user.fullname}</p>
          <p style="margin:0">Username : ${user.username}</p>
          <p style="margin:0">Email : ${user.email}</p>
          <p style="margin:0">id : ${user.id}</p>
      </div>
      <a
        href="${APP_DOMAIN}/${user.username}"
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
          Voir le profil
      </a>
    </div>
  `
}