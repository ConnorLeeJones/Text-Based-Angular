import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-turn',
  templateUrl: './player-turn.component.html',
  styleUrls: ['./player-turn.component.css']
})
export class PlayerTurnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getUserChoice();
  }


  getUserChoice() {
    $("choice").show();
    let choice: String;
    $('#submit1, #submit2').click(function () {
      function blah(): void {
        this.continueCode();
      }
      if (this.id == 'submit1') {
         alert('Submit 1 clicked');
         choice = "1";
         blah();
      }
      else if (this.id == 'submit2') {
         alert('Submit 2 clicked');
         choice = "2";
         blah();
      }
    });
    
  }


  continueCode(choice: String){
    console.log(choice);
  }

  // public test(evt){
  //   $("input").click(function(e){
  //     var idClicked = e.target.id;
  //     console.log(idClicked);
  //     console.log("FSDF");
  // });
  // }

//   $("input").click(function(e){
//     var idClicked = e.target.id;
//     console.log(idClicked);
//     console.log("FSDF");
// });







}
