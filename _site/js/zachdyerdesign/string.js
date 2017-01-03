var zachdyerdesign = zachdyerdesign || {};

zachdyerdesign.string = {
  reverse: function (s) {
    var o = '';
    for (var i = s.length - 1; i >= 0; i--)
      o += s[i];
    return o;
  }
};
