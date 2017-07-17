import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../model/user";
import { AngularFireAuth } from "angularfire2/auth";
import { TabsPage } from "../tabs/tabs";
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  user = {} as User;
  constructor(private afauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,private alertControl: AlertController) {
  }

  async login(user:User){
    try { 
      this.afauth.auth.signInWithEmailAndPassword(user.email,user.password).then((responce)=>{
        let currentuser = {
          email: responce.email,
          id: responce.id,
          picture: responce.photoUrl
        }
        window.localStorage.setItem('currentuser',JSON.stringify(responce));
        this.navCtrl.setRoot(TabsPage);
      }).catch((e)=>{
        let alert = this.alertControl.create({
          title: 'Warning!',
          subTitle: JSON.stringify(e.message),
          buttons: ['OK']
        });
        alert.present();
      });
    } catch (e) {
      console.log(e);
    }
  }

  register()
  {
    this.navCtrl.push(RegisterPage);
  }

  twitterLogin()
  {
    // this.afauth.auth.login({

    // }).then((responce)=>{
    //     let currentuser = {
    //       email: responce.email,
    //       id: responce.id,
    //       picture: responce.photoUrl
    //     }
    //     window.localStorage.setItem('currentuser',JSON.stringify(responce));
    //     this.navCtrl.setRoot(TabsPage);
    //   }).catch((e)=>{
    //     let alert = this.alertControl.create({
    //       title: 'Warning!',
    //       subTitle: JSON.stringify(e.message),
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   });
  }
}
