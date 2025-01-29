import { Component } from '@angular/core';
import { NetworkService } from './network.service';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'wordle';
  words: any = Array(6)
    .fill(null)
    .map(() => Array(5).fill({ chr: '', color: 'chgray' }));
  cells: any = Array(30);
  row: number = 0;
  col: number = 0;
  dictionary: any = [];
  kyb1: any = [
    { chr: 'Q', color: 'cgray' },
    { chr: 'W', color: 'cgray' },
    { chr: 'E', color: 'cgray' },
    { chr: 'R', color: 'cgray' },
    { chr: 'T', color: 'cgray' },
    { chr: 'Y', color: 'cgray' },
    { chr: 'U', color: 'cgray' },
    { chr: 'I', color: 'cgray' },
    { chr: 'O', color: 'cgray' },
    { chr: 'P', color: 'cgray' },
  ];
  kyb2: any = [
    { chr: 'A', color: 'cgray' },
    { chr: 'S', color: 'cgray' },
    { chr: 'D', color: 'cgray' },
    { chr: 'F', color: 'cgray' },
    { chr: 'G', color: 'cgray' },
    { chr: 'H', color: 'cgray' },
    { chr: 'J', color: 'cgray' },
    { chr: 'K', color: 'cgray' },
    { chr: 'L', color: 'cgray' },
  ];
  kyb3: any = [
    { chr: 'Z', color: 'cgray' },
    { chr: 'X', color: 'cgray' },
    { chr: 'C', color: 'cgray' },
    { chr: 'V', color: 'cgray' },
    { chr: 'B', color: 'cgray' },
    { chr: 'N', color: 'cgray' },
    { chr: 'M', color: 'cgray' },
  ];
  wordle: string = '';
  constructor(private nt: NetworkService) {}

  typeWord(key: any) {
    if (this.row < 6 && this.col < 5) {
      this.words[this.row][this.col] = { chr: key, color: 'chgray' };
      this.col++;
    }
  }

  verifyWord() {
    let word: string = '';
    this.words[this.row].map((ele: any) => {
      word += ele.chr.toLowerCase();
    });
    if (this.col == 5) {
      if (word === this.wordle) {
        for (let i = 0; i < word.length; i++) {
          this.words[this.row][i].color = 'cgreen';
          this.kyb1.map((ele: any) => {
            if (ele.chr === word.charAt(i).toUpperCase()) {
              ele.color = 'cgreen';
            }
          });
          this.kyb2.map((ele: any) => {
            if (ele.chr === word.charAt(i).toUpperCase()) {
              ele.color = 'cgreen';
            }
          });
          this.kyb3.map((ele: any) => {
            if (ele.chr === word.charAt(i).toUpperCase()) {
              ele.color = 'cgreen';
            }
          });
        }
        alert('You guessed the right word!');
        return
      } else {
        if (this.dictionary.includes(word)) {
          for (let i = 0; i < word.length; i++) {
            if (word.charAt(i) === this.wordle.charAt(i)) {
              this.words[this.row][i].color = 'cgreen';
              this.kyb1.map((ele: any) => {
                if (ele.chr === word.charAt(i).toUpperCase()) {
                  ele.color = 'cgreen';
                }
              });
              this.kyb2.map((ele: any) => {
                if (ele.chr === word.charAt(i).toUpperCase()) {
                  ele.color = 'cgreen';
                }
              });
              this.kyb3.map((ele: any) => {
                if (ele.chr === word.charAt(i).toUpperCase()) {
                  ele.color = 'cgreen';
                }
              });
            } else if (this.wordle.includes(word.charAt(i))) {
              this.words[this.row][i].color = 'corange';
              this.kyb1.map((ele: any) => {
                if (ele.chr === word.charAt(i).toUpperCase()) {
                  ele.color = 'corange';
                }
              });
              this.kyb2.map((ele: any) => {
                if (ele.chr === word.charAt(i).toUpperCase()) {
                  ele.color = 'corange';
                }
              });
              this.kyb3.map((ele: any) => {
                if (ele.chr === word.charAt(i).toUpperCase()) {
                  ele.color = 'corange';
                }
              });
            } else {
              this.words[this.row][i].color = 'cwhite';
              this.kyb1.map((ele: any) => {
                if (ele.chr === word.charAt(i).toUpperCase()) {
                  ele.color = 'cwhite';
                }
              });
              this.kyb2.map((ele: any) => {
                if (ele.chr === word.charAt(i).toUpperCase()) {
                  ele.color = 'cwhite';
                }
              });
              this.kyb3.map((ele: any) => {
                if (ele.chr === word.charAt(i).toUpperCase()) {
                  ele.color = 'cwhite';
                }
              });
            }
          }
          this.col = 0;
          this.row++;
        } else {
          alert('Not a valid Word');
        }
      }
    }
    if (this.row == 6) {
      alert(`Correct word is ${this.wordle}`);
    }
  }

  deleteWord() {
    if (this.col >= 0) {
      this.col > 0 && this.col--;
      this.words[this.row][this.col] = '';
    }
  }

  reveal(){
    alert(`Correct word is ${this.wordle}`)
  }

  load(){
    window.location.href='';
  }

  ngOnInit() {
    this.nt.getWords().subscribe({
      next: (resp: any) => {
        this.dictionary = resp.split('\n');
        this.wordle = this.dictionary[Math.round(Math.random() * 5000)];
      },
      error: (err: any) => {},
    });
  }
}
