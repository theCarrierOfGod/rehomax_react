import React from 'react'

const Loading = () => {
  return (
    <>
      <section className="hero is-info is-fullheight" style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', zIndex: '1000' }}>
        <div className="hero-body" style={{ width: '100%', textAlign: 'center'}}>
          <div className="" style={{ width: '100%', textAlign: 'center'}}>
            <p className="subtitle text-center" style={{ width: '100%', textAlign: 'center'}}>
              <span className='fa fa-cog fa-spin fa-3x' style={{ width: '100%', textAlign: 'center', }}></span>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Loading