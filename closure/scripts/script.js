    /*
         multiply(3) => 3;
         multiply(6) => 3 * 6 => 18;
      */

      // Define outer function
      const multiply = () => {
        // define outer value
        let multiplier = 1;

        // return new function with inner value
        return function (num = 1) {
          multiplier *= num;
          return multiplier;
        };
      };

      let result = multiply();

      console.log(result(2));
      console.log(result(4));
      console.log(result(8));