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

function containsAttr(attrs, attr) {
  if (attrs == undefined || attrs == null) {
    return false;
  }
  
  var result = false;
  attrs.forEach(function(item, index){
    if (item["attr"] == attr) {
      result = true;
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
//   console.log("attr data: " + JSON.stringify(attrData));
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

function getGain(sample, attr, attrGain, attrStack) {
  var attrData = getAttrData(sample, attrGain, null);
  
  var gain = getEntropy(sample, attr);
  Object.keys(attrData["data"]).forEach(function(item, index){
    var newAttrStack = null;
    if (attrStack == null) {
      newAttrStack = [{"attr":attrGain, "value":item}];
    } else {
      newAttrStack = attrStack.concat({"attr":attrGain, "value":item});
    }
    gain -= (attrData["data"][item] / attrData["total"]) * getEntropy(sample, attr, newAttrStack);
  });
  return gain;
}

function getDecisionAttr(sample, attr, attrStack) {
  var decision = {"gain":0.0};
  Object.keys(sample[0]).forEach(function(item, index){
    if (attr == item || containsAttr(attrStack, item)) {
      return;
    }
    
    var gain = getGain(sample, attr, item, attrStack);
    if (gain > decision["gain"]) {
      decision["gain"] = gain;
      decision["attr"] = item;
    }
  });
  return decision["attr"];
}

function getDecisionTree(sample, attr) {
  var attrStack = null;
  var decisionAttr = getDecisionAttr(sample, attr, attrStack);
  console.log("decisionAttr=" + decisionAttr);
  if (decisionAttr != null) {
    var attrData = getAttrData(sample, decisionAttr, attrStack);
    Object.keys(attrData["data"]).forEach(function(item, index){
      var newAttrStack = null;
      if (attrStack == null) {
        newAttrStack = [{"attr":decisionAttr, "value":attrData["data"][decisionAttr]}];
      } else {
        newAttrStack = attrStack.concat({"attr":attrGain, "value":item});
      }
      console.log("inner decisionAttr=" + getDecisionAttr(sample, attr, newAttrStack));
    });
  }
}

function test() {
  console.log("entropy=" + getEntropy(testSample, "Play ball", null));
  Object.keys(testSample[0]).forEach(function(item, index){
    console.log("entropy for " + item + "=" + getGain(testSample, "Play ball", item, null));
  });
  console.log("getDecisionAttr=" + getDecisionAttr(testSample, "Play ball", null));
  console.log("getDecisionAttr=" + getDecisionAttr(testSample, "Play ball", [{"attr":"Outlook", "value":"Sunny"}]));
  console.log("getDecisionAttr=" + getDecisionAttr(testSample, "Play ball", [{"attr":"Outlook", "value":"Rain"}]));
  getDecisionTree(testSample, "Play ball");
}
