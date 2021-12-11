$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
    Blockly.mainWorkspace.clear();
  });
});

Blockly.Blocks["bot"] = {
  init: function () {
    this.appendValueInput("question")
        .appendField('BOT:')
        .setCheck("bot-answer");
    this.setColour(130);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["bot-questions"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Ask me a question:")
      .appendField(new Blockly.FieldDropdown([["What is the date today?","date"],["What is the time now?","time"], ["How are you?","I am fine."], ["What is JavaScript?","JavaScript is a lightweight, interpreted programming language."],["What is your name?","Rahul Gupta"]]), "ask-me-a-question");
    this.setColour(230);
    this.setOutput(true,"bot-answer");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
Blockly.JavaScript["bot-questions"] = function (block) {
  var text_input = block.getFieldValue("ask-me-a-question");
  if(text_input=="date"){
    var date = new Date();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var year= date.getFullYear();
    text_input =  day+"-"+month+"-"+year; // d-m-yyyy Format will return
  }else if(text_input=="time"){
    var date = new Date();
    var hours = date.getHours();
    var min = date.getMinutes();
    text_input =  hours+":"+min; // 24 hours time Format
  }
  return [text_input, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript["bot"] = function (block) {
  var char_code = Blockly.JavaScript.valueToCode(block, 'question',Blockly.JavaScript.ORDER_NONE);
  var code = `var inputTextValue = '${char_code}';`;
  return code;
};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  redrawUi();
}
