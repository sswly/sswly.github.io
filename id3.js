function getEntropy(sample, total) {
  var entropy = 0.0;
  sample.forEach(function(item, index){
    entropy += -(item / total) * (Math.log(item / total) / Math.log(2));
  });
  return entropy;
  //return -(9/14)*(Math.log(9/14)/Math.log(2))-(5/14)*(Math.log(5/14)/Math.log(2));
}
