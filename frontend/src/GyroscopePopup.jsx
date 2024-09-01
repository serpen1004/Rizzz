import React, { useState } from 'react'

function GyroscopePopup() {
  const [isVisible, setIsVisible] = useState(true)

  const closeModal = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div id="modalbox">
      <img src="/giroscope.gif" alt="PopUp" className="img" />
      <p className="popup-text">If you are on cell phone turn on the gyroscope</p>
      <button type="button" className="accept-btn" onClick={closeModal}>Accept</button>
    </div>
  )
}

export default GyroscopePopup