import React from 'react';

function PageNotFound() {
  document.title = 'Error 404 - Page Not Found';
  return (
    <div>
      <img style={{ width: "400px", height: "400px" }} src="https://i.imgur.com/Q2BAOd2.png"></img>
    <p>PageNotFound! Please check URL</p>
    </div>
  )
}

export default PageNotFound;
