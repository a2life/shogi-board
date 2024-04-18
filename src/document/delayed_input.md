# Use of data-input attribute

- It is possible to add data-input attribute to board-app div for delayed input of kifu data object

`<div class="board-app" data-input="input1"></div>`

In this case, hidden inbox field with element id of input1 is created.

Note: corresponding kifudata object (that may be an empty object) still need to be created for setup array.

Given the kifuData in setup object as kifuDataObject,
the input field can be stuffed with value property of the element. ie.,


```
const inputElement = document.getElementById('input1');
inputElement.value=encodeURIComponent(JSON.stringify(kifuDataObject)
```

Then this input can be dispatched to notify the change to the app.

```
const trigger = new Event('change');
inputElement.dispatchEvent(trigger);
```

The shogiboard app side will first decode URI component and then parse the JSON