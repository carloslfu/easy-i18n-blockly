// i18n hot loader library

function loadLangJSON(path, langStr, objStr, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', path + langStr + '.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      eval(objStr + '= JSON.parse(xobj.responseText)');
      if (callback)
        callback();
    }
  };
  xobj.send(null);
}
function loadLang(path, langStr, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/javascript");
  xobj.open('GET', path + langStr + '.js', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      eval(xobj.responseText);
      if (callback)
        callback();
    }
  };
  xobj.send(null);
};
function reloadWorkspace(workspace) {
  var blocklyDom = Blockly.Xml.workspaceToDom(workspace);
  workspace.getAllBlocks().forEach(function (el) {
    el.dispose(true, false);
  });
  Blockly.Xml.domToWorkspace(workspace, blocklyDom);
};