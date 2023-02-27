import React from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../../components/nav/Nav';

const Single = () => {

    let { category } = useParams();
    const heroBack = `../../images/${category}Hero.avif`;
    return (
        <div>
            <Nav /> 
            { category }
            <section className="hero is-primary is-medium" style={{ backgroundImage: `url(${heroBack})`}}>
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    Medium title
                  </h1>
                  <h2 className="subtitle">
                    Medium subtitle
                  </h2>
                </div>
              </div>
            </section>
        </div>
    )
}

export default Single
