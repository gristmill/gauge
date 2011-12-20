/*
 * hPos          = horizonal position of arc
 * vPos          = vertical position of arc
 * size          = size of arc
 * startingPoint = left starting point of arc
 * endingPoint   = right starting point of arch
 */

var arc = function(hPos, vPos, size, startingPoint, endingPoint) {
  var startingPoint  = startingPoint * Math.PI / 180;
  var arcCoefficient = endingPoint * Math.PI / 180;
  var endingPoint    = "M " + hPos + " " + vPos;
  var startingPoint  = " L " + (hPos + size * Math.cos(startingPoint)) + " " + (vPos - size * Math.sin(startingPoint));
  var curve          = " A " + [size, size, 0, 0, 1, hPos + size * Math.cos(arcCoefficient), vPos - size * Math.sin(arcCoefficient)].join(" ");

  return endingPoint + startingPoint + curve
}

/*
 * div       = div you want gauge rendered to
 * percent   = percentage you want rendered
 * fill      = background fill color
 * highlight = highlight color used for middle circle
 */

var gauge = function(div, percent, fill, highlight) {
  this.canvas = Raphael(div, 300, 100);

  this.background         = this.canvas.path(arc(80, 80, 76, -180, 0)).attr({ "fill": "#f2f2f2", "stroke": "none" });
  this.fill               = this.canvas.path(arc(80, 80, 76, -180, -180 * (1 + (percent / 100)))).attr({ "fill": fill, "stroke": "none" });
  this.indicator          = this.canvas.rect(80, 80, 76, 3).attr({ "fill": highlight, "stroke": "none" }).rotate(180 * (1 + (percent / 100)), 80, 80);
  this.indicator.rotation = 180 * (1 + (percent / 100));
  this.indicatorCircle    = this.canvas.circle(80, 80, 6).attr({ "fill": highlight, "stroke": "none" });

  return {
    fill:this.fill,
    indicator:this.indicator,
    canvas:this.canvas,
    update:function(percent) {
      this.indicator.rotate(-this.indicator.rotation, 80, 80).rotate(180 * (1 + (percent / 100)), 80, 80);
      this.indicator.rotation = 180 * (1 + (percent / 100));

      this.fill.animate({ path: arc(80, 80, 76, -180, -180 * (1 + (percent / 100))) }, 300, "elastic").attr({ "fill": fill, "stroke": "none" });
    }
  }
};
