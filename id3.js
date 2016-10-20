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
  
//   if (attrData["total"] <= 1)
//     console.log("left one: " + JSON.stringify(attrData));
  return attrData;
}

function getEntropy(sample, attr, attrStack) {
  var attrData = getAttrData(sample, attr, attrStack);
  var entropy = 0.0;

  if (attrData["total"] <= 1) {
    // all sample belong to same class
    return entropy;
  }
  
  Object.keys(attrData["data"]).forEach(function(item, index){
    entropy += -(attrData["data"][item] / attrData["total"]) * (Math.log(attrData["data"][item] / attrData["total"]) / Math.log(2));
  });
  if (entropy == 0.0) {
    console.log("Decision branch: " + JSON.stringify(attrStack));
  }
  return entropy;
}

function getGain(sample, attr, attrGain, attrStack) {
  var gain = getEntropy(sample, attr);
  if (gain == 0.0) {
    return gain;
  }

  var attrData = getAttrData(sample, attrGain, null);
  
  if (attrData["total"] <= 1) {
    return gain;
  }
  
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
    if (gain == 0.0) {
//       decision["gain"] = 0.0;
      return;
    }
    
    if (gain > decision["gain"]) {
      decision["gain"] = gain;
      decision["attr"] = item;
    }
  });
//   console.log("Decision: " + JSON.stringify(decision));
  if (decision["gain"] == 0.0) {
    return null;
  }
  return decision["attr"];
}

function genDecisionBranch(sample, attr, decisionTree) {
  var decisionAttr = getDecisionAttr(sample, attr, decisionTree);
  if (decisionAttr != null && decisionAttr != undefined) {
//     console.log("Decision Node: " + decisionAttr);
    var attrData = getAttrData(sample, decisionAttr, decisionTree);
    if (attrData["total"] <= 1) {
//       console.log("Decision branch: " + JSON.stringify(decisionTree));
//       console.log("Result: " + JSON.stringify(getAttrData(sample, attr, decisionTree)));
      return;
    }
    Object.keys(attrData["data"]).forEach(function(item, index){
      var newDecisionTree = null;
      if (decisionTree == null) {
        newDecisionTree = [{"attr":decisionAttr, "value":item}];
      } else {
        newDecisionTree = decisionTree.concat({"attr":decisionAttr, "value":item});
      }
//       console.log("Direction: " + item);
      genDecisionBranch(sample, attr, newDecisionTree);
    });
  } else {
    console.log("Decision branch: " + JSON.stringify(decisionTree));
    console.log("Result: " + JSON.stringify(getAttrData(sample, attr, decisionTree)));
  }
}

function test() {
  console.log("Version: 1.0.1.4");
  console.log("Release: the decision brach can generate successfully but need to optimize");
//   console.log("entropy=" + getEntropy(testSample, "Play ball", null));
//   Object.keys(testSample[0]).forEach(function(item, index){
//     console.log("entropy for " + item + "=" + getGain(testSample, "Play ball", item, null));
//   });
//   console.log("getDecisionAttr=" + getDecisionAttr(testSample, "Play ball", null));
  console.log("getGain=" + getGain(testSample, "Play ball", "Humidity", [{"attr":"Outlook", "value":"Sunny"}]));
  console.log("getEntropy=" + getEntropy(testSample, "Play ball", [{"attr":"Outlook", "value":"Overcast"}]));
  console.log("getEntropy=" + getEntropy(testSample, "Play ball", [{"attr":"Outlook", "value":"Sunny"}, {"attr":"Humidity", "value":"High"}]));
//   console.log("getDecisionAttr=" + getDecisionAttr(testSample, "Play ball", [{"attr":"Outlook", "value":"Rain"}]));
//   genDecisionBranch(testSample, "Play ball", null);
}
