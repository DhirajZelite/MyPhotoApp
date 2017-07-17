import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { RedditsPage } from '../reddits/reddits';
import { SettingsPage } from '../settings/settings';
import { NavController, IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';
 
@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RedditsPage;
  tab2Root = SettingsPage;
  tab3Root = HomePage;
  tab4Root = AboutPage;
  user : any;
  email: string;

  constructor(public navCtrl: NavController) {
    // window.localStorage.removeItem('currentuser');
    if(!this.isLoggedIn())
    {
      console.log('you are not Logged in')
      this.navCtrl.setRoot(LoginPage);
    }
      this.user =  JSON.parse(window.localStorage.getItem('currentuser'));
  }

  isLoggedIn()
  {
    if(window.localStorage.getItem('currentuser')){
      return true;
    }
  }

  logout()
  {
    window.localStorage.removeItem('currentuser');
    this.navCtrl.setRoot(LoginPage);
  }
}
