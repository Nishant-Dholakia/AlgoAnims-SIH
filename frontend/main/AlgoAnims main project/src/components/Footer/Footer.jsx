import React from 'react'
import './footer.css'
const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">
                <div className="footer-section feedback-form">
                    <h3>Give Us Feedback</h3>
                    <form id="userForm">
                        <input id="name" type="text" placeholder="Your Name" required />
                        <input id="email" type="email" placeholder="Your Email" required />
                        <textarea id="textarea" placeholder="Your Feedback" required></textarea>
                        <button id="submitBtn" type="submit">Submit</button>


                    </form>
                    <div id="confirmationModal" className="modal">
                        <div className="modal-content">
                            <span id="closeModal" className="close">&times;</span>
                            <h2>Thank You!</h2>
                            <p>Your response has been stored successfully.</p>
                        </div>
                    </div>
                </div>
                <div className="footer-section website-info">
                    <h1>AlgoAnims</h1>
                    <p>&copy; 2024. All rights reserved.</p><br /><br />
                    <h1>Contributors:</h1>
                    <ul className="footer-contributors">
                        <li>Nishant Dholakia</li>
                        <li>Parth Kacha</li>
                        <li>Devan Chauhan</li>
                        <li>Moksh Desai</li>
                        <li>Eva Raste</li>
                        <li>Tisha Goyani</li>
                    </ul>

                </div>
                <div className="footer-section social-links">
                    <h3>Stay Connected</h3>

                    <i className="ri-twitter-fill"></i>
                    <i className="ri-facebook-fill"></i>
                    <i className="ri-instagram-fill"></i>
                    <i className="ri-linkedin-fill"></i>


                </div>
            </div>
        </footer>
    )
}

export default Footer
