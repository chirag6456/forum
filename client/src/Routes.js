import React from 'react'
import { Switch } from 'react-router-dom'
import AppliedRoute from './components/AppliedRoute'
import HomeComponent from './components/home.component'
import LoginComponent from './components/login.component'
import ProfileComponent from './components/profile.component'
import ProtectedRoute from './components/ProtectedRoute'
import ChangePasswordComponent from './components/changepassword.component'
import RegisterComponent from './components/register.component'
import CategoryComponent from './components/category.component'
import AddPostComponent from './components/addpost.component'
import ForgotPassComponent from './components/forgotpass.component'
import ResetPassComponent from './components/resetpass.component'
import VerifyUserComponent from './components/verifyuser.component'
import PostComponent from './components/post.component'
import UpdatePostComponent from './components/updatepost.component'
import DeletePostComponent from './components/deletepost.component'
import DeleteCategoryComponent from './components/deletecategory.component'
import AddCategoryComponent from './components/addcategory.component'
export default function Routes({ appProps }) {
    return (
            <Switch>
                <AppliedRoute path='/' exact component={HomeComponent} appProps={appProps}/>      
                <AppliedRoute path="/login" component={LoginComponent} appProps ={appProps} />
                <AppliedRoute path="/register" component={RegisterComponent} appProps={appProps}/>
                <AppliedRoute path='/category/:id' component={CategoryComponent} appProps={appProps}/>
                <AppliedRoute path='/forgotpass' component={ForgotPassComponent} appProps={appProps}/>
                <AppliedRoute path='/resetpass/:id' component={ResetPassComponent} appProps={appProps}/>
                <AppliedRoute path='/verify/:id' component={VerifyUserComponent} appProps={appProps}/>
                <ProtectedRoute path='/profile' component={ProfileComponent} appProps={appProps}/>                
                <ProtectedRoute path='/changepassword' component={ChangePasswordComponent} appProps={appProps}/>
                <ProtectedRoute path='/addpost/:id' component={AddPostComponent} appProps={appProps}/>
                <AppliedRoute path='/post/:id' component={PostComponent} appProps={appProps}/>
                <ProtectedRoute path='/updatepost/:id' component={UpdatePostComponent} appProps={appProps}/>
                <ProtectedRoute path='/deletepost/:id' component={DeletePostComponent} appProps={appProps}/>
                <ProtectedRoute path='/deletecategory/:id' component={DeleteCategoryComponent} appProps={appProps}/>
                <ProtectedRoute path='/addcategory' component={AddCategoryComponent} appProps={appProps}/>
            </Switch>
    )
}
