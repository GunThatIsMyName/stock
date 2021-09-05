import React from 'react'

const Photo = ({id,likes,alt_description,regular,username,portfolio_url,medium}) => {
  return (
    <article className="photo">
      <img src={regular} alt={username} />
      <div className="photo-info">
        <div>
          <h4>{username}</h4>
          <p>liked : {likes}</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={username} className="user-img" />
        </a>
      </div>
    </article>
  )
}

export default Photo
