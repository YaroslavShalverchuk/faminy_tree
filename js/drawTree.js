function DrawTree() {
  this.stage = false;
  this.layers = {};
  this.currentLayer = false;
  this.background_color = "#fefeff";
  this.center = [0,0];

  this.init = function(id) {
    this.canvId = id;
    this.createStage();
    this.setCenter();
    this.createLayer('main');
    this.createBackground();

    this.addAllToStage();

  },


  this.setCenter = function() {
    this.center = [ $("#" + self.canvId).width() / 2,  $("#" + self.canvId).height() / 2];
  }

  this.addToLayer = function(elem) {
    this.getCurrentLayer().add(elem);
  },

  this.addAllToStage = function() {
    var self = this;
    for(var i in self.layers) {
      self.addToStage(self.layers[i]);
    }
  }

  this.addToStage = function(layer) {
    this.getStage().add(layer);
  },

  this.createBackground = function() {
    var self = this;
    var box = new Konva.Rect({
       x: -2200,
       y: -2200,
       offset: [50, 25],
       width: 5000,
       height: 5000,
       fill: self.background_color,
       stroke: 'black',
       strokeWidth: 1,
       draggable: true,
   });
   self.addToLayer(box);

  },

  this.getStage = function() {
    if(!this.stage) {
      return this.createStage();
    } else {
      return this.stage;
    }
  }

  this.createLayer = function(name) {
    this.layers[name] = new Konva.Layer();
    this.setCurrentLayer(name);
  }

  this.setCurrentLayer = function(name) {
    if(!this.layers[name]) {
      throw('layer are not exsist');
      return false;
    }

    this.currentLayer = name;
  }

  this.getCurrentLayer = function() {
    if(!this.layers[this.currentLayer]) {
      throw('layers are not created');
      return false;
    }

    return this.layers[this.currentLayer];
  }

  this.createStage = function() {
    if(!this.canvId) {
      throw('canvas id is empty');
      return false;
    } else {
      var self = this;
      this.stage = new Konva.Stage({
          container:  self.canvId,
          width: $("#" + self.canvId).width(),
          height: $("#" + self.canvId).height(),
      });

      return this.stage;
    }
  }


}
