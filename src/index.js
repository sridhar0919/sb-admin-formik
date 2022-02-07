import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.css';
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import Teachers from './components/Teachers';
import Students from './components/Students';
import 'bootstrap/dist/css/bootstrap.css';
import Addstudent from './components/Addstudent';
import Updatestudent from './components/Updatestudent';
import Deletestudent from './components/Deletestudent';
import Findstudent from './components/Findstudent';
import Addteacher from './components/Addteacher';
import Updateteacher from './components/Updateteacher';
import Deleteteacher from './components/Deleteteacher';
import Findteacher from './components/Findteacher';

const routing = (
  <Router>
    <div className="d-flex flex-row">
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <div class="sidebar-brand d-flex align-items-center justify-content-center">
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </div>

        <hr class="sidebar-divider my-0" />

        <li class="nav-item active">
          <div class="nav-link">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </div>
        </li>

        <hr class="sidebar-divider" />

        <div class="sidebar-heading">Interface</div>

        <li class="nav-item">
          <Link
            to="/"
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <span>Students</span>
          </Link>
        </li>

        <li class="nav-item">
          <Link
            to="/teachers"
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <span>Teachers</span>
          </Link>
        </li>

        <hr class="sidebar-divider" />
      </ul>
      <Routes>
        <Route exact path="/" element={<Students />} />
        <Route exact path="/teachers" element={<Teachers />} />
        <Route exact path="/students/add" element={<Addstudent />} />
        <Route exact path="/students/update" element={<Updatestudent />} />
        <Route exact path="/students/delete" element={<Deletestudent />} />
        <Route exact path="/students/find" element={<Findstudent />} />
        <Route exact path="/teachers/add" element={<Addteacher />} />
        <Route exact path="/teachers/update" element={<Updateteacher />} />
        <Route exact path="/teachers/delete" element={<Deleteteacher />} />
        <Route exact path="/teachers/find" element={<Findteacher />} />
      </Routes>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
