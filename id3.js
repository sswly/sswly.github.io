var testSample = [
  {"Outlook":"Sunny","Temperature":"Hot","Humidity":"High","Wind":"Weak","Play ball":"No"},
  {"Outlook":"Sunny","Temperature":"Hot","Humidity":"High","Wind":"Strong","Play ball":"No"},
  {"Outlook":"Overcast","Temperature":"Hot","Humidity":"High","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Rain","Temperature":"Mild","Humidity":"High","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Rain","Temperature":"Cool","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Rain","Temperature":"Cool","Humidity":"Normal","Wind":"Strong","Play ball":"No"},
  {"Outlook":"Overcast","Temperature":"Cool","Humidity":"Normal","Wind":"Strong","Play ball":"Yes"},
  {"Outlook":"Sunny","Temperature":"Mild","Humidity":"High","Wind":"Weak","Play ball":"No"},
  {"Outlook":"Sunny","Temperature":"Cool","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Rain","Temperature":"Mild","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Sunny","Temperature":"Mild","Humidity":"Normal","Wind":"Strong","Play ball":"Yes"},
  {"Outlook":"Overcast","Temperature":"Mild","Humidity":"High","Wind":"Strong","Play ball":"Yes"},
  {"Outlook":"Overcast","Temperature":"Hot","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Rain","Temperature":"Mild","Humidity":"High","Wind":"Strong","Play ball":"No"},
];

function getEntropy(sample, attr) {
  var total = 0;
  var attrClassNum = {};
  sample.forEach(function(item, index){
    if (attrClassNum[item[attr]] != undefined) {
      attrClassNum[item[attr]]++;
    } else {
      attrClassNum[item[attr]] = 0;
    }
    total++;
  });
  console.log("total=" + total);
  console.log("attr num=" + attrClassNum.toString());
  
  var entropy = 0.0;
  Object.keys(attrClassNum).forEach(function(item, index){
    alert(attrClassNum[item]);
    entropy += -(attrClassNum[item] / total) * (Math.log(attrClassNum[item] / total) / Math.log(2));
  });
  return entropy;
  //return -(9/14)*(Math.log(9/14)/Math.log(2))-(5/14)*(Math.log(5/14)/Math.log(2));
}

