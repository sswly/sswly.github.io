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

function isValidData(data, attrs) {
  if (attrs == undefined || attrs == null) {
    return true;
  }
  
  var result = true;
  attrs.forEach(function(item, index){
    if (data[item["attr"]] != item["value"]) {
      result = false;
      return;
    }
  });
  return result;
}

function getAttrData(sample, attr, attrStack) {
  var attrData = {"total":0, "data":{}};
  sample.forEach(function(item, index){
    if (!isValidData(item, attrStack)) {
      return;
    }
    
    if (attrData["data"][item[attr]] != undefined) {
      attrData["data"][item[attr]]++;
    } else {
      attrData["data"][item[attr]] = 1;
    }
    attrData["total"]++;
  });
  console.log("attr data: " + JSON.stringify(attrData));
  return attrData;
}

function getEntropy(sample, attr, attrStack) {
  var attrData = getAttrData(sample, attr, attrStack);
  
  var entropy = 0.0;
  Object.keys(attrData["data"]).forEach(function(item, index){
    entropy += -(attrData["data"][item] / attrData["total"]) * (Math.log(attrData["data"][item] / attrData["total"]) / Math.log(2));
  });
  return entropy;
}

function getGain(sample, attr, attrGain) {
  var attrData = getAttrData(sample, attrGain, null);
  
  var gain = getEntropy(sample, attr);
  Object.keys(attrData["data"]).forEach(function(item, index){
    var attrStack = [{"attr":attrGain, "value":item}];
    gain -= (attrData["data"][item] / attrData["total"]) * getEntropy(sample, attr, attrStack);
  });
  return gain;
}

function getDecisionAttr(sample, attr) {
  var decision = {"gain":0.0};
  Object.keys(sample[0]).forEach(function(item, index){
    if (attr == item) {
      return;
    }
    
    var gain = getGain(sample, attr, item);
    if (gain > decision["gain"]) {
      decision["gain"] = gain;
      decision["attr"] = item;
    }
  });
  return decision["attr"];
}

function test() {
  console.log("entropy=" + getEntropy(testSample, "Play ball", null));
  Object.keys(testSample[0]).forEach(function(item, index){
    console.log("entropy for " + item + "=" + getGain(testSample, "Play ball", item));
  });
  console.log("getDecisionAttr=" + getDecisionAttr(testSample, "Play ball"));
}
