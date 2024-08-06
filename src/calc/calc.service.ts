import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto) {
    const { expression } = calcBody;

    //Forming a regex - Starts with a number followed by series of operators and numbers and ending with a number.
    const validExpression = /^(\d+)([\+\-\*\/]\d+)*$/;

    //Checking if the expression string matches the pattern according to the validExpression.
    if (!validExpression.test(expression)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid expression provided',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // matches with the given expression and returns an array of numbers and operators
      const exp = expression.match(/(\d+|\+|\-|\*|\/)/g);
      let result = parseFloat(exp[0]); // As the expression starts with a number initialising the final result with the first number.

      //Iterates through the exp array to find the operators and numbers.
      for (let i = 1; i < exp.length; i += 2) {
        const operators = exp[i];
        const nums = parseFloat(exp[i + 1]);

        //Performing arithmatic operations according to the operators
        switch (operators) {
          case '+':
            result += nums;
            break;
          case '-':
            result -= nums;
            break;
          case '*':
            result *= nums;
            break;
          case '/':
            result /= nums;
            break;
          default:
            throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Invalid expression provided',
                error: 'Bad Request',
              },
              HttpStatus.BAD_REQUEST,
            );
        }
      }
      return result;
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Invalid expression provided',
        error: 'Bad Request',
      };
    }
  }
}
