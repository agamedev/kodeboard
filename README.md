# kodeboard
Simple javascript HTML5 canvas implementation

_Include kodeboard.js in your HTML file._

```
<script src="../src/kodeboard.js" type="text/javascript"></script>
```

_Create a new KodeBoard_

Within document.body

```
<script type="text/javascript">
var kb = new KodeBoard();
</script>
```
Or

Within your own `div` or container

_Create your container_
```
<div id="container-1" class="container"></div>
```
_Create your KodeBoard_
```
<script type="text/javascript">
var kb = new KodeBoard({"container":"container-1"});
</script>
```

Canvas can now be accessed as follows:

```
var context = kb.canvas.getContext("2d");
```
