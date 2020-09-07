import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "app";

  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyB15TNoP18CuxSOEqBvo-EqYt6ZC0WdsSk",
      authDomain: "jta-instagram-clone-ec0cc.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-ec0cc.firebaseio.com",
      projectId: "jta-instagram-clone-ec0cc",
      storageBucket: "jta-instagram-clone-ec0cc.appspot.com",
      messagingSenderId: "665670180160",
      appId: "1:665670180160:web:80e8e679dbd03f33e76ea5",
      measurementId: "G-4DHBRRRKL1",
    };

    firebase.initializeApp(firebaseConfig);
  }
}
