export function drag(){
  var disX = dixY = 0;
  handle = handle || oDrag;
  handle.style.cursor = "move";
  handle.onmousedown = function (event)
  {
    var xevent = event || window.event;
    disX = event.clientX - oDrag.offsetLeft;
    disY = event.clientY - oDrag.offsetTop;
    document.onmousemove = function (event)
    {
        var event = event || window.event;
        var iL = event.clientX - disX;
        var iT = event.clientY - disY;
        var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
        var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
        iL <= 0 && (iL = 0);
        iT <= 0 && (iT = 0);
        iL >= maxL && (iL = maxL);
        iT >= maxT && (iT = maxT);
        oDrag.style.left = iL + "px";
        oDrag.style.top = iT + "px";
        return false
    };
    document.onmouseup = function ()
    {
        document.onmousemove = null;
        document.onmouseup = null;
        this.releaseCapture && this.releaseCapture()
    };
    this.setCapture && this.setCapture();
    return false
  };
}