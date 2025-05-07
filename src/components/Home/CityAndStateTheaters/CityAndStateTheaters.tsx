import React from 'react'
import CityTheaters from './CityTheaters'
import StateTheaters from './StateTheaters'

const CityAndStateTheaters = () => {
  return (
    <section className="city-and-state-theaters">
      <div className="@container-normal mx-auto px-20">
        <div className="block xl:flex gap-5">
          <CityTheaters />
          <StateTheaters />
        </div>
      </div>
    </section>
  )
}

export default CityAndStateTheaters