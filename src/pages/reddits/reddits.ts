import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';
import { DetailsPage } from '../details/details';
import { LoginPage } from '../login/login';

@Component({
  selector: 'reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage {

  items : any;
  category :any;
  limit : any;
  constructor(public navCtrl: NavController,private redditService:RedditService) {
    this.getDefault();
  }

 getDefault()
 {
   if(localStorage.getItem('category') != null){
     this.category = localStorage.getItem('category');
   }else{
     this.category = 'food';
   }

   if(localStorage.getItem('limit') != null){
     this.limit = localStorage.getItem('limit');
   }else{
     this.limit = 10;
   }
 }
 
  ngOnInit(){
      this.getPosts(this.category,this.limit);
  }

  getPosts(category,limit)
  {
    this.redditService.getPosts(category,limit).subscribe(response => {
      this.items = response.data.children;
    });
  }

  viewItem(item)
  {
    this.navCtrl.push(DetailsPage,{
      item:item
    });
  }

  logout()
  {
    window.localStorage.removeItem('currentuser');
    this.navCtrl.setRoot(LoginPage);
  }

  changeCategory()
  {
    this.getPosts(this.category,this.limit);
  }
}
