#Blockly i18n observe loader library

NOTE: this is an experiment for hot translating using object observers but isn't yet and is in early research.

Useful functions for the translation of the Blockly blocks without recharging the page. This is a set of functions that can be used for building i18n web apps and a simple way to achieve the translation of the blocks.

See a demo of the blockly core blocks observe translating [here][live-demo].

[live-demo]: https://carloslfu.github.io/Blockly-i18n-hot-loader/observe demo/

##Getting Started

For a complete and functional example see the demo in `observe demo/` folder.

Here is an overview of how get started with the library:

Include the `observe.js` and `blockly-i18-hot-loader.js` files after the blockly files (blockly_compressed ...), see the [demo/index.html][demo-page-git] file.

Charge the language after create a blockly instance:
```
// via script
loadLang('path2i18n/', 'en', function() { // must have a file in path2i18n/ folder called en.js
  workspace = Blockly.inject('blocklyDiv',
  {toolbox: document.getElementById('toolbox')});
});
// or via json: this function assign to Blockly.Msg the file en.json
loadLangJSON('path2i18n/', 'en', 'Blockly.Msg', function() { // must have a file in path2i18n/ folder called en.json
  workspace = Blockly.inject('blocklyDiv',
  {toolbox: document.getElementById('toolbox')});
});
```
and change the language whenever you want:
```
// via script
loadLang('path2i18n/', 'es'); // must have a file in path2i18n/ folder called es.js
// or via json: this function assign to Blockly.Msg the file es.json
loadLangJSON('path2i18n/', 'es', 'Blockly.Msg'); // must have a file in path2i18n/ folder called es.json
});
```

Next, in your custom blocks in each field that needs translation put the msg into a anonimous function like:
```
// before
this.appendStatementInput('DO0')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
// after
this.appendStatementInput('DO0')
        .appendField(function() {return Blockly.Msg.CONTROLS_IF_MSG_THEN});
```

Now when you change the language, all block fields are updated.

##How works?

This library uses [polymer/observe-js][polymer-observe-js-git] library for observe the changes in the i18n messages and patch some blockly methods for allowing hot translation.

##Missing features

Support for RTL: a patch for workspaces that allows change RTL without destroy the instance, the patch should allow this:
```
workspace.setRTL(true);
```

[polymer-observe-js-git]: https://github.com/Polymer/observe-js
[demo-page-git]: https://github.com/carloslfu/blob/master/Blockly-i18n-hot-loader/demo/index.html
