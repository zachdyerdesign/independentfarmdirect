var zachdyerdesign = zachdyerdesign || {};

zachdyerdesign.binary = {
  convert: function(binary) {
    // Check if input is 0's and 1's
    for(var i = 0; i < binary.length; i++) {
      if(binary[i] != 0 && binary[i] != 1) {
        return false;
      }
    }

    // Process binary to whole number
    var
      binary = zachdyerdesign.string.reverse(binary.toString()),
      bit = 1,
      values = [],
      sum = 0

    for (i = 0; i < binary.length; i++ ) {
       if(parseInt(binary[i])) {
         values.push(bit);
         bit = bit * 2;
       } else {
         bit = bit * 2;
       }
    }

    for (i = 0; i < values.length; i++) {
      sum += values[i];
    }

    return sum;

  }
};
