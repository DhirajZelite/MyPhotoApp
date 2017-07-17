import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabaseModule, FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public db: AngularFireDatabase) {
    this.books = db.list('/Books');
  }

  AddBook()
  {
    let prompt = this.alertCtrl.create({
      title: 'Add New Book Info',
      message: 'Enter the book title and Author',
      inputs: [
        {
          name: 'title',
          placeholder: "Book Title"
        },
        {
          name: 'author',
          placeholder: 'Book Author Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log("cancel click");
          }
        },
        {
          text: 'Save Book',
          handler: data =>{
            this.books.push({
              title: data.title,
              author: data.author
            })
          }
        }
      ],
    });
    prompt.present();
  }

  editBook(book)
  {
    console.log(book.$key);
    let prompt = this.alertCtrl.create({
      title: 'Edit Book Info',
      message: 'Edit the book title and Author',
      inputs: [
        {
          name: 'title',
          placeholder: book.title
        },
        {
          name: 'author',
          placeholder: book.author
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save Book',
          handler: data =>{
            let newTitle:string = book.title;
            let newAuthor:string = book.author;
            if(data.title != '')
            {
              newTitle = data.title;
            }
            if(data.author != '')
            {
              newAuthor = data.author;
            }
            this.books.update(book.$key,{
              title: newTitle,
              author: newAuthor
            })
          }
        }
      ],
    });
    prompt.present();
  }

  deleteBook(bookID)
  {
    let prompt = this.alertCtrl.create({
      title: 'Delete Book',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete Book',
          handler: data =>{
            this.books.remove(bookID)
          }
        }
      ],
    });
    prompt.present();
  }
}
