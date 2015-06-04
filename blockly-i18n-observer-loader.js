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
function observerHelper(obj, func) {
  var observer = new ObjectObserver(obj);
  observer.open(function() {
    func();
  });
};

// Blockly patchs

Blockly.Input.prototype.appendField = function(field, opt_name) {
  // Empty string, Null or undefined generates no field, unless field is named.
  if (!field && !opt_name) {
    return this;
  }
  // Generate a FieldLabel when given a plain text field.
  if (goog.isString(field)) {
    field = new Blockly.FieldLabel(/** @type {string} */ (field));
  }
  //-------- patched: allows using a function in field for hot translating
  if (goog.isFunction(field)) {
    var func = field;
    field = new Blockly.FieldLabel(/** @type {function} */ (func()));
    observerHelper(Blockly.Msg, function() {
      field.setText(func())
    });
  }
  //--------
  if (this.sourceBlock_.rendered) {
    field.init(this.sourceBlock_);
  }
  field.name = opt_name;

  if (field.prefixField) {
    // Add any prefix.
    this.appendField(field.prefixField);
  }
  // Add the field to the field row.
  this.fieldRow.push(field);
  if (field.suffixField) {
    // Add any suffix.
    this.appendField(field.suffixField);
  }

  if (this.sourceBlock_.rendered) {
    this.sourceBlock_.render();
    // Adding a field will cause the block to change shape.
    this.sourceBlock_.bumpNeighbours_();
  }
  return this;
};

Blockly.BlockSvg.prototype.setMutator = function(mutator) {
  if (this.mutator && this.mutator !== mutator) {
    this.mutator.dispose();
  }
  if (mutator) {
    mutator.block_ = this;
    this.mutator = mutator;
    if (this.rendered) {
      mutator.createIcon();
    }
    //-------- patched: mutator hot translation updater
    var thisBlock = this;
    observerHelper(Blockly.Msg, function() {
      if(thisBlock.mutator.isVisible()) {
        thisBlock.mutator.setVisible(false);
        thisBlock.mutator.setVisible(true);
      }
    });
    //--------
  }
};