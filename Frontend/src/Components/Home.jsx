import './Home.css';
import SignUp from './SignUp.jsx';
import LogIn from './LogIn.jsx';
import MyNavbar from './Navbar.jsx';
// import { useState } from 'react';
import {Routes , Route } from 'react-router-dom';

function Home() {
  // const [showSignUp, setShowSignUp] = useState(false);
  // const [showLogIn, setShowLogIn] = useState(false);

  // const handleSignUpClose = () => setShowSignUp(false);
  // const handleLogInClose = () => setShowLogIn(false);

  // const handleSignUpShow = () => {
  //   setShowLogIn(false);
  //   setShowSignUp(true);
  // };

  // const handleLogInShow = () => {
  //   setShowSignUp(false);
  //   setShowLogIn(true);
  // };

  return (
      <div>
        <MyNavbar  />
        {/* <SignUp show={showSignUp} handleClose={handleSignUpClose} switchToLogIn={handleLogInShow} />
        <LogIn show={showLogIn} handleClose={handleLogInClose} switchToSignUp={handleSignUpShow} /> */}

        {/* Rest of the page content */}
        <div id = "sectionHome" className="container-fluid home-page-section">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <div className="homeData">
                <p className="homeDes">Introducing Agro Shield's advanced plant disease diagnostic tool</p>
                <h1 className="homeHeading">Protect Your Crops with Agro Shield</h1>
                <p className="homePara">Utilize cutting-edge technology to diagnose plant diseases and safeguard your yield.</p>
                <button className="homeButton">Get Started</button>
              </div>
            </div>
            <div className="col-12 col-md-6 d-none d-md-block">
              <div>
                <img src="https://img.freepik.com/premium-photo/innovative-farmer-utilizing-mobile-app-precision-plant-disease-diagnosis_38013-18756.jpg" className="homeImg img-fluid float-end" alt="Agro Shield" />
              </div>
            </div>
          </div>
        </div>


        {/* Key Features */}
        <div id = "sectionKeyFeatures" className="key-feature">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <p className="kf-para">Explore the tools and resources designed to help you diagnose and treat plant diseases.</p>
                <h1 className="kf-heading">Key Features of Agro Shield</h1>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-12 col-md-4 mb-5">
                <h1 className="kf-h">Advanced Diagnostic Tool</h1>
                <p className="kf-p">Upload images of your plants and get accurate diagnosis using our CNN model.</p>
                <img src="https://i.ibb.co/K7qT3XV/KEY1.jpg" alt="Diagnostic Tool" className="kf-image img-fluid"/>
                <p className="kf-p pt-3">Our state-of-the-art model identifies plant diseases with high accuracy, helping you take timely action.</p>
              </div>

              <div className="col-12 col-md-4 mb-5">
                <h1 className="kf-h">Comprehensive Disease Database</h1>
                <p className="kf-p">Access detailed information about various plant diseases and their treatments.</p>
                <img src="https://i.ibb.co/DDmL2QV/key2.jpg" alt="Disease Database" className="kf-image img-fluid"/>
                <p className="kf-p pt-3">Stay informed about the latest in plant disease management with our extensive database.</p>
              </div>

              <div className="col-12 col-md-4 mb-5">
                <h1 className="kf-h">Role-Based Authentication</h1>
                <p className="kf-p">Ensure secure access to diagnostic tools and data.</p>
                <img src="https://i.ibb.co/j559Bdg/key3.jpg" alt="Role-Based Authentication" className="kf-image img-fluid"/>
                <p className="kf-p pt-3">Our platform provides role-based authentication to protect your data and ensure only authorized access.</p>
              </div>
            </div>
          </div>
        </div>


        {/* How it Works Section */}
        <div id = "sectionUploadAndDiagnosis" className="container-fluid work-section py-5">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center text-md-left">
              <h1 className="work-heading text-left">How It Works</h1>
              <p className="work-para text-left">Follow these simple steps to diagnose plant diseases and protect your crops.</p>
            </div>
            <div className="col-12 col-md-6">
              <img src="https://i.ibb.co/KDWHJz6/key4.jpg" alt="How It Works" className="work-image img-fluid float-end mr-5 ml-3" />
            </div>
          </div>
        </div>

        <div className="container-fluid work-section py-5">
          <div className="row text-center">
            <div className="col-12 col-md-4 mb-4">
              <div className="d-flex flex-column ">
                <div className="d-flex flex-row  align-items-center mb-2">
                  <span className="span">01</span>
                  <hr className="hr  w-100" />
                </div>
                <h1 className="card-heading">Upload Plant Images</h1>
                <p className="card-para">Take clear pictures of your plants and upload them to our platform.</p>
              </div>
            </div>

            <div className="col-12 col-md-4 mb-4">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row align-items-center mb-2">
                  <span className="span">02</span>
                  <hr className="hr  w-100" />
                </div>
                <h1 className="card-heading">Get Diagnoses</h1>
                <p className="card-para">Our CNN model analyzes the images and provides accurate diagnoses.</p>
              </div>
            </div>

            <div className="col-12 col-md-4 mb-4">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row align-items-center mb-2">
                  <span className="span">03</span>
                  <hr className="hr  w-100" />
                </div>
                <h1 className="card-heading">Receive Treatment Advice</h1>
                <p className="card-para">Get detailed information on how to treat the diagnosed diseases.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;
