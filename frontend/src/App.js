import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// User side imports
import Freelancer from './layout/freelancer/index';
import HomePage from './layout/homepage/index';
import Business from './layout/Buisness';
import FreeListing from './layout/Freelisting';
import Contact from './layout/contactus';
import About from './layout/aboutus';
import Terms from './layout/termsandcondition';
import Privacy from './layout/privacy';
import CategoriesList from './layout/category';
import LocationsList from './layout/category/location';
import Wishlist from './layout/wishlist';
import Userprofile from './layout/userprofile';
import Notification from './layout/notification';
import Advertise from './layout/advertise';
import Pricing from './layout/pricing';
import ServiceProfileForm from './layout/userprofile/service';
import CategoriesDetails from './layout/category/details';
import RegisterCustomer from './layout/register/customer';
import RegisterBusiness from './layout/register/business';
import RegisterFreelancer from './layout/register/freelancer';
import RegisterUser from './layout/register/user';
import TodayOffer from './layout/todayoffer';
import Signin from './layout/signin';
import BusinessDetails from './layout/Buisness/details';
import PrivacySetting from './layout/userprofile/privacy';
import FreelancerDetails from './layout/Buisness/freelancer';
import Userdetails from './layout/userprofile/param';

import Login from './views/pages/login/Login';
import DefaultLayoutAdmin from './adminlayout/DefaultLayout';

import Bizsales from './layout/bizsales';
import UserNotifications from './usernotification';
import FreelistingForm from './layout/Freelisting/register';
import BusinessUpdate from './layout/register/businessupdate';
import Jobs from './layout/jobs';

function App() {
  return (
    <Router>
     
      <Routes>
        {/* User routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path="/freelancerdetails" element={<FreelancerDetails />} />
        <Route path="/business" element={<Business />} />
        <Route path="/businessdetails" element={<BusinessDetails />} />
        <Route path="/free-listing" element={<FreeListing />} />
        <Route path="/free-listingform" element={<FreelistingForm />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/termsandcondition" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/categorieslist/:id" element={<CategoriesList />} />
        <Route path="/locationlist/:id" element={<LocationsList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/usersdetails" element={<Userdetails />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/service" element={<ServiceProfileForm />} />
        <Route path="/categories-details/:id" element={<CategoriesDetails />} />
        <Route path="/today-offer" element={<TodayOffer />} />
        <Route path="/bizsales" element={<Bizsales />} />
        <Route path="/registercustomer" element={<RegisterCustomer />} />
        <Route path="/registerbusiness" element={<RegisterBusiness />} />
        <Route path="/update-to-business" element={<BusinessUpdate />} />
        <Route path="/registerfreelancer" element={<RegisterFreelancer />} />
        <Route path="/registeruser" element={<RegisterUser />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/privacysetting" element={<PrivacySetting />} />
        <Route path="/jobs" element={<Jobs />} />
        
        <Route path="*" element={<DefaultLayoutAdmin />}/> 
        <Route path="/adminlogin" element={<Login />}/> 
      </Routes>
    </Router>
  );
}

export default App; 