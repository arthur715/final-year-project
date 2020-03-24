<template>
  <div id="gameMap">
    <canvas id="game" ref="gameMapCanvas" width="1080" height="800"></canvas>
  </div>
</template>

<script>
import tilesetImage from "../assets/tileset.png"

export default {
  name: 'GameMap',
  components: {
    
  },
  data: function(){
    return{
			canvas: null,
			ctx: null,
			currentSecond: 0, 
			frameCount: 0, 
			framesLastSecond: 0, 
			lastFrameTime: 0,
			gameTime: 0,
			gameSpeeds:	[	{name:"Fast", mult:3},	{name:"Paused", mult:0}	],
			currentSpeed: 0,
			tileset: null,
			tilesetLoaded: false,
			tileW: 40,
			tileH: 40,
			mapW: 20,
			mapH: 20,
			mapTileData: null,
      gameMap: null,
			keysDown: {
				37 : false,
				38 : false,
				39 : false,
				40 : false,
				80 : false,
			},
			player: {
				tileFrom: [1,1],
				tileTo:[1,1],
				timeMoved: 0,
				dimensions: [30,30],
				position: [45, 45],
				direction: 'down',
				delayMove:{
					path: 400,
					fire: 400,
					grass: 800,
					exit: 400,
					ice: 300,
					conveyorL: 200,
					conveyorR: 200,
					conveyorU: 200,
					conveyorD: 200,
				},
				sprites:{	
					up :[{x:0,y:120,w:30,h:30}], 
					right:[{x:0,y:150,w:30,h:30}], 
					down:[{x:0,y:180,w:30,h:30}], 
					left:[{x:0,y:210,w:30,h:30}],
				},
				inventory: null,
			},
			viewport:{
				screen		: [0,0],
				startTile	: [0,0],
				endTile		: [0,0],
				offset		: [0,0],
			},
			floorTypes: {
				solid	: 'solid',
				path	: 'path',
				fire	: 'fire',
				ice: 'ice',
				conveyorU	: 'conveyorU',
				conveyorD	: 'conveyorD',
				conveyorL	: 'conveyorL',
				conveyorR	: 'conveyorR',
				grass: 'grass',
			},
			tileTypes: {
				0 : { colour:"#685b48", floor: 'path', sprite:[{x:0,y:0,w:40,h:40}] },
				1 : { colour:"#5aa457", floor: 'grass', sprite:[{x:40,y:0,w:40,h:40}] },
				2 : { colour:"#e8bd7a", floor: 'solid', sprite:[{x:80,y:0,w:40,h:40}] },
				3 : { colour:"#286625", floor: 'exit', sprite:[{x:120,y:0,w:40,h:40}] },
				4 : { colour:"#678fd9", floor: 'fire', sprite:	[	{x:160,y:0,w:40,h:40,d:200}, {x:200,y:0,w:40,h:40,d:200},
																													{x:160,y:40,w:40,h:40,d:200}, {x:200,y:40,w:40,h:40,d:200},
																													{x:160,y:40,w:40,h:40,d:200}, {x:200,y:0,w:40,h:40,d:200}	] 
						},
				5 : { colour:"#eeeeff", floor:'ice',	sprite:[{x:120,y:120,w:40,h:40}]},
				6 : { colour:"#cccccc", floor:'conveyorL',	sprite: [	{x:0,y:40,w:40,h:40,d:200}, {x:40,y:40,w:40,h:40,d:200},
																															{x:80,y:40,w:40,h:40,d:200}, {x:120,y:40,w:40,h:40,d:200}	]
						},
				7 : { colour:"#cccccc", floor:'conveyorR',	sprite:	[	{x:120,y:80,w:40,h:40,d:200}, {x:80,y:80,w:40,h:40,d:200},
																															{x:40,y:80,w:40,h:40,d:200}, {x:0,y:80,w:40,h:40,d:200} ]
						},
				8 : { colour:"#cccccc", floor:'conveyorD',	sprite:	[	{x:160,y:200,w:40,h:40,d:200}, {x:160,y:160,w:40,h:40,d:200},
																															{x:160,y:120,w:40,h:40,d:200}, {x:160,y:80,w:40,h:40,d:200}	]
						},
				9 : { colour:"#cccccc", floor:'conveyorU',	sprite:	[	{x:200,y:80,w:40,h:40,d:200}, {x:200,y:120,w:40,h:40,d:200},
																															{x:200,y:160,w:40,h:40,d:200}, {x:200,y:200,w:40,h:40,d:200} ]
						},
				10 : { colour:"#ccaa00", floor:'solid', sprite:[{x:40,y:120,w:40,h:40}]},
				11 : { colour:"#ccaa00", floor:'solid', sprite:[{x:80,y:120,w:40,h:40}]},
			},
			directions:{
				up: 'up',
				right: 'right',
				down: 'down',
				left: 'left',
			},
			tileEvents:{
				23 : this.drawBridge,
				25 : this.drawBridge,
				121 : function(self) { self.placePlayerAt(1,8); },
				161 : function(self) { self.placePlayerAt(1,6); }
			},
			/*
			roofList:[
				{ x:5, y:3, w:4, h:7, data: [	10, 10, 11, 11,
																			10, 10, 11, 11,
																			10, 10, 11, 11,
																			10, 10, 11, 11,
																			10, 10, 11, 11,
																			10, 10, 11, 11,
																			10, 10, 11, 11	]
				},
				{ x:15, y:5, w:5, h:4, data: [10, 10, 11, 11, 11,
																			10, 10, 11, 11, 11,
																			10, 10, 11, 11, 11,
																			10, 10, 11, 11, 11	]
				},
				{ x:14, y:9, w:6, h:7, data: [	10, 10, 10, 11, 11, 11,
																				10, 10, 10, 11, 11, 11,
																				10, 10, 10, 11, 11, 11,
																				10, 10, 10, 11, 11, 11,
																				10, 10, 10, 11, 11, 11,
																				10, 10, 10, 11, 11, 11,
																				10, 10, 10, 11, 11, 11	]
				}
			],*/
			objectCollision: {
				none		: 'none',
				solid		: 'solid',
			},
			objectTypes: {
				1 : {
					name : "Box",
					sprite : [{x:40,y:160,w:40,h:40}],
					offset : [0,0],
					collision : 'solid',
					zIndex : 1
				},
				2 : {
					name : "Broken Box",
					sprite : [{x:40,y:200,w:40,h:40}],
					offset : [0,0],
					collision : 'none',
					zIndex : 1
				},
				3 : {
					name : "Tree top",
					sprite : [{x:80,y:160,w:80,h:80}],
					offset : [-20,-20],
					collision : 'solid',
					zIndex : 3
				},
			}, 
			itemTypes: {
				1 : {
					name : "Star",
					maxStack : 1000,
					sprite : [{x:240,y:0,w:40,h:40}],
					offset : [0,0]
        },
        2: {
          name : "fireItem",
          maxStack : 1000,
          sprite : [{x:240,y:40,w:40,h:40}],
          offset : [0,0]
        },
        3: {
          name : "cross",
          maxStack : 1000,
          sprite : [{x:240,y:80,w:40,h:40}],
          offset : [0,0]
        }
			},
			stop: false,
		}
  },
  methods: {
    TileMap: function(){
			return{
				map: [],
				w: 0,
				h: 0,
				levels: 4,
			}
		},
		Tile: function(tx, ty, tt){
			return{
				x: tx,
				y: ty,
				type: tt,
				//roof: null,
				//roofType: 0,
				eventEnter: null,
				object: null,
				itemStack: null,
			}
		},
		MapObject: function(nt){
			return{
				x: 0,
				y: 0,
				type: nt,
			}
		},
		Stack: function(id, qty){
			return{
				type: id,
				qty: qty,
			}
		},
		PlacedItemStack: function(id, qty){
			return{
				type: id,
				qty: qty,
				x: 0,
				y: 0,
			}
		},
		Inventory: function(s){
			return{
				spaces: s,
				stacks: [],
			}
		},
		playerCanMoveTo: function(x,y){
			if(x < 0 || x >= this.mapW || y < 0 || y >= this.mapH){ return false }
			if(typeof this.player.delayMove[this.tileTypes[this.mapTileData.map[this.toIndex(x,y)].type].floor]=='undefined') { return false }
			if(this.mapTileData.map[this.toIndex(x,y)].object != null){
				var o = this.mapTileData.map[this.toIndex(x,y)].object;
				if(this.objectTypes[o.type].collision == this.objectCollision.solid){
					return false;
				}
			}
			return true
		},
		playerCanMoveUp: function(){ 
			return this.playerCanMoveTo(this.player.tileFrom[0], this.player.tileFrom[1]-1) 
		},
		playerCanMoveDown: function(){ 
			return this.playerCanMoveTo(this.player.tileFrom[0], this.player.tileFrom[1]+1) 
		},
		playerCanMoveLeft: function(){ 
			return this.playerCanMoveTo(this.player.tileFrom[0]-1, this.player.tileFrom[1])
		},
		playerCanMoveRight: function(){ 
			return this.playerCanMoveTo(this.player.tileFrom[0]+1, this.player.tileFrom[1])
		},
		playerCanMoveDirection: function(d){
			switch(d){
				case this.directions.up:
					return this.playerCanMoveUp()
				case this.directions.down:
					return this.playerCanMoveDown()
				case this.directions.left:
					return this.playerCanMoveLeft()
				default:
					return this.playerCanMoveRight()
			}
		},
		playerMoveDirection: function(d, t) {
			switch(d)
			{
				case this.directions.up:
					return this.movePlayerUp(t)
				case this.directions.down:
					return this.movePlayerDown(t)
				case this.directions.left:
					return this.movePlayerLeft(t)
				default:
					return this.movePlayerRight(t)
			}
		},
		movePlayerLeft: function(t){ 
			this.player.tileTo[0] -= 1
			this.player.timeMoved = t 
			this.player.direction = this.directions.left
		},
		movePlayerRight: function(t){ 
			this.player.tileTo[0] += 1 
			this.player.timeMoved = t 
			this.player.direction = this.directions.right
		},
		movePlayerUp: function(t){ 
			this.player.tileTo[1] -= 1 
			this.player.timeMoved = t
			this.player.direction = this.directions.up
		},
		movePlayerDown: function(t){ 
			this.player.tileTo[1] += 1
			this.player.timeMoved = t 
			this.player.direction = this.directions.down
		},
		placePlayerAt: function(x,y){
			this.player.tileFrom = [x,y]
			this.player.tileTo = [x,y]
			this.player.position = [((this.tileW * x)+((this.tileW - this.player.dimensions[0])/2)), ((this.tileH * y)+((this.tileH - this.player.dimensions[1])/2))]
		},
		processPlayerMovement: function(t){
			if(this.player.tileFrom[0]==this.player.tileTo[0] && this.player.tileFrom[1]==this.player.tileTo[1]){
				return false
			}

			var moveSpeed = this.player.delayMove[this.tileTypes[this.gameMap[this.toIndex(this.player.tileFrom[0],this.player.tileFrom[1])]].floor]

			if((t-this.player.timeMoved) >= moveSpeed){
				this.placePlayerAt(this.player.tileTo[0], this.player.tileTo[1])

				if(this.mapTileData.map[this.toIndex(this.player.tileTo[0], this.player.tileTo[1])].eventEnter!=null){
					this.mapTileData.map[this.toIndex(this.player.tileTo[0], this.player.tileTo[1])].eventEnter(this);
				}

				var tileFloor = this.tileTypes[this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1])].type].floor;

				if(tileFloor == this.floorTypes.ice){
					if(this.playerCanMoveDirection(this.player.direction)){
						this.playerMoveDirection(this.player.direction, t)
					}
				}
				else if(tileFloor == this.floorTypes.conveyorL && this.playerCanMoveLeft())	{ this.movePlayerLeft(t) }
				else if(tileFloor == this.floorTypes.conveyorR && this.playerCanMoveRight()) { this.movePlayerRight(t) }
				else if(tileFloor == this.floorTypes.conveyorU && this.playerCanMoveUp())	{ this.movePlayerUp(t) }
				else if(tileFloor == this.floorTypes.conveyorD && this.playerCanMoveDown())	{ this.movePlayerDown(t) }
			}
			else{
				this.player.position[0] = (this.player.tileFrom[0] * this.tileW) + ((this.tileW-this.player.dimensions[0])/2)
				this.player.position[1] = (this.player.tileFrom[1] * this.tileH) + ((this.tileH-this.player.dimensions[1])/2)

				if(this.player.tileTo[0] != this.player.tileFrom[0]){
					let diff = (this.tileW / moveSpeed) * (t-this.player.timeMoved)
					this.player.position[0]+= (this.player.tileTo[0]<this.player.tileFrom[0] ? 0 - diff : diff)
				}
				if(this.player.tileTo[1] != this.player.tileFrom[1]){
					let diff = (this.tileH / moveSpeed) * (t-this.player.timeMoved)
					this.player.position[1]+= (this.player.tileTo[1]<this.player.tileFrom[1] ? 0 - diff : diff)
				}

				this.player.position[0] = Math.round(this.player.position[0])
				this.player.position[1] = Math.round(this.player.position[1])
			}

			return true;
    },
    updateViewport: function(px,py){
			this.viewport.offset[0] = Math.floor((this.viewport.screen[0]/2) - px)
			this.viewport.offset[1] = Math.floor((this.viewport.screen[1]/2) - py)

			var tile = [ Math.floor(px/this.tileW), Math.floor(py/this.tileH) ]

			this.viewport.startTile[0] = tile[0] - 1 - Math.ceil((this.viewport.screen[0]/2) / this.tileW)
			this.viewport.startTile[1] = tile[1] - 1 - Math.ceil((this.viewport.screen[1]/2) / this.tileH)

			if(this.viewport.startTile[0] < 0) { this.viewport.startTile[0] = 0 }
			if(this.viewport.startTile[1] < 0) { this.viewport.startTile[1] = 0 }

			this.viewport.endTile[0] = tile[0] + 1 + Math.ceil((this.viewport.screen[0]/2) / this.tileW)
			this.viewport.endTile[1] = tile[1] + 1 + Math.ceil((this.viewport.screen[1]/2) / this.tileH)

			if(this.viewport.endTile[0] >= this.mapW) { this.viewport.endTile[0] = this.mapW-1 }
			if(this.viewport.endTile[1] >= this.mapH) { this.viewport.endTile[1] = this.mapH-1 }
		},
		toIndex: function(x,y){
			return((y * this.mapW) + x)
		},
		getFrame: function(sprite, duration, time, animated){
			if(!animated) { 
				return sprite[0] 
			}
			time = time % duration;

			for(var x in sprite){
				if(sprite[x].end>=time) { 
					return sprite[x] 
				}
			}
    },
    drawBridge: function(){
			this.gameMap[this.toIndex(4,5)] = (this.gameMap[this.toIndex(4,5)]==4 ? 2 : 4);
    },
    //keyboard functions
		downFunc: function(e){
			if(e.keyCode >= 37 && e.keyCode <= 40){ 
				this.keysDown[e.keyCode] = true 
			}
			if(e.keyCode == 80) { 
				this.keysDown[e.keyCode] = true 
			}
			if(e.keyCode == 67){
				this.putCross()
			}
			if(e.keyCode == 83){
				this.putStar()
			}
		},
		upFunc: function(e){
			if(e.keyCode >= 37 && e.keyCode <= 40){
				this.keysDown[e.keyCode] = false 
			}
			/*if(e.keyCode == 83){
				this.currentSpeed = (this.currentSpeed >= (this.gameSpeeds.length - 1) ? 0 : this.currentSpeed + 1)
			}*/
			if(e.keyCode == 80){ 
				this.keysDown[e.keyCode] = false 
			}
    },
    //load the tileset 
    loadTileset: function(){
			var self = this

			this.tileset = new Image()
			this.tileset.onerror = function(){
				this.ctx = null
				alert("Failed loading tileset")
			}
			this.tileset.onload = function(){
				self.tilesetLoaded = true
			}
			this.tileset.src = tilesetImage

			var x
			for(x in this.tileTypes){
				this.tileTypes[x]['animated'] = this.tileTypes[x].sprite.length > 1 ? true : false

				if(this.tileTypes[x].animated)
				{
					var t = 0;
					
					var s
					for(s in this.tileTypes[x].sprite){
						this.tileTypes[x].sprite[s]['start'] = t
						t += this.tileTypes[x].sprite[s].d
						this.tileTypes[x].sprite[s]['end'] = t
					}

					this.tileTypes[x]['spriteDuration'] = t
				}
			}
    },
    //create a TileMap instance
		createTileMapData: function(){
			this.mapTileData = new this.TileMap()
    },
    //build the map by pushing the tile instance into the array
    buildMapFromData: function(d, w, h){
			this.mapTileData.w		= w
			this.mapTileData.h		= h
			
			if(d.length != (w * h)){
				return false 
			}
			
			this.mapTileData.map.length	= 0;
			
			for(var y = 0; y < h; y++){
				for(var x = 0; x < w; x++){
					this.mapTileData.map.push( new this.Tile(x, y, d[((y * w) + x)]) );
				}
			}
			
			return true;
		},
		addLoseEventForFireTile: function(){
			for(var i = 0; i < this.mapTileData.map.length; i++){
				if(this.mapTileData.map[i].type == 4){
					this.mapTileData.map[i].eventEnter = this.reportLoseToUser
				}
				else if(this.mapTileData.map[i].type == 3){
					this.mapTileData.map[i].eventEnter = this.reportWinToUser
				}
			}
		},
		reportWinToUser: function(){
			var vm = null
			for(let i = 0; i < this.$parent.$children.length; i++){
				if(this.$parent.$children[i].$options._componentTag == "NavBar"){
					vm = this.$parent.$children[i]
				}
			}

			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1])].type == 3){
				
				if(this.$root.$children[0].currentLevel == 1){
					this.$swal({
						text: 'Congratulations! You Win!',
						icon: 'success',
					})
					vm.doneL1 = true
				}
				else if(this.$root.$children[0].currentLevel == 2){
					this.$swal({
						text: 'Congratulations! You Win!',
						icon: 'success',
					})
					vm.doneL2 = true
				}
				else if(this.$root.$children[0].currentLevel == 3){
					this.$swal({
						text: 'Congratulations! You Win!',
						icon: 'success',
					})
					vm.doneL3 = true
				}
				else if(this.$root.$children[0].currentLevel == 4){
					this.$swal({
						text: 'Congratulations! You Win!',
						icon: 'success',
					})
					vm.doneL4 = true
				}
				else if(this.$root.$children[0].currentLevel == 5){
					var itemOnCorrectTile = this.checkItemIsOnCorrectTile(5)
					if(!itemOnCorrectTile){
						this.reportLoseToUserForIncorrectItem()
					}
					else{
						this.$swal({
							text: 'Congratulations! You Win!',
							icon: 'success',
						})
						vm.doneL5 = true
					}
				}
				else if(this.$root.$children[0].currentLevel == 6){
					this.$swal({
						text: 'Congratulations! You Win!',
						icon: 'success',
					})
					vm.doneL6 = true
				}
				else if(this.$root.$children[0].currentLevel == 7){
					this.$swal({
						text: 'Congratulations! You Win!',
						icon: 'success',
					})
					vm.doneL7 = true
				}
				else if(this.$root.$children[0].currentLevel == 8){
					this.$swal({
						text: 'Congratulations! You Win!',
						icon: 'success',
					})
					vm.doneL8 = true
				}
				else if(this.$root.$children[0].currentLevel == 9){
					this.$swal({
						text: 'Congratulations! You Win!',
						icon: 'success',
					})
					vm.doneL9 = true
				}
				else if(this.$root.$children[0].currentLevel == 10){
					this.$swal({
						text: 'Congratulations! You Win!',
						icon: 'success',
					})
					vm.doneL10 = true
				}
				
					
				this.stop = true
				this.currentSpeed = 1
				this.sleepMS(1000)
			}
		},
		reportLoseToUser: function(){
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1])].type == 4){
				this.$swal({
					text: 'Oops, you fall into the fire and lose!!!!!!!!!!!!!',
					icon: 'error',
				})
				this.stop = true
				this.currentSpeed = 1
				this.sleepMS(1000)
				//this.resetGameState()
			}

		},
		reportLoseToUserForIncorrectItem: function(){
			this.$swal({
					text: 'Oops, you lose. Try again!!!!',
					footer: 'You have to put the correct item on each tile to win.',
					icon: 'error',
				})
				this.stop = true
				this.currentSpeed = 1
				this.sleepMS(1000)
		},
		resetGameState: function(){
			//var vm = this.$root.$children[0]
			this.mapTileData = null
			this.gameMap = null
			this.player = {
				tileFrom: [1,1],
				tileTo:[1,1],
				timeMoved: 0,
				dimensions: [30,30],
				position: [45, 45],
				direction: 'down',
				delayMove:{
					path: 400,
					fire: 400,
					grass: 800,
					exit: 400,
					ice: 300,
					conveyorL: 200,
					conveyorR: 200,
					conveyorU: 200,
					conveyorD: 200,
				},
				sprites:{	
					up :[{x:0,y:120,w:30,h:30}], 
					right:[{x:0,y:150,w:30,h:30}], 
					down:[{x:0,y:180,w:30,h:30}], 
					left:[{x:0,y:210,w:30,h:30}],
				},
				inventory: null,
			}
			
			this.loadGameMapForLevel()
			this.createTileMapData()
			this.buildMapFromData(this.gameMap, this.mapW, this.mapH)
			this.addLoseEventForFireTile()
			this.player.inventory = new this.Inventory(3)
			this.placeFireItemOnMap()
		},
    placeFireItemOnMap: function(){
			var vm = this.$root.$children[0]
      for(let i = 0; i < this.mapTileData.map.length; i++){
        if(this.tileTypes[this.mapTileData.map[i].type].floor == this.floorTypes.fire){
					let ps = new this.PlacedItemStack(2, 1)
          this.placePlacedItemStackAt(ps, i%this.mapW , Math.floor(i/this.mapW))
        }
			}
			
			if(vm.currentLevel == 7){
				let star1 = new this.PlacedItemStack(1, 1)
				this.placePlacedItemStackAt(star1, 3, 2)
				
				let star4 = new this.PlacedItemStack(1, 1)
				this.placePlacedItemStackAt(star4, 13, 3)
				
				let star8 = new this.PlacedItemStack(1, 1)
				this.placePlacedItemStackAt(star8, 11, 5)
				let star13 = new this.PlacedItemStack(1, 1)
				this.placePlacedItemStackAt(star13, 2, 11)
				
				let star15 = new this.PlacedItemStack(1, 1)
				this.placePlacedItemStackAt(star15, 13, 11)
				
				let star17 = new this.PlacedItemStack(1, 1)
        this.placePlacedItemStackAt(star17, 10, 12)
			}
		},
		/*
    //adding the roof
    addRoofs: function(roofs){
			for(var i in roofs){
				var r = roofs[i]
				
				if(r.x < 0 || r.y < 0 || r.x >= this.mapTileData.w || r.y >= this.mapTileData.h || (r.x+r.w)>this.mapTileData.w || (r.y+r.h)>this.mapTileData.h || r.data.length!=(r.w * r.h)){
					continue
				}
				
				for(var y = 0; y < r.h; y++){
					for(var x = 0; x < r.w; x++){
						var tileIdx = (((r.y + y) * this.mapTileData.w) + r.x + x)
						
						this.mapTileData.map[tileIdx].roof = r
						this.mapTileData.map[tileIdx].roofType = r.data[((y * r.w) + x)]
					}
				}
			}
    },*/
    //add the item to the inventory
		addInventoryItems: function(inv, id, qty){
			for(var i = 0; i < inv.spaces; i++){
				if(inv.stacks.length<=i){
					let maxHere = (qty > this.itemTypes[id].maxStack ? this.itemTypes[id].maxStack : qty)
					inv.stacks.push(new this.Stack(id, maxHere));
					
					qty -= maxHere;
				}
				else if(inv.stacks[i].type == id && inv.stacks[i].qty < this.itemTypes[id].maxStack){
					let maxHere = (this.itemTypes[id].maxStack - inv.stacks[i].qty)
					if(maxHere > qty){ 
						maxHere = qty 
					}
					
					inv.stacks[i].qty += maxHere
					qty -= maxHere
				}
				
				if(qty == 0){ 
					return 0 
				}
			}
			
			return qty
    },
    //place the object on the map
    placeMapObjectAt: function(mapObj, nx, ny){
			if(this.mapTileData.map[this.toIndex(mapObj.x, mapObj.y)].object==mapObj){
				this.mapTileData.map[this.toIndex(mapObj.x, mapObj.y)].object = null;
			}
			
			mapObj.x = nx;
			mapObj.y = ny;
			
			this.mapTileData.map[this.toIndex(nx, ny)].object = mapObj;
    },
    //place the item on tile (nx, ny)
		placePlacedItemStackAt: function(placedItemStack, nx, ny){
			if(this.mapTileData.map[this.toIndex(placedItemStack.x, placedItemStack.y)].itemStack == placedItemStack){
				this.mapTileData.map[this.toIndex(placedItemStack.x, placedItemStack.y)].itemStack = null
			}
			
			placedItemStack.x = nx
			placedItemStack.y = ny
			
			this.mapTileData.map[this.toIndex(nx, ny)].itemStack = placedItemStack
    },
    //player pick up action
		playerPickUp: function(){
			if(this.player.tileTo[0] != this.player.tileFrom[0] || this.player.tileTo[1] != this.player.tileFrom[1]){
				return false
			}
			
			var is = this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1])].itemStack
			
			if(is != null){
				var remains = this.addInventoryItems(this.player.inventory, is.type, is.qty)

				if(remains){ 
					is.qty = remains 
				}
				else{
					this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1])].itemStack = null
				}
			}
			
			return true
    },
    //main function for drawing the game map every frame
    drawGame: function(){

      //check canvas context is not null
			if(this.ctx==null) {
				return 
      }
      
      //check the tile set is loaded
			if(!this.tilesetLoaded) {
				requestAnimationFrame(this.drawGame) 
				return 
			}

			var currentFrameTime = Date.now()
			var timeElapsed = currentFrameTime - this.lastFrameTime
			this.gameTime += Math.floor(timeElapsed * this.gameSpeeds[this.currentSpeed].mult)

			var sec = Math.floor(Date.now()/1000);
			if(sec!=this.currentSecond){
				this.currentSecond = sec
				this.framesLastSecond = this.frameCount
				this.frameCount = 1
			}
			else { this.frameCount++ }

      //if player is not moving, move the player if keysDown value is changed
			if(!this.processPlayerMovement(this.gameTime) && this.gameSpeeds[this.currentSpeed].mult!=0){
				
				if(this.keysDown[38] && this.playerCanMoveUp()){ 
					this.movePlayerUp(this.gameTime) 
				}
				else if(this.keysDown[40] && this.playerCanMoveDown()){ 
					this.movePlayerDown(this.gameTime) 
				}
				else if(this.keysDown[37] && this.playerCanMoveLeft()){ 
					this.movePlayerLeft(this.gameTime) 
				}
				else if(this.keysDown[39] && this.playerCanMoveRight()){ 
					this.movePlayerRight(this.gameTime) 
				}
				else if(this.keysDown[80]){ 
					this.playerPickUp() 
				}

			}

      //update the viewport
			this.updateViewport(this.player.position[0] + (this.player.dimensions[0]/2), this.player.position[1] + (this.player.dimensions[1]/2))
      
      //add the roof
      //var playerRoof1 = this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1])].roof;
			//var playerRoof2 = this.mapTileData.map[this.toIndex(this.player.tileTo[0], this.player.tileTo[1])].roof;
			
			this.ctx.fillStyle = "#000000" //set the background of the gameMap
			this.ctx.fillRect(0, 0, this.viewport.screen[0], this.viewport.screen[1])

      
			for(var z = 0; z < this.mapTileData.levels; z++){
				for(var y = this.viewport.startTile[1]; y <= this.viewport.endTile[1]; y++){
					for(var x = this.viewport.startTile[0]; x <= this.viewport.endTile[0]; x++){
						
						if(z == 0){
							var tile = this.tileTypes[this.mapTileData.map[this.toIndex(x,y)].type]
							let sprite = this.getFrame(tile.sprite, tile.spriteDuration, this.gameTime, tile.animated)
							this.ctx.drawImage( this.tileset, sprite.x, sprite.y, sprite.w, sprite.h,
																this.viewport.offset[0] + (x * this.tileW), this.viewport.offset[1] + (y * this.tileH), this.tileW, this.tileH)
						}
						else if(z == 1){
							var is = this.mapTileData.map[this.toIndex(x,y)].itemStack;
							if(is != null){
								let sprite = this.itemTypes[is.type].sprite
								
								this.ctx.drawImage(	this.tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
																		this.viewport.offset[0] + (x * this.tileW) + this.itemTypes[is.type].offset[0],
																		this.viewport.offset[1] + (y * this.tileH) + this.itemTypes[is.type].offset[1],
																		sprite[0].w, sprite[0].h)
							}
						}

						var o = this.mapTileData.map[this.toIndex(x,y)].object
						if(o != null && this.objectTypes[o.type].zIndex == z){
							var ot = this.objectTypes[o.type]
							
							this.ctx.drawImage( this.tileset, ot.sprite[0].x, ot.sprite[0].y, ot.sprite[0].w, ot.sprite[0].h,
																	this.viewport.offset[0] + (x * this.tileW) + ot.offset[0],
																	this.viewport.offset[1] + (y * this.tileH) + ot.offset[1],
																	ot.sprite[0].w, ot.sprite[0].h)
						}
						/*
						if(	z == 2 && 
								this.mapTileData.map[this.toIndex(x,y)].roofType != 0 &&
								this.mapTileData.map[this.toIndex(x,y)].roof != playerRoof1 &&
								this.mapTileData.map[this.toIndex(x,y)].roof != playerRoof2)
						{
								tile = this.tileTypes[this.mapTileData.map[this.toIndex(x,y)].roofType]
								let sprite = this.getFrame(tile.sprite, tile.spriteDuration, this.gameTime, tile.animated)
								this.ctx.drawImage(this.tileset, sprite.x, sprite.y, sprite.w, sprite.h,
															this.viewport.offset[0] + (x * this.tileW), this.viewport.offset[1] + (y * this.tileH), this.tileW, this.tileH);
						}*/

						if(z==1){
							let sprite = this.player.sprites[this.player.direction]
							this.ctx.drawImage(	this.tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
																	this.viewport.offset[0] + this.player.position[0],
																	this.viewport.offset[1] + this.player.position[1],
																	this.player.dimensions[0], this.player.dimensions[1]);
						}

					}
				}
			}
			
			/*
			this.ctx.textAlign = "right";
	
			for(var i = 0; i < this.player.inventory.spaces; i++){
				this.ctx.fillStyle = "#ddccaa";
				this.ctx.fillRect(10 + (i * 50), 350, 40, 40);
				
				if(typeof this.player.inventory.stacks[i] != 'undefined')
				{
					let it = this.itemTypes[this.player.inventory.stacks[i].type];
					let sprite = it.sprite;
							
					this.ctx.drawImage(	this.tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
															10 + (i * 50) + it.offset[0], 350 + it.offset[1], sprite[0].w, sprite[0].h)
					
					if(this.player.inventory.stacks[i].qty > 1){
						this.ctx.fillStyle = "#000000";
						this.ctx.fillText("" + this.player.inventory.stacks[i].qty, 10 + (i*50) + 38, 350 + 38);
					}
				}
			}*/

			this.ctx.textAlign = "left"
			
			this.ctx.fillStyle = "#ff0000"
			this.ctx.fillText("FPS: " + this.framesLastSecond, 10, 20)
			this.ctx.fillText("Game speed: " + this.gameSpeeds[this.currentSpeed].name, 10, 40);

			this.lastFrameTime = currentFrameTime
			requestAnimationFrame(this.drawGame)
    },
    //moving the character using action blocks in MainBlock.vue
    moveUp: async function(){
      this.keysDown[38] = true
      await this.sleepMS(100)
      this.keysDown[38] = false   
    },
    moveDown: async function(){
      this.keysDown[40] = true
      await this.sleepMS(100)
      this.keysDown[40] = false
    },
    moveRight: async function(){
      this.keysDown[39] = true
      await this.sleepMS(100)
      this.keysDown[39] = false
    },
    moveLeft: async function(){
      this.keysDown[37] = true
      await this.sleepMS(100)
      this.keysDown[37] = false
		},

		performMazeMovement: async function(){
			var leftIsFireOrCross = false
			var rightIsFireOrCross = false
			var upIsFireOrCross = false
			var downIsFireOrCross = false
			var leftIsStar = false
			var rightIsStar = false
			var upIsStar = false
			var downIsStar = false

			//check the 4 directions is Fire or Cross or not
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].type == 4 ||
					(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack.type == 3))
			{
				leftIsFireOrCross = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].type == 4 ||
					(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack.type == 3))
			{
				rightIsFireOrCross = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].type == 4 ||
					(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack.type == 3))
			{
				upIsFireOrCross = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].type == 4 ||
					(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack.type == 3))
			{
				downIsFireOrCross = true
			}

			//check the 4 directions is Star or not
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack != null &&
					this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack.type == 1)
			{
				leftIsStar = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack != null &&
					this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack.type == 1)
			{
				rightIsStar = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack != null &&
					this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack.type == 1)
			{
				upIsStar = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack != null &&
					this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack.type == 1)
			{
				downIsStar = true
			}
			
			//Dead-End Movement
			if(leftIsFireOrCross && upIsFireOrCross && rightIsFireOrCross){
				this.moveDown()
			}
			else if(upIsFireOrCross && rightIsFireOrCross && downIsFireOrCross){
				this.moveLeft()
			}
			else if(rightIsFireOrCross && downIsFireOrCross && leftIsFireOrCross){
				this.moveUp()
			}
			else if(downIsFireOrCross && leftIsFireOrCross && upIsFireOrCross){
				this.moveRight()
			}
			//Non Dead-End Movement
			else{
				this.performNDEMovement(leftIsFireOrCross, rightIsFireOrCross, upIsFireOrCross, downIsFireOrCross, leftIsStar, rightIsStar, upIsStar, downIsStar)
			}
		},
		ndeMovement: async function(){
			var leftIsFireOrCross = false
			var rightIsFireOrCross = false
			var upIsFireOrCross = false
			var downIsFireOrCross = false
			var leftIsStar = false
			var rightIsStar = false
			var upIsStar = false
			var downIsStar = false

			//check the 4 directions is Fire or Cross or not
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].type == 4 ||
					(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack.type == 3))
			{
				leftIsFireOrCross = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].type == 4 ||
					(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack.type == 3))
			{
				rightIsFireOrCross = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].type == 4 ||
					(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack.type == 3))
			{
				upIsFireOrCross = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].type == 4 ||
					(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack.type == 3))
			{
				downIsFireOrCross = true
			}

			//check the 4 directions is Star or not
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack != null &&
					this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack.type == 1)
			{
				leftIsStar = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack != null &&
					this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack.type == 1)
			{
				rightIsStar = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack != null &&
					this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack.type == 1)
			{
				upIsStar = true
			}
			if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack != null &&
					this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack.type == 1)
			{
				downIsStar = true
			}
			
			this.performNDEMovement(leftIsFireOrCross, rightIsFireOrCross, upIsFireOrCross, downIsFireOrCross, leftIsStar, rightIsStar, upIsStar, downIsStar)

		},
		performNDEMovement: async function(leftIsFireOrCross, rightIsFireOrCross, upIsFireOrCross, downIsFireOrCross, leftIsStar, rightIsStar, upIsStar, downIsStar){
			if(leftIsFireOrCross){
				if(downIsFireOrCross){
					if(rightIsStar){
						if(upIsStar){this.moveRight()}
						else{this.moveUp()}
					}
					else{
						this.moveRight()
					}
				}
				else{
					if(downIsStar){
						if(rightIsFireOrCross){
							if(upIsStar){this.moveDown()}
							else{this.moveUp()}
						}
						else{
							if(rightIsStar){
								if(upIsFireOrCross){this.moveDown()}
								else{
									if(upIsStar){this.moveDown()}
									else{this.moveUp()}
								}
							}
							else{this.moveRight()}
						}
					}
					else{this.moveDown()}
				}
			}
			else{
				if(leftIsStar){
					if(downIsFireOrCross){
						if(rightIsFireOrCross){
							if(upIsStar){this.moveLeft()}
							else{this.moveUp()}
						}
						else{
							if(rightIsStar){
								if(upIsStar){this.moveLeft()}
								else{this.moveUp()}
							}
							else{this.moveRight()}
						}
					}
					else{
						if(downIsStar){
							if(rightIsFireOrCross){
								if(upIsStar){this.moveLeft()}
								else{this.moveUp()}
							}
							else{
								if(rightIsStar){
									if(upIsFireOrCross){this.moveLeft()}
									else{
										if(upIsStar){this.moveLeft()}
										else{this.moveUp()}
									}
								}
								else{this.moveRight()}
							}
						}
						else{this.moveDown()}
					}
				}
				else{this.moveLeft()}
			}
		},
		putStar: async function(){
			let ps = new this.PlacedItemStack(1,1)
			this.placePlacedItemStackAt(ps, this.player.tileFrom[0], this.player.tileFrom[1])
		},
		putCross: async function(){
			let ps = new this.PlacedItemStack(3,1)
			this.placePlacedItemStackAt(ps, this.player.tileFrom[0], this.player.tileFrom[1])
		},
		checkIsFire: function(blockObj){
			var directionToCheck = blockObj.checkDirection
			if(directionToCheck == "Left"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].type == 4){ return true }
				else{ return false }
			}
			else if(directionToCheck == "Right"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].type == 4){ return true }
				else{ return false }
			}
			else if(directionToCheck == "Up"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].type == 4){ return true }
				else{ return false }
			}
			else if(directionToCheck == "Down"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].type == 4){ return true }
				else{ return false }
			}
			else{	return false }

		},
		checkIsStar: function(blockObj){
			var directionToCheck = blockObj.checkDirection
			if(directionToCheck == "Left"){
				if(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack.type == 1)
						{ return true }
				else{ return false }
			}
			else if(directionToCheck == "Right"){
				if(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack.type == 1)
						{ return true }
				else{ return false }
			}
			else if(directionToCheck == "Up"){
				if(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack.type == 1)
						{ return true }
				else{ return false }
			}
			else if(directionToCheck == "Down"){
				if(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack.type == 1)
						{ return true }
				else{ return false }
			}
			else{	return false }
		},
		checkIsCross: function(blockObj){
			var directionToCheck = blockObj.checkDirection
			if(directionToCheck == "Left"){
				if(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack.type == 3)
						{ return true }
				else{ return false }
			}
			else if(directionToCheck == "Right"){
				if(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack.type == 3)
						{ return true }
				else{ return false }
			}
			else if(directionToCheck == "Up"){
				if(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack.type == 3)
						{ return true }
				else{ return false }
			}
			else if(directionToCheck == "Down"){
				if(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack.type == 3)
						{ return true }
				else{ return false }
			}
			else{	return false }
		},
		checkIsExit: function(blockObj){
			var directionToCheck = blockObj.checkDirection
			if(directionToCheck == "Left"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].type == 3){ return true }
				else{ return false }
			}
			else if(directionToCheck == "Right"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].type == 3){ return true }
				else{ return false }
			}
			else if(directionToCheck == "Up"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].type == 3){ return true }
				else{ return false }
			}
			else if(directionToCheck == "Down"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].type == 3){ return true }
				else{ return false }
			}
			else{	return false }
		},
		checkIsFireOrX: function(blockObj){
			var directionToCheck = blockObj.checkDirection

			if(directionToCheck == "Left"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].type == 4 ||
						(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack != null &&
							this.mapTileData.map[this.toIndex(this.player.tileFrom[0]-1, this.player.tileFrom[1])].itemStack.type == 3)
					)
				{ return true }
				else{ return false }
			}
			else if(directionToCheck == "Right"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].type == 4 ||
						(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack != null &&
							this.mapTileData.map[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])].itemStack.type == 3)
					)
				{ return true }
				else{ return false }
			}
			else if(directionToCheck == "Up"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].type == 4 ||
					(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack != null &&
						this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]-1)].itemStack.type == 3)
					)
				{ return true }
				else{ return false }
			}
			else if(directionToCheck == "Down"){
				if(this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].type == 4 ||
						(	this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack != null &&
							this.mapTileData.map[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1]+1)].itemStack.type == 3)
				)
				{ return true }
				else{ return false }
			}
			else{	return false }

		},
		checkItemIsOnCorrectTile: function(level){
			var isItemOnCorrectTile = true
			if(level == 5){

				for(let i = 1; i < 9; i++){
					if(i == 1 || i == 8){
						if(this.mapTileData.map[this.toIndex(i, 1)].itemStack == null || this.mapTileData.map[this.toIndex(i, 1)].itemStack.type != 3){
							isItemOnCorrectTile = false
						}
						continue
					}
					if(this.mapTileData.map[this.toIndex(i, 1)].itemStack == null || this.mapTileData.map[this.toIndex(i, 1)].itemStack.type != 1){
						isItemOnCorrectTile = false
					}
				}

				for(let i = 2; i < 9; i++){
					if(i == 2 || i == 8){
						if(this.mapTileData.map[this.toIndex(i, 6)].itemStack == null || this.mapTileData.map[this.toIndex(i, 6)].itemStack.type != 3){
							isItemOnCorrectTile = false
						}
						continue
					}
					if(this.mapTileData.map[this.toIndex(i, 6)].itemStack == null || this.mapTileData.map[this.toIndex(i, 6)].itemStack.type != 1){
						isItemOnCorrectTile = false
					}
				}

				for(let j = 1; j < 7; j++){
					if(this.mapTileData.map[this.toIndex(4, j)].itemStack == null || this.mapTileData.map[this.toIndex(4, j)].itemStack.type != 1){
						isItemOnCorrectTile = false
					}
				}

				for(let j = 4; j < 7; j++){
					if(this.mapTileData.map[this.toIndex(7, j)].itemStack == null || this.mapTileData.map[this.toIndex(7, j)].itemStack.type != 1){
						isItemOnCorrectTile = false
					}
				}
				
			}

			return isItemOnCorrectTile
		},
    sleepMS: function(millieSecond){
      return new Promise(function(resolve){
        setTimeout(resolve, millieSecond)
      })
		},
		loadGameMapForLevel: function(){
			var vm = this.$root.$children[0]
			if(vm.currentLevel == 1){
				this.gameMap = vm.level1GameMap.gameMap
				this.tileW = vm.level1GameMap.tileW
				this.tileH = vm.level1GameMap.tileH
				this.mapW = vm.level1GameMap.mapW
				this.mapH = vm.level1GameMap.mapH
				this.player.tileFrom = [1,1]
				this.player.tileTo = [1,1]
				this.player.position = [45,45]
				this.player.direction = "down"
			}
			else if(vm.currentLevel == 2){
				this.gameMap = vm.level2GameMap.gameMap
				this.tileW = vm.level2GameMap.tileW
				this.tileH = vm.level2GameMap.tileH
				this.mapW = vm.level2GameMap.mapW
				this.mapH = vm.level2GameMap.mapH
				this.player.tileFrom = [1,1]
				this.player.tileTo = [1,1]
				this.player.position = [45,45]
				this.player.direction = "right"
			}
			else if(vm.currentLevel == 3){
				this.gameMap = vm.level3GameMap.gameMap
				this.tileW = vm.level3GameMap.tileW
				this.tileH = vm.level3GameMap.tileH
				this.mapW = vm.level3GameMap.mapW
				this.mapH = vm.level3GameMap.mapH
				this.player.tileFrom = [1,7]
				this.player.tileTo = [1,7]
				this.player.position = [45,285]
				this.player.direction = "right"
			}
			else if(vm.currentLevel == 4){
				this.gameMap = vm.level4GameMap.gameMap
				this.tileW = vm.level4GameMap.tileW
				this.tileH = vm.level4GameMap.tileH
				this.mapW = vm.level4GameMap.mapW
				this.mapH = vm.level4GameMap.mapH
				this.player.tileFrom = [1,1]
				this.player.tileTo = [1,1]
				this.player.position = [45,45]
				this.player.direction = "down"
			}
			else if(vm.currentLevel == 5){
				this.gameMap = vm.level5GameMap.gameMap
				this.tileW = vm.level5GameMap.tileW
				this.tileH = vm.level5GameMap.tileH
				this.mapW = vm.level5GameMap.mapW
				this.mapH = vm.level5GameMap.mapH
				this.player.tileFrom = [1,1]
				this.player.tileTo = [1,1]
				this.player.position = [45,45]
				this.player.direction = "right"
			}
			else if(vm.currentLevel == 6){
				this.gameMap = vm.level6GameMap.gameMap
				this.tileW = vm.level6GameMap.tileW
				this.tileH = vm.level6GameMap.tileH
				this.mapW = vm.level6GameMap.mapW
				this.mapH = vm.level6GameMap.mapH
				this.player.tileFrom = [1,1]
				this.player.tileTo = [1,1]
				this.player.position = [45,45]
				this.player.direction = "right"
			}
			else if(vm.currentLevel == 7){
				this.gameMap = vm.level7GameMap.gameMap
				this.tileW = vm.level7GameMap.tileW
				this.tileH = vm.level7GameMap.tileH
				this.mapW = vm.level7GameMap.mapW
				this.mapH = vm.level7GameMap.mapH
				this.player.tileFrom = [7,7]
				this.player.tileTo = [7,7]
				this.player.position = [285,285]
				this.player.direction = "right"
			}
			else if(vm.currentLevel == 8){
				this.gameMap = vm.level8GameMap.gameMap
				this.tileW = vm.level8GameMap.tileW
				this.tileH = vm.level8GameMap.tileH
				this.mapW = vm.level8GameMap.mapW
				this.mapH = vm.level8GameMap.mapH
				this.player.tileFrom = [1,1]
				this.player.tileTo = [1,1]
				this.player.position = [45,45]
				this.player.direction = "right"
			}
			else if(vm.currentLevel == 9){
				this.gameMap = vm.level9GameMap.gameMap
				this.tileW = vm.level9GameMap.tileW
				this.tileH = vm.level9GameMap.tileH
				this.mapW = vm.level9GameMap.mapW
				this.mapH = vm.level9GameMap.mapH
				this.player.tileFrom = [1,1]
				this.player.tileTo = [1,1]
				this.player.position = [45,45]
				this.player.direction = "down"
			}
			else if(vm.currentLevel == 10){
				this.gameMap = vm.level10GameMap.gameMap
				this.tileW = vm.level10GameMap.tileW
				this.tileH = vm.level10GameMap.tileH
				this.mapW = vm.level10GameMap.mapW
				this.mapH = vm.level10GameMap.mapH
				this.player.tileFrom = [1,1]
				this.player.tileTo = [1,1]
				this.player.position = [45,45]
				this.player.direction = "right"
			}
      
		},
  },
  mounted: function(){
		this.mapTileData = null
		this.GameMap = null
		
		//get context for canvas and request animation frame
		this.canvas = this.$refs.gameMapCanvas
		this.ctx = this.canvas.getContext("2d")
		this.ctx.font = "bold 10pt sans-serif"
		requestAnimationFrame(this.drawGame)
      
    //add event listener
		window.addEventListener('keydown', this.downFunc)
		window.addEventListener('keyup', this.upFunc)

    //preparing the viewport
		this.viewport.screen = [this.$refs.gameMapCanvas.width, this.$refs.gameMapCanvas.height]
    
    //load the tileset and build the map
		this.loadGameMapForLevel()
    this.loadTileset()
		this.createTileMapData()
		this.buildMapFromData(this.gameMap, this.mapW, this.mapH)
		this.addLoseEventForFireTile()
      
    //create inventory to store the item
    this.player.inventory = new this.Inventory(3)
    
    this.placeFireItemOnMap()

	}
}

</script>

<style>
#gameMap{
  
}
#game{
  float: right;
}
</style>