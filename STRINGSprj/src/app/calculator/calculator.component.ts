import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { log } from 'console';

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
  negatives: string = '';

  add(number: string): number {

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
          //Step 2;
          this.addAnUnknownAmountOfNumbers(numberToArray);
        }


      } else {

        //If it's a negative number, then:
        //Step 3
        if(parseInt(number) < 0){
          this.negativesNotAllowed(number);

        //If it begins with '//[', we need to check if there's a valid composition with an allowed delimiter, then:
        } else if(numberToArray[0] == '/'){
          this.handleDelimiters(numberToArray);

        //But if it's not a valid number, then:
        }else{
          this.result = undefined;
          this.errorMessage = 'Errore: inserire solo numeri validi rigo 66';
        }

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

  //Step 2
  addAnUnknownAmountOfNumbers(numbers: string[]): number{

    if(parseInt(this.number) <= 1000){

      let sum = 0;

     numbers.forEach((n) => {
        if(n != ','){
         sum += parseInt(n);
        }
      })

    this.errorMessage = '';
    return this.result = sum;

    }else{

      this.handleBiggerNumbers(numbers);
      return 0;

    }

  }

  //Step 3
  negativesNotAllowed(negativeNumber: string): void{

    this.errorMessage = '';
    this.negatives += negativeNumber;
    throw new Error('Negatives not allowed: ' + this.negatives);

  }

  //Step 4
  handleBiggerNumbers(numbers: string[]){

    this.errorMessage = '';
    return this.result = parseInt(numbers.reverse()[0]);

  }

  //Delimiters: Step 5
  handleDelimiters(numbers: string[]): void{

    /*let delimiter: string = "";

    let patternBody = '';
    let patternStructure = '';

    //Number of chars allowed by the costumized delimiter
    let countLength: number = 0;

    //Input field value
    let numbersToString:string = '';

    //Take only delimiter
    let delimiterStructure:string = '';

    let sum: number = 0;
    let sumDelimiters: number = 0;

    if(numbers[1] == '/' &&
      numbers[2] == '[' &&
      Number.isNaN(parseInt(numbers[3]))
    ){

      for (let i = 3; i < numbers.length - 1; i++) {
        if(numbers[i] == numbers[3]){
          delimiter += numbers[i];
        }else{
          break;
        }

      }

      patternBody = '[' + delimiter + ']';
      patternStructure = '//' + patternBody + '//';

      countLength = delimiter.length + 6;
      numbersToString = numbers.toString().replace(/,/g, '');
      delimiterStructure = numbersToString.slice(0, countLength)

      if(delimiterStructure == patternStructure){
        for (let i = countLength; i < numbers.length; i++) {
          if(!Number.isNaN(parseInt(numbers[i])) && numbers[i] != delimiter[0]){
            sumDelimiters = 0;
            sum += parseInt(numbers[i]);
            this.errorMessage = '';
            this.result = sum;
          } else if (numbers[i] == delimiter[0] && sumDelimiters > delimiter.length){
            //handle delimiters with multiple characters
            sumDelimiters += 1;
          } else {
            this.result = undefined;
            this.errorMessage = 'Errore: inserire solo numeri e delimitatori validi rigo 204';
            break
          }
        }
      }

    }else{
      this.result = undefined;
      this.errorMessage = 'Errore: inserire un delimitatore valido rigo 207';
    }*/

 //CODICE DI PROVA

        // Numero di caratteri consentiti dal delimitatore personalizzato
        let countLength: number = 0;

        // Valore del campo di input
        let numbersToString: string = numbers.join('');

        // Prendere solo il delimitatore
        let delimiterStructure: string = '';

        let sum: number = 0;

        if (numbers[1] == '/' &&
            numbers[2] == '[' &&
            Number.isNaN(parseInt(numbers[3]))
        ) {

            // Costruisci una regex per catturare delimitatori multipli racchiusi tra parentesi quadre
            let delimiterRegex = /\/\/(\[.*?\])+\/\//;
            let match = numbersToString.match(delimiterRegex);

            if (match != null && match[0] != null) {
                // Estrai i delimitatori

                let delimiters = match[0].match(/\[(.*?)\]/g)?.map(d => d.slice(1, -1)) || [];


                // Escapare i delimitatori per l'uso nella regex
                let escapedDelimiters = delimiters!.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

                // Costruisci una regex che corrisponde ai numeri separati da questi delimitatori
                let numberRegex = new RegExp(`\\d+(${escapedDelimiters.join('|')}\\d+)*`);

                countLength = match[0].length;
                numbersToString = numbers.toString().replace(/,/g, '');
                delimiterStructure = numbersToString.slice(0, countLength);

                /*if (delimiterStructure == match[0]) {
                    for (let i = countLength; i < numbers.length; i++) {
                        if (!Number.isNaN(parseInt(numbers[i])) && !escapedDelimiters.includes(numbers[i])) {
                            sum += parseInt(numbers[i]);
                            this.errorMessage = '';
                            this.result = sum;
                        } else if (escapedDelimiters.includes(numbers[i])) {
                          //qui mi va in errore
                            sumDelimiters++;

                            //mi finisce qui
                        } else {
                            this.result = undefined;
                            this.errorMessage = 'Errore: inserire solo numeri e delimitatori validi rigo 204';
                            break;
                        }
                    }*/

                        if (delimiterStructure == match[0]) {
                          let remainingNumbers = numbersToString.slice(countLength);
                          let numberParts = remainingNumbers.split(new RegExp(escapedDelimiters.join('|'))); // Modificato per dividere i numeri usando i delimitatori escapati

                          for (let part of numberParts) {
                            if (
                              !Number.isNaN(parseInt(part)) &&
                              part.length == 1
                            ) {
                              sum += parseInt(part);
                            } else {
                              this.result = undefined;
                              this.errorMessage =
                                'Errore: inserire solo numeri di una cifra e delimitatori validi rigo 204';
                              return;
                            }
                          }

                          this.errorMessage = '';
                          this.result = sum;
                }
            }

        } else {
            this.result = undefined;
            this.errorMessage = 'Errore: inserire un delimitatore valido rigo 207';
        }

  }

}


