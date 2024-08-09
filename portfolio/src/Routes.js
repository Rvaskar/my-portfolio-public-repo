import React from 'react'
import { Route, Routes as Router } from 'react-router-dom'
import About from './components/User/about/About'
import Resume from './components/User/resume/Resume'
import Projects from './components/User/Projects/Projects'
import PortfolioContextProvider from './context/PortfolioContextProvider'
import InfoProvider from './context/InfoProvider'
import Portfolio from './pages/Portfolio'
import PageNotFound from './pages/PageNotFound'
import ProjectDetails from './components/User/Projects/ProjectDetails'
import ProjectAction from './components/Admin/ProjectAction'
import Contact from './components/User/Contact'
import UploadProject from './components/Admin/UploadProject'
import AllProject from './components/Admin/AllProject/AllProject'
import AddCourse from './components/Admin/AllCourses/AddCourse'
import AllCourses from './components/Admin/AllCourses/AllCourses'
import AddCertificate from './components/Admin/Certificates/AddCertificate'
import AllCertificates from './components/Admin/Certificates/AllCertificates'
import ContactMessage from './components/Admin/contact/ContactMessage'
import UpdateCourse from './components/Admin/AllCourses/UpdateCourse'
import Auth from './components/Admin/Auth/Auth'


const Routes = () => {
  return (
    <>
        <Router>
            {/* <Route path='/' element={<About/>}  />
            <Route path='/resume' element={<Resume/>}  />
            <Route path='/projects' element={<Projects/>}  />
            <Route path='*' element={<PageNotFound/>}/>
             */}


      {/* User Routes */}
      <Route
        path="/*"
        element={
          <PortfolioContextProvider>
            <Router>
            <Route path='/' element={<Portfolio/>}  >
              <Route index element={<About/>}  />
              <Route path='resume' element={<Resume/>}  />
              <Route path='projects' element={<Projects/>}  />
              <Route path='contact' element={<Contact/>}  />
              <Route path='project/:id' element={<ProjectDetails/>}  />
              <Route path='*' element={<PageNotFound/>}/>
            </Route>
                
            </Router>
          </PortfolioContextProvider>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <InfoProvider>
            <Router>
              <Route path='/' element={<ProjectAction />}>
                <Route  path='upload' element={<UploadProject/>}/>
                <Route index element={<AllProject/>}/>
                <Route path='addCourse' element={<AddCourse/>}/>
                <Route path='allCourse' element={<AllCourses/>}/>
                <Route path='updateCourse/:id' element={<UpdateCourse/>}/>
                <Route path='allCertificate' element={<AllCertificates/>}/>
                <Route path='addCertificate' element={<AddCertificate/>}/>
                <Route path='allMessage' element={<ContactMessage/>}/>
               
              </Route>
                <Route path='admin-login/auth' element={<Auth/>} />
              {/* <Route path="login" element={<AdminLogin />} /> */}
            </Router>
          </InfoProvider>
        }
        />
        </Router>
    </>
  )
}

export default Routes
