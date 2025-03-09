import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  number: string = '';
  result: number | undefined;

  isNan = false;

  notAllowedCharacters: string = '';

  errorMessage: string = '';


  Add(number: string): number {

    let numberToArray = number.split('');

    //Step 1

    //number == ''
    if (numberToArray.length == 0) {
      this.errorMessage = '';
      return (this.result = 0);
    } else {

      //number > 0
      //Checking if it's a valid number
      this.checkIfNan(numberToArray)

      if (!this.isNan) {
        //Allow numbers of 1 or 2 digits with comma

        //One digit number:
        if (numberToArray.length == 1) {
          this.errorMessage = '';
          return (this.result = parseInt(numberToArray[0]));

          //Two digit numbers with comma:
        } else if (numberToArray.length == 3 && numberToArray[1] == ',') {
          const filteredArray = numberToArray.filter((el) => el != ',');
          this.errorMessage = '';
          this.result = parseInt(filteredArray[0]) + parseInt(filteredArray[1]);
          return this.result;

          //If it's not a 1 or 2 digit number, but it's a valid number, then:
        } else {
          this.errorMessage = 'Step 2 rigo 55';
        }

        //But if it's not a valid number, then:
      } else {
        this.result = undefined;
        this.errorMessage = 'Errore: inserire solo numeri validi rigo 63';
      }

        return this.result ? this.result : 0;

      }
    }

  checkIfNan(numbers: string[]): boolean {

    this.notAllowedCharacters = '';
    let countDigits = numbers.length;

    if (
      numbers[0] != ',' &&
      numbers[countDigits - 1] != ','
    ) {

      numbers.forEach((n) => {

        if (!Number.isNaN(parseInt(n)) || n == ',' && numbers.indexOf(',') == numbers.lastIndexOf(',')) {
          return (this.isNan = false);
        } else {
          this.notAllowedCharacters += n;
          return (this.isNan = true);
        }
      })

    } else{
      return this.isNan = true;
    }

    if(this.notAllowedCharacters != ''){
      this.isNan = true;
    }

    return this.isNan = this.isNan;

  }

}

