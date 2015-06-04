#Blockly i18n hot loader library

Useful functions for the translation of the Blockly blocks without recharging the page. This is a set of functions that can be used for building i18n web apps and a simple way to achieve the translation of the blocks.

See a demo of the blockly core blocks hot translating [here][live-demo].

[live-demo]: https://carloslfu.github.io/easy-i18n-blockly/simple%demo/

##Getting Started

For a complete and functional example see the demo in `simple demo/` folder.

Here is an overview of how get started with the library:

Include the `observe.js` and `blockly-i18-hot-loader.js` files after the blockly files (blockly_compressed ...), see the [simple demo/index.html][demo-page-git] file.

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
loadLang('path2i18n/', 'es', function() { // must have a file in path2i18n/ folder called es.js
  reloadWorkspace(workspace);
});
// or via json: this function assign to Blockly.Msg the file es.json
loadLangJSON('path2i18n/', 'es', 'Blockly.Msg', function() {  // must have a file in path2i18n/ folder called es.json
  reloadWorkspace(workspace);
});
```

[demo-page-git]: https://github.com/carloslfu/blob/master/easy-i18n-blockly/simple%demo/index.html
