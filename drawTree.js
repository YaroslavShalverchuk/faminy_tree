function DrawTree() {
  this.stage = false;
  this.layers = {};
  this.currentLayer = false;
  this.box_background = "#c3c0c9";
  this.box_stock = "#555";
  this.box_stock_selected = "#223388";
  this.center = [0,0];
  this.blockSizes = [70, 200];
  this.boxOffset = [10, 20];
  this.sex = ['Мужской', 'Женский'];
  this.currentBlock = false;

  this.init = function(id) {
    this.canvId = id;
    this.createStage();
    this.setCenter();
    this.createLayer('main');

    this.addAllToStage();

  };


  this.drawUser = 0;

  this.drawOwner = function (person) {
      let data = {'id' : 0};

      data['x'] = this.center[0] - this.blockSizes[1] / 2;
      data['y'] = this.center[1] + this.blockSizes[0] / 2;
      for(let itr in person) {
          data[itr] = person[itr];
      }

      this.drawBlock(data);
  };


  this.getSex = function (sex) {
      return this.sex[sex];
  };


  this.drawBlock = function (data) {
      let self = this;
      console.log(data);

      let box = new Konva.Rect({
          x: data.x,
          y: data.y,
          width: self.blockSizes[1],
          height: self.blockSizes[0],
          fill: self.box_background,
          stroke: self.box_stock ,
          strokeWidth: 1,
          draggable: false,
          cornerRadius: 3,
      });

      let box_for_click = new Konva.Rect({
          x: data.x,
          y: data.y,
          width: self.blockSizes[1],
          height: self.blockSizes[0],
          strokeWidth: 1,
          stroke: self.box_stock_selected,
          draggable: false,
          person_id : data.id,
          object_draw : self,
          cornerRadius: 3,
      });

      box_for_click.on('mouseup', function(e) {
        let attr = e.target.attrs;

        if(attr.object_draw.currentBlock && attr.object_draw.currentBlock.attrs.person_id != attr.person_id) {
            attr.object_draw.currentBlock.attrs.stroke = attr.object_draw.box_stock;
        }

          attr.object_draw.currentBlock = e.target;
          attr.object_draw.tree.current_person = attr.person_id;
          attr.object_draw.redraw();
      });

      let name = new Konva.Text({
          x: data.x + self.boxOffset[1],
          y: data.y + self.boxOffset[0],
          text: data.name + " " + data.surname,
          fontSize: 15,
          fontFamily: 'Calibri',
          fill: '#000',
          width: self.blockSizes[1],
          padding: 0,
          align: 'left'
      });


      let complexText = new Konva.Text({
          x: data.x + self.boxOffset[1],
          y: data.y + self.boxOffset[0] + 20,
          text: "Дата рождения : " + data.birdth_date + "\nПол : " + self.getSex(data.user_sex),
          fontSize: 12,
          fontFamily: 'Calibri',
          fill: '#333333',
          width: self.blockSizes[1],
          padding: 0,
          align: 'left'
      });

      self.addToLayer(box);
      self.addToLayer(complexText);
      self.addToLayer(name);
      self.addToLayer(box_for_click);
  };

  this.redraw = function() {
    this.stage.draw();
  };


  this.setCenterBlock = function(elem) {
      this.stage.offsetX(-50).draw();

  };



    this.setCenter = function() {
    let canvas =  $("#" + this.canvId);
    this.center = [canvas.width() / 2,  canvas.height() / 2];
  };

  this.addToLayer = function(elem) {
    this.getCurrentLayer().add(elem).draw();
  };

  this.addAllToStage = function() {
    let self = this;
    for(let i in self.layers) {
      self.addToStage(self.layers[i]);
    }
  };

  this.addToStage = function(layer) {
    this.getStage().add(layer);
  };

  this.getStage = function() {
    if(!this.stage) {
      return this.createStage();
    } else {
      return this.stage;
    }
  };

  this.createLayer = function(name) {
    this.layers[name] = new Konva.Layer();
    this.setCurrentLayer(name);
  };

  this.setCurrentLayer = function(name) {
    if(!this.layers[name]) {
      throw('layer are not exsist');
    }

    this.currentLayer = name;
  };

  this.getCurrentLayer = function() {
    if(!this.layers[this.currentLayer]) {
      throw('layers are not created');
    }

    return this.layers[this.currentLayer];
  };

  this.createStage = function() {
    if(!this.canvId) {
      throw('canvas id is empty');
    } else {
      let self = this;
      let canvas =  $("#" + self.canvId);
      this.stage = new Konva.Stage({
          container:  self.canvId,
          width: canvas.width(),
          height: canvas.height(),
          draggable: true,
      });

        this.stage.on('click', function() {
            console.log('usual click on ' + JSON.stringify(self.stage.getOffset()));
        });


      return this.stage;
    }
  }


}
