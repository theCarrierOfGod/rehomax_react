import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer style={{ marginTop: "40px" }}>
        <div className="footer-container">
          <div
            className="columns is-desktop mobile-center"
            style={{ borderBottom: "1px solid rgba(229, 232, 235, 0.25)" }}
          >
            <div
              className="column is-half-desktop mobile-center"
              style={{ padding: "25px" }}
            >
              <div className="section-header">Join the community</div>
              <div
                className="section-body"
                style={{ paddingTop: "10px" }}
              >
                <Link
                  className="sc-1f719d57-0 fKAlPV"
                  href="https://twitter.com/Rehomax"
                  rel="nofollow noopener"
                  target="_blank"
                >
                  <button
                    aria-label="Twitter Official"
                    className="sc-29427738-0 sc-ebeca040-0 nFISH kWIWry Footer--social-button"
                    type="button"
                  >
                    <div className="sc-29427738-0 sc-630fc9ab-0 sc-53d45fdb-0 dVNeWL jSPhMX gIzYhv">
                      <svg
                        className=""
                        fill="#FFFFFF"
                        style={{ height: "20px", width: "30px" }}
                        viewBox="0 0 18 16"
                      >
                        <path d="M.09 13.791c1.992.14 3.728-.344 5.327-1.571-.816-.098-1.527-.311-2.127-.786-.584-.466-1.032-1.047-1.272-1.841h1.48c.008-.033.016-.066.024-.107-.816-.237-1.512-.663-2.032-1.342-.52-.67-.775-1.448-.8-2.3.52.148 1.016.295 1.52.434.016-.033.04-.065.056-.098-.72-.606-1.24-1.334-1.431-2.275a3.92 3.92 0 01.391-2.7c2 2.389 4.511 3.715 7.598 3.936-.096-.778-.104-1.498.16-2.202.912-2.463 3.983-3.249 5.894-1.481.216.196.4.229.632.147.632-.229 1.255-.474 1.903-.72-.248.81-.784 1.408-1.415 1.989.615-.164 1.231-.336 1.839-.5.024.025.048.041.072.066-.464.491-.912 1.007-1.415 1.449-.272.237-.36.458-.376.818-.144 4.01-1.752 7.25-5.175 9.289-3.487 2.07-7.077 1.947-10.612-.025-.064-.04-.12-.09-.24-.18z" />
                      </svg>
                    </div>
                  </button>
                </Link>
                
                <Link
                  className="sc-1f719d57-0 fKAlPV"
                  href="https://Rehomax.io/blog/newsletter/"
                  rel=""
                  target="_blank"
                >
                  <button
                    aria-label="Mail"
                    className="sc-29427738-0 sc-ebeca040-0 nFISH kWIWry Footer--social-button"
                    type="button"
                  >
                    <div className="sc-29427738-0 sc-630fc9ab-0 sc-53d45fdb-0 dVNeWL jSPhMX gIzYhv">
                      <i
                        className="fa fa-envelope"
                        aria-hidden="true"
                        style={{ color: "white" }}
                      />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="columns is-desktop mobile-center"
            style={{ borderBottom: "1px solid rgba(229, 232, 235, 0.25)" }}
          >
            <div className="column is-quarter">
              <img
                src="/assets/images/opensea-white.svg"
                alt="Rehomax"
                width="45"
                height="45"
              />
              <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Rehomax</h3>
              <p>
                The world’s first and largest digital marketplace for crypto
                collectibles and non-fungible tokens (NFTs). Buy, sell, and
                discover exclusive digital items.
              </p>
            </div>
            <div className="column is-three-quarters">
              <div className="row justify-content-evenly">
                <div className="col-6 col-sm-6 col-md-3 row-header">
                  <h4>Marketplace</h4>
                  <Link to="/category/art">Art</Link>
                  <Link to="/category/collectibles">Collectibles</Link>
                  <Link to="/category/music">Music</Link>
                  <Link to="/category/photography">Photography</Link>
                  <Link to="/category/sports">Sports</Link>
                  <Link to="/category/utility">Utility</Link>
                  <Link to="/category/virtualWorlds">Virtual Worlds</Link>
                </div>
                <div className="col-6 col-sm-6 col-md-3 row-header">
                  <h4>My Account</h4>
                  <Link to="">Profile</Link>
                  <Link to="">Favorites</Link>
                  <Link to="">Watchlist</Link>
                  <Link to="">My Collections</Link>
                  <Link to="">Create</Link>
                  <Link to="">Settings</Link>
                  <Link to="">Sports</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row is-justify-content-space-between bottom mobile-center">
            <div className="bottom-section">
              <p>© 2018 - 2023 Ozone Networks, Inc</p>
            </div>
            <div className="bottom-section">
              <Link
                className="sc-1f719d57-0 fKAlPV Footer--link"
                href="/privacy"
              >
                Privacy Policy
              </Link>
              <Link className="sc-1f719d57-0 fKAlPV Footer--link" href="/tos">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
